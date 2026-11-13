"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  useCurrentContext,
  TRIBUTARIES,
  type TributaryId,
} from "./CurrentContext";

interface SamplePoint {
  x: number;
  y: number;
  len: number;
}

interface NodeData {
  id: string;
  x: number;
  y: number;
  isFilled: boolean;
  lengthOnPath: number;
  isEddy?: boolean;
  tributaryId?: TributaryId;
}

interface TickData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lengthOnPath: number;
}

function subscribeMedia(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Convert Catmull-Rom points to cubic Bézier SVG path data
function catmullRomToBezier(points: [number, number][], tension = 0.5): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0][0]} ${points[0][1]} L ${points[1][0]} ${points[1][1]}`;
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : p2;

    const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * (1 - tension);
    const cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * (1 - tension);

    const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * (1 - tension);
    const cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * (1 - tension);

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return d;
}

export default function CurrentLine() {
  const { activeTributary } = useCurrentContext();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [pathData, setPathData] = useState<string>("");
  const [totalHeight, setTotalHeight] = useState<number>(1000);
  const [z3BoundaryPercent, setZ3BoundaryPercent] = useState<number>(33);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [ticks, setTicks] = useState<TickData[]>([]);
  const [visibleNodeIds, setVisibleNodeIds] = useState<Set<string>>(new Set());

  const samplesRef = useRef<SamplePoint[]>([]);
  const totalLengthRef = useRef<number>(0);
  const introProgressRef = useRef<number>(0);
  const lastDimensionsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const nodesRef = useRef<NodeData[]>(nodes);
  const ticksRef = useRef<TickData[]>(ticks);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    ticksRef.current = ticks;
  }, [ticks]);

  const isReducedMotion = useSyncExternalStore(
    subscribeMedia,
    getReducedMotionSnapshot,
    () => false
  );

  // Build waypoints and Catmull-Rom path
  const rebuildPath = useCallback(() => {
    const pageWrapper = document.getElementById("current-page-wrapper");
    if (!pageWrapper) return;

    const wrapperRect = pageWrapper.getBoundingClientRect();
    const layoutWidth = wrapperRect.width;
    const layoutHeight = wrapperRect.height;

    if (
      Math.abs(lastDimensionsRef.current.w - layoutWidth) < 2 &&
      Math.abs(lastDimensionsRef.current.h - layoutHeight) < 2
    ) {
      return;
    }
    lastDimensionsRef.current = { w: layoutWidth, h: layoutHeight };

    const isDesktop = layoutWidth >= 1024;
    const isTablet = layoutWidth >= 640 && layoutWidth < 1024;

    setTotalHeight(layoutHeight);

    const leftX = isDesktop ? layoutWidth * 0.08 : 12;
    const rightX = isDesktop ? layoutWidth * 0.92 : 12;
    const centerX = layoutWidth * 0.5;

    const zones = [
      "home",
      "about",
      "projects",
      "skills",
      "experience",
      "contact",
    ];
    const zoneElements = zones.map((id) => document.getElementById(id));
    const zoneRects = zoneElements.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        top: r.top - wrapperRect.top,
        bottom: r.bottom - wrapperRect.top,
        height: r.height,
      };
    });

    if (zoneRects[2] && layoutHeight > 0) {
      const z3Boundary = Math.max(0, Math.min(layoutHeight, zoneRects[2].top));
      setZ3BoundaryPercent((z3Boundary / layoutHeight) * 100);
    }

    const waypoints: [number, number][] = [];
    const detectedNodes: NodeData[] = [];
    const detectedTicks: TickData[] = [];

    const originMarker = document.getElementById("hero-line-origin");
    let originX = leftX;
    let originY = 200;

    if (originMarker) {
      const markerRect = originMarker.getBoundingClientRect();
      originX = markerRect.left + markerRect.width / 2 - wrapperRect.left;
      originY = markerRect.top + markerRect.height / 2 - wrapperRect.top;
    }

    waypoints.push([originX, originY]);
    detectedNodes.push({
      id: "node-origin",
      x: originX,
      y: originY,
      isFilled: false,
      lengthOnPath: 0,
    });

    if (isDesktop) {
      const z1 = zoneRects[0];
      const z2 = zoneRects[1];

      waypoints.push([originX + (rightX - originX) * 0.4, originY + 60]);
      waypoints.push([rightX, originY + 160]);

      if (z1) {
        waypoints.push([rightX, z1.bottom - z1.height * 0.12]);

        const boundary12 = z1.bottom;
        waypoints.push([rightX, boundary12 - 96]);
        waypoints.push([centerX, boundary12]);
        waypoints.push([leftX, boundary12 + 96]);
      }

      if (z2) {
        waypoints.push([leftX, z2.top + z2.height * 0.12]);
        waypoints.push([leftX, z2.bottom - z2.height * 0.12]);

        const boundary23 = z2.bottom;
        waypoints.push([leftX, boundary23 - 96]);
        waypoints.push([centerX, boundary23]);
        waypoints.push([rightX, boundary23 + 96]);
      }

      const z3 = zoneRects[2];
      if (z3) {
        waypoints.push([rightX, z3.top + z3.height * 0.08]);

        const eddyEl = document.getElementById("node-playit");
        let eddyY = z3.top + z3.height * 0.25;
        if (eddyEl) {
          const er = eddyEl.getBoundingClientRect();
          eddyY = er.top + er.height / 2 - wrapperRect.top;
        }

        const eddyRadius = isTablet ? 40 : 56;
        detectedNodes.push({
          id: "node-playit",
          x: rightX,
          y: eddyY,
          isFilled: false,
          lengthOnPath: 0,
          isEddy: true,
          tributaryId: "playit",
        });

        for (let angle = 0; angle <= 360; angle += 45) {
          const rad = (angle * Math.PI) / 180;
          const px = rightX + eddyRadius * Math.sin(rad);
          const py = eddyY - eddyRadius * Math.cos(rad);
          waypoints.push([px, py]);
        }

        const stationEls = Array.from(
          document.querySelectorAll('#projects [data-node="station"]')
        );
        stationEls.forEach((stEl, sIdx) => {
          const sr = stEl.getBoundingClientRect();
          const sy = sr.top + sr.height / 2 - wrapperRect.top;
          const sx = rightX - layoutWidth * 0.02;
          const tribAttr = stEl.getAttribute(
            "data-tributary-node"
          ) as TributaryId | null;

          waypoints.push([rightX, sy - 40]);
          waypoints.push([sx, sy]);
          waypoints.push([rightX, sy + 40]);

          detectedNodes.push({
            id: stEl.id || `node-project-${sIdx}`,
            x: sx,
            y: sy,
            isFilled: false,
            lengthOnPath: 0,
            tributaryId: tribAttr || undefined,
          });

          detectedTicks.push({
            x1: sx,
            y1: sy,
            x2: sx - 24,
            y2: sy,
            lengthOnPath: 0,
          });
        });

        waypoints.push([rightX, z3.bottom - z3.height * 0.1]);

        const boundary34 = z3.bottom;
        waypoints.push([rightX, boundary34 - 96]);
        waypoints.push([centerX, boundary34]);
        waypoints.push([leftX, boundary34 + 96]);
      }

      const z4 = zoneRects[3];
      if (z4) {
        waypoints.push([leftX, z4.top + z4.height * 0.1]);
        waypoints.push([leftX, z4.bottom - z4.height * 0.1]);

        const boundary45 = z4.bottom;
        waypoints.push([leftX, boundary45 - 96]);
        waypoints.push([centerX, boundary45]);
        waypoints.push([rightX, boundary45 + 96]);
      }

      const z5 = zoneRects[4];
      if (z5) {
        waypoints.push([rightX, z5.top + z5.height * 0.08]);

        const expEls = Array.from(
          document.querySelectorAll('#experience [data-node="waypoint"]')
        );
        expEls.forEach((expEl, eIdx) => {
          const er = expEl.getBoundingClientRect();
          const ey = er.top + er.height / 2 - wrapperRect.top;
          const ex = rightX - layoutWidth * 0.02;
          const isFilled = expEl.getAttribute("data-current") === "true";

          waypoints.push([rightX, ey - 40]);
          waypoints.push([ex, ey]);
          waypoints.push([rightX, ey + 40]);

          detectedNodes.push({
            id: expEl.id || `node-exp-${eIdx}`,
            x: ex,
            y: ey,
            isFilled,
            lengthOnPath: 0,
          });

          detectedTicks.push({
            x1: ex,
            y1: ey,
            x2: ex - 24,
            y2: ey,
            lengthOnPath: 0,
          });
        });

        waypoints.push([rightX, z5.bottom - z5.height * 0.1]);

        const boundary56 = z5.bottom;
        waypoints.push([rightX, boundary56 - 96]);
        waypoints.push([centerX, boundary56]);
        waypoints.push([leftX, boundary56 + 96]);
      }

      const z6 = zoneRects[5];
      if (z6) {
        waypoints.push([leftX, z6.top + z6.height * 0.1]);

        const emailEl = document.getElementById("contact-email-link");
        if (emailEl) {
          const emailRect = emailEl.getBoundingClientRect();
          const range = document.createRange();
          range.selectNodeContents(emailEl);
          const rects = range.getClientRects();
          const lastLineRect =
            rects.length > 0 ? rects[rects.length - 1] : emailRect;

          const underlineY = lastLineRect.bottom - wrapperRect.top + 10;
          const underlineStart = lastLineRect.left - wrapperRect.left;
          const underlineEnd = lastLineRect.right - wrapperRect.left;

          waypoints.push([leftX, underlineY - 40]);
          waypoints.push([underlineStart, underlineY]);
          waypoints.push([underlineEnd, underlineY]);
          waypoints.push([underlineEnd, underlineY]);
        }
      }
    } else {
      waypoints.push([leftX + 28, originY + 9]);
      waypoints.push([leftX, originY + 64]);

      zoneRects.forEach((z, zIdx) => {
        if (!z) return;
        waypoints.push([leftX, z.top + z.height * 0.2]);

        if (zIdx === 2) {
          const eddyEl = document.getElementById("node-playit");
          if (eddyEl) {
            const er = eddyEl.getBoundingClientRect();
            const ey = er.top + er.height / 2 - wrapperRect.top;
            waypoints.push([leftX, ey]);
            detectedNodes.push({
              id: "node-playit",
              x: leftX,
              y: ey,
              isFilled: false,
              lengthOnPath: 0,
              isEddy: true,
              tributaryId: "playit",
            });
          }

          const stationEls = Array.from(
            document.querySelectorAll('[data-node="station"]')
          );
          stationEls.forEach((stEl, sIdx) => {
            const sr = stEl.getBoundingClientRect();
            const sy = sr.top + sr.height / 2 - wrapperRect.top;
            const tribAttr = stEl.getAttribute(
              "data-tributary-node"
            ) as TributaryId | null;
            waypoints.push([leftX, sy]);
            detectedNodes.push({
              id: stEl.id || `node-project-${sIdx}`,
              x: leftX,
              y: sy,
              isFilled: false,
              lengthOnPath: 0,
              tributaryId: tribAttr || undefined,
            });
            detectedTicks.push({
              x1: leftX,
              y1: sy,
              x2: leftX + 12,
              y2: sy,
              lengthOnPath: 0,
            });
          });
        } else if (zIdx === 4) {
          const expEls = Array.from(
            document.querySelectorAll('[data-node="waypoint"]')
          );
          expEls.forEach((expEl, eIdx) => {
            const er = expEl.getBoundingClientRect();
            // Waypoint targets are hidden below desktop width; a hidden
            // element measures as 0×0 at the top of the page, which used to
            // yank the line (and a stray node) back up to y = 0.
            if (er.width === 0 && er.height === 0) return;
            const ey = er.top + er.height / 2 - wrapperRect.top;
            const isFilled = expEl.getAttribute("data-current") === "true";
            waypoints.push([leftX, ey]);
            detectedNodes.push({
              id: expEl.id || `node-exp-${eIdx}`,
              x: leftX,
              y: ey,
              isFilled,
              lengthOnPath: 0,
            });
            detectedTicks.push({
              x1: leftX,
              y1: ey,
              x2: leftX + 12,
              y2: ey,
              lengthOnPath: 0,
            });
          });
        }

        waypoints.push([leftX, z.bottom - z.height * 0.1]);
      });

      const emailEl = document.getElementById("contact-email-link");
      if (emailEl) {
        const emailRect = emailEl.getBoundingClientRect();
        const underlineY = emailRect.bottom - wrapperRect.top + 8;
        const underlineStart = emailRect.left - wrapperRect.left;
        const underlineEnd = emailRect.right - wrapperRect.left;

        waypoints.push([leftX, underlineY - 20]);
        waypoints.push([underlineStart, underlineY]);
        waypoints.push([underlineEnd, underlineY]);
      }
    }

    const svgPath = catmullRomToBezier(waypoints, 0.5);
    setPathData(svgPath);
    setNodes(detectedNodes);
    setTicks(detectedTicks);
  }, []);

  // Pre-sample path geometry once rendered
  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl || !pathData) return;

    try {
      const len = pathEl.getTotalLength();
      totalLengthRef.current = len;

      const samples: SamplePoint[] = [];
      const step = 24;
      for (let d = 0; d <= len; d += step) {
        const pt = pathEl.getPointAtLength(d);
        samples.push({ x: pt.x, y: pt.y, len: d });
      }
      samplesRef.current = samples;

      requestAnimationFrame(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            let closestDist = Infinity;
            let matchedLen = 0;
            for (let i = 0; i < samples.length; i++) {
              const dist = Math.hypot(
                samples[i].x - node.x,
                samples[i].y - node.y
              );
              if (dist < closestDist) {
                closestDist = dist;
                matchedLen = samples[i].len;
              }
            }
            return { ...node, lengthOnPath: matchedLen };
          })
        );

        setTicks((prevTicks) =>
          prevTicks.map((tick) => {
            let closestDist = Infinity;
            let matchedLen = 0;
            for (let i = 0; i < samples.length; i++) {
              const dist = Math.hypot(
                samples[i].x - tick.x1,
                samples[i].y - tick.y1
              );
              if (dist < closestDist) {
                closestDist = dist;
                matchedLen = samples[i].len;
              }
            }
            return { ...tick, lengthOnPath: matchedLen };
          })
        );
      });
    } catch {
      // Path measurement fallback
    }
  }, [pathData]);

  // Orchestrated Moment: First Stroke over 1.4s on load
  useEffect(() => {
    if (isReducedMotion) {
      return;
    }

    let startTime: number | null = null;
    const duration = 1400;
    let animId: number;

    const animateFirstStroke = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      const ease =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const firstViewportDist = Math.min(
        window.innerHeight * 1.1,
        totalLengthRef.current * 0.25
      );
      introProgressRef.current = ease * firstViewportDist;

      if (t < 1) {
        animId = requestAnimationFrame(animateFirstStroke);
      }
    };

    animId = requestAnimationFrame(animateFirstStroke);
    return () => cancelAnimationFrame(animId);
  }, [isReducedMotion]);

  // Passive Scroll Handler
  useEffect(() => {
    if (isReducedMotion) {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = "0";
      }
      return;
    }

    let rafId: number | null = null;

    const updateScrollLength = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const pathEl = pathRef.current;
        const total = totalLengthRef.current;
        const samples = samplesRef.current;
        if (!pathEl || total === 0 || samples.length === 0) return;

        const targetY = window.scrollY + 0.85 * window.innerHeight;

        let low = 0;
        let high = samples.length - 1;
        while (low <= high) {
          const mid = (low + high) >> 1;
          if (samples[mid].y < targetY) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }

        const sampleIdx = Math.max(0, Math.min(samples.length - 1, low));
        const scrollLen = samples[sampleIdx]?.len || 0;
        const currentDrawn = Math.min(
          total,
          Math.max(introProgressRef.current, scrollLen)
        );

        pathEl.style.strokeDasharray = `${total}`;
        pathEl.style.strokeDashoffset = `${Math.max(0, total - currentDrawn)}`;

        setVisibleNodeIds((prev) => {
          let changed = false;
          const next = new Set(prev);

          nodesRef.current.forEach((node) => {
            if (currentDrawn >= node.lengthOnPath && !next.has(node.id)) {
              next.add(node.id);
              changed = true;
            }
          });

          ticksRef.current.forEach((tick, idx) => {
            const tickId = `tick-${idx}`;
            if (currentDrawn >= tick.lengthOnPath && !next.has(tickId)) {
              next.add(tickId);
              changed = true;
            }
          });

          return changed ? next : prev;
        });
      });
    };

    window.addEventListener("scroll", updateScrollLength, { passive: true });
    updateScrollLength();

    return () => {
      window.removeEventListener("scroll", updateScrollLength);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion, pathData]);

  // Debounced ResizeObserver & document.fonts.ready
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const debouncedRebuild = () => {
      clearTimeout(timer);
      timer = setTimeout(rebuildPath, 150);
    };

    const pageWrapper = document.getElementById("current-page-wrapper");
    if (!pageWrapper) return;

    const ro = new ResizeObserver(debouncedRebuild);
    ro.observe(pageWrapper);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(debouncedRebuild);
    }

    const initialHandle = setTimeout(rebuildPath, 50);

    return () => {
      clearTimeout(initialHandle);
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [rebuildPath]);

  const activeTargetNodeId =
    activeTributary !== "none" ? TRIBUTARIES[activeTributary].nodeId : null;

  return (
    <svg
      ref={containerRef}
      className="current print:hidden absolute inset-0 w-full pointer-events-none z-[1] overflow-visible"
      style={{ height: totalHeight }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="current-ink"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={totalHeight}
        >
          <stop offset="0%" className="current-stop-upper" />
          <stop
            offset={`${z3BoundaryPercent.toFixed(2)}%`}
            className="current-stop-upper"
          />
          <stop
            offset={`${z3BoundaryPercent.toFixed(2)}%`}
            className="current-stop-lower"
          />
          <stop offset="100%" className="current-stop-lower" />
        </linearGradient>
      </defs>

      {/* The Continuous Catmull-Rom Path */}
      {pathData && (
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#current-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            vectorEffect: "non-scaling-stroke",
            transition: isReducedMotion ? "none" : undefined,
          }}
        />
      )}

      {/* Active Tributary Hydrodynamic Wave Pulse along the Path */}
      {pathData && activeTributary !== "none" && !isReducedMotion && (
        <path
          key={`pulse-${activeTributary}`}
          d={pathData}
          fill="none"
          stroke="var(--current-line-lower)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120 2400"
          className="tributary-spline-pulse"
          style={{
            vectorEffect: "non-scaling-stroke",
          }}
        />
      )}

      {/* Ticks: 24px strokes extending from waypoints to text */}
      {ticks.map((tick, idx) => {
        const tickId = `tick-${idx}`;
        const isVisible = isReducedMotion || visibleNodeIds.has(tickId);

        return (
          <line
            key={idx}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="url(#current-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
          />
        );
      })}

      {/* Node Rings: 14px circles (r = 7) + Active Tributary Sonar Ring */}
      {nodes.map((node) => {
        const isVisible = isReducedMotion || visibleNodeIds.has(node.id);
        const isActiveStation =
          activeTargetNodeId === node.id ||
          (node.tributaryId && node.tributaryId === activeTributary);

        return (
          <g
            key={node.id}
            className="transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            {/* Active Tributary Outer Hydrodynamic Ripple Ring */}
            {isActiveStation && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.isEddy ? 20 : 16}
                fill="none"
                stroke="var(--current-line-lower)"
                strokeWidth="1.5"
                opacity="0.55"
                className={isReducedMotion ? "" : "tributary-ripple-1"}
              />
            )}

            {/* Outer Ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isActiveStation ? 10 : node.isEddy ? 8 : 7}
              fill={
                node.isFilled || isActiveStation
                  ? "url(#current-ink)"
                  : "var(--zone-bg, #0C3742)"
              }
              stroke="url(#current-ink)"
              strokeWidth="2"
              className="transition-all duration-500"
            />
            {/* Inner Core if hollow */}
            {!node.isFilled && !isActiveStation && (
              <circle
                cx={node.x}
                cy={node.y}
                r="2.5"
                fill="url(#current-ink)"
                opacity="0.4"
                className="transition-opacity duration-500"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
