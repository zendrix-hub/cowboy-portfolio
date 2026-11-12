import json, re

with open('public/images/brand/tech_svgs_processed.json') as f:
    techs = json.load(f)

lines = []
lines.append('"use client";')
lines.append('')
lines.append('import React from "react";')
lines.append('import Image from "next/image";')
lines.append('')
lines.append('export interface LogoProps {')
lines.append('  className?: string;')
lines.append('}')
lines.append('')

# Institutional Logos
lines.append('/**')
lines.append(' * Official NEC Vector Wordmark in Official NEC Blue (#1414A0)')
lines.append(' */')
lines.append('export function NecLogo({ className = "h-6 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <svg')
lines.append('        viewBox="0 8.5 24 7"')
lines.append('        className="h-4 w-auto fill-[#1414A0] dark:fill-[#5EEAD4]"')
lines.append('        role="img"')
lines.append('        aria-label="NEC Corporation Logo"')
lines.append('      >')
lines.append('        <path d="M21.496 8.8a13.892 13.892 0 0 0-2.453.198c-.6.11-1.165.223-1.693.57-.807.526-1.076 1.49-1.086 2.394-.012.98.283 2.06 1.21 2.54.735.384 1.537.552 2.355.624 1.397.118 2.792.1 4.171-.09v-.98c-1.04.19-2.107.31-3.184.152-1.652-.24-1.93-1.473-1.93-2.286 0-.451.06-.987.482-1.526.676-.865 2.667-.956 4.55-.59V8.95a22.777 22.777 0 0 0-2.422-.15zm-12.812.197v4.446c.03.744.295 1.518 1.834 1.581 1.814.075 3.54.045 5.334-.024v-.896c-.89.014-3.487.001-3.65 0-.704-.042-.973-.256-.998-.837a32.12 32.12 0 0 1-.02-1.055h4.177v-.834h-4.176V9.851h4.582v-.854zM0 8.997v5.999h1.146v-4.254l3.383 3.764c.41.404.763.478 1.122.49h2.015V8.997h-1.15v4.397l-3.39-3.757c-.232-.227-.753-.64-1.194-.64z"/>')
lines.append('      </svg>')
lines.append('      <span className="font-mono text-[0.6875rem] font-bold text-[#1414A0] dark:text-[#5EEAD4] tracking-wide">')
lines.append('        PHILIPPINES')
lines.append('      </span>')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

lines.append('/**')
lines.append(' * Official Cebu Institute of Technology - University (CIT-U) Seal in Maroon (#721C1E) and Gold (#F8C400)')
lines.append(' */')
lines.append('export function CitUniversityLogo({ className = "h-7 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center px-2 py-0.5 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <Image')
lines.append('        src="/images/brand/citu.webp"')
lines.append('        alt="Cebu Institute of Technology – University (CIT-U) Emblem"')
lines.append('        width={160}')
lines.append('        height={28}')
lines.append('        className="h-5 w-auto object-contain"')
lines.append('      />')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

lines.append('/**')
lines.append(' * Official AWS Logo with Squid Ink Navy and Signature Amazon Orange Smile Arrow (#FF9900)')
lines.append(' */')
lines.append('export function AwsLogo({ className = "h-7 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <svg')
lines.append('        viewBox="0 0 24 24"')
lines.append('        className="h-5 w-auto"')
lines.append('        role="img"')
lines.append('        aria-label="Amazon Web Services"')
lines.append('      >')
lines.append('        <path')
lines.append('          fill="#232F3E"')
lines.append('          className="dark:fill-white"')
lines.append('          d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"')
lines.append('        />')
lines.append('        <path')
lines.append('          fill="#FF9900"')
lines.append('          d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"')
lines.append('        />')
lines.append('      </svg>')
lines.append('      <span className="font-mono text-[0.6875rem] font-bold text-[#FF9900] tracking-wide">')
lines.append('        ACADEMY')
lines.append('      </span>')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

lines.append('/**')
lines.append(' * Official IBM 8-Bar Logo in Official IBM Blue (#0F62FE)')
lines.append(' */')
lines.append('export function IbmLogo({ className = "h-7 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <svg')
lines.append('        viewBox="0 0 24 24"')
lines.append('        fill="#0F62FE"')
lines.append('        className="h-4 w-auto"')
lines.append('        role="img"')
lines.append('        aria-label="IBM SkillsBuild"')
lines.append('      >')
lines.append('        <path d="M23.544 15.993c.038 0 .06-.017.06-.053v-.036c0-.035-.022-.052-.06-.052h-.09v.14zm-.09.262h-.121v-.498h.225c.112 0 .169.066.169.157 0 .079-.036.129-.09.15l.111.19h-.133l-.092-.17h-.07zm.434-.222v-.062c0-.2-.157-.357-.363-.357a.355.355 0 00-.363.357v.062c0 .2.156.358.363.358a.355.355 0 00.363-.358zm-.838-.03c0-.28.212-.492.475-.492.264 0 .475.213.475.491 0 .279-.211.491-.475.491a.477.477 0 01-.475-.49zM16.21 8.13l-.216-.624h-3.56v.624zm.413 1.19l-.216-.623h-3.973v.624zm2.65 7.147h3.107v-.624h-3.108zm0-1.192h3.107v-.623h-3.108zm0-1.19h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-3.555l-.175.504-.175-.504h-3.555v.624h1.865v-.574l.2.574h3.33l.2-.574zm1.864-1.815h-3.142l-.217.624h3.359zm-7.46 3.006h1.865v-.624h-1.865zm0 1.19h1.865v-.623h-1.865zm-1.243 1.191h3.108v-.623h-3.108zm0 1.192h3.108v-.624h-3.108zm6.386-8.961l-.216.624h3.776v-.624zm-.629 1.815h4.19v-.624h-3.974zm-4.514 1.19h3.359l-.216-.623h-3.143zm2.482 2.383h2.496l.218-.624h-2.932zm.417 1.19h1.662l.218-.623h-2.098zm.416 1.191h.83l.218-.623h-1.266zm.414 1.192l.217-.624h-.432zm-12.433-.006l4.578.006c.622 0 1.18-.237 1.602-.624h-6.18zm4.86-3v.624h2.092c0-.216-.03-.425-.083-.624zm-3.616.624h1.865v-.624H6.217zm3.617-3.573h2.008c.053-.199.083-.408.083-.624H9.834zm-3.617 0h1.865v-.624H6.217zM9.55 7.507H4.973v.624h6.18a2.36 2.36 0 00-1.602-.624zm2.056 1.191H4.973v.624h6.884a2.382 2.382 0 00-.25-.624zm-5.39 2.382v.624h4.87c.207-.176.382-.387.519-.624zm4.87 1.191h-4.87v.624h5.389a2.39 2.39 0 00-.519-.624zm-6.114 3.006h6.634c.11-.193.196-.402.25-.624H4.973zM0 8.13h4.352v-.624H0zm0 1.191h4.352v-.624H0zm1.243 1.191h1.865v-.624H1.243zm0 1.191h1.865v-.624H1.243zm0 1.19h1.865v-.623H1.243zm0 1.192h1.865v-.624H1.243zM0 15.276h4.352v-.623H0zm0 1.192h4.352v-.624H0Z"/>')
lines.append('      </svg>')
lines.append('      <span className="font-mono text-[0.6875rem] font-bold text-[#0F62FE] tracking-wide">')
lines.append('        SkillsBuild')
lines.append('      </span>')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

lines.append('/**')
lines.append(' * Official OpenLearning Logo')
lines.append(' */')
lines.append('export function OpenLearningLogo({ className = "h-7 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center px-2 py-0.5 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <Image')
lines.append('        src="/images/brand/openlearning.webp"')
lines.append('        alt="OpenLearning Logo"')
lines.append('        width={130}')
lines.append('        height={26}')
lines.append('        className="h-5 w-auto object-contain"')
lines.append('      />')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

lines.append('/**')
lines.append(' * Official PhilNITS Logo')
lines.append(' */')
lines.append('export function PhilNitsLogo({ className = "h-7 w-auto" }: LogoProps) {')
lines.append('  return (')
lines.append('    <div className={`inline-flex items-center px-2 py-0.5 rounded-md bg-white/95 dark:bg-[#071924]/90 border border-zinc-200/80 dark:border-[#7CE8DD]/25 shadow-sm ${className}`}>')
lines.append('      <Image')
lines.append('        src="/images/brand/philnits.webp"')
lines.append('        alt="PhilNITS Foundation Logo"')
lines.append('        width={110}')
lines.append('        height={28}')
lines.append('        className="h-5 w-auto object-contain"')
lines.append('      />')
lines.append('    </div>')
lines.append('  );')
lines.append('}')
lines.append('')

# Technology Icon Renderer
lines.append('/**')
lines.append(' * Exact Technology Vector Icon Renderer')
lines.append(' * Uses official brand vectors and authentic multi-color palettes.')
lines.append(' */')
lines.append('export function TechLogo({')
lines.append('  name,')
lines.append('  className = "w-4 h-4 shrink-0",')
lines.append('}: {')
lines.append('  name: string;')
lines.append('  className?: string;')
lines.append('}) {')
lines.append('  const key = name.toLowerCase();')
lines.append('')

def render_svg_case(cond, item_key, lines_list):
    info = techs[item_key]
    lines_list.append(f'  if ({cond}) {{')
    lines_list.append('    return (')
    lines_list.append(f'      <svg viewBox="{info["viewBox"]}" className={{className}} aria-hidden="true">')
    for line in info['inner'].split('\n'):
        lines_list.append(f'        {line}')
    lines_list.append('      </svg>')
    lines_list.append('    );')
    lines_list.append('  }')
    lines_list.append('')

# Kotlin
render_svg_case('key.includes("kotlin")', 'kotlin', lines)

# Android Studio
render_svg_case('key.includes("android studio")', 'androidstudio', lines)

# Android / Android SDK
render_svg_case('key.includes("android")', 'android', lines)

# Jetpack Compose / Material
render_svg_case('key.includes("compose") || key.includes("material")', 'jetpackcompose', lines)

# Java (not javascript)
render_svg_case('key.includes("java") && !key.includes("javascript")', 'java', lines)

# JavaScript
render_svg_case('key.includes("javascript") || key === "js"', 'javascript', lines)

# TypeScript
render_svg_case('key.includes("typescript") || key === "ts"', 'typescript', lines)

# Spring Boot / Spring Security
render_svg_case('key.includes("spring")', 'springboot', lines)

# Python
render_svg_case('key.includes("python")', 'python', lines)

# FastAPI
render_svg_case('key.includes("fastapi")', 'fastapi', lines)

# Pydantic
render_svg_case('key.includes("pydantic")', 'pydantic', lines)

# Docker / Docker Compose
render_svg_case('key.includes("docker")', 'docker', lines)

# NGINX
render_svg_case('key.includes("nginx")', 'nginx', lines)

# MySQL
render_svg_case('key.includes("mysql")', 'mysql', lines)

# SQLite
render_svg_case('key.includes("sqlite")', 'sqlite', lines)

# Room (Android Database)
lines.append('  if (key.includes("room")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#3DDC84" />')
lines.append('        <path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" fill="#2EA865" />')
lines.append('        <path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" fill="#1E7A46" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# Google Gemini / GenAI
lines.append('  if (key.includes("gemini") || key.includes("genai")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">')
lines.append('        <defs>')
lines.append('          <linearGradient id="gemini_sparkle_grad" x1="0%" y1="0%" x2="100%" y2="100%">')
lines.append('            <stop offset="0%" stopColor="#1BA1E3" />')
lines.append('            <stop offset="50%" stopColor="#547AFF" />')
lines.append('            <stop offset="100%" stopColor="#9B72CB" />')
lines.append('          </linearGradient>')
lines.append('        </defs>')
lines.append('        <path fill="url(#gemini_sparkle_grad)" d="M12.017 0C12.18 5.766 18.234 11.82 24 11.983v.034c-5.766.163-11.82 6.217-11.983 12h-.034C11.82 18.234 5.766 12.18 0 12.017v-.034C5.766 11.82 11.82 5.766 11.983 0z" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# ChromaDB
lines.append('  if (key.includes("chroma") || key.includes("vector")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">')
lines.append('        <rect x="3" y="4" width="7" height="7" rx="2" fill="#FF1493" />')
lines.append('        <rect x="14" y="4" width="7" height="7" rx="2" fill="#FFD700" />')
lines.append('        <rect x="8.5" y="13" width="7" height="7" rx="2" fill="#00D2FF" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# Langfuse / RAG / Telemetry
lines.append('  if (key.includes("langfuse") || key.includes("rag") || key.includes("trace")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <circle cx="12" cy="12" r="9" stroke="#EC4899" strokeWidth="2" />')
lines.append('        <path d="M8 12L11 15L16 9" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# Streamlit
render_svg_case('key.includes("streamlit")', 'streamlit', lines)

# Git (not github)
render_svg_case('key.includes("git") && !key.includes("github")', 'git', lines)

# GitHub
render_svg_case('key.includes("github")', 'github', lines)

# Postman
render_svg_case('key.includes("postman")', 'postman', lines)

# Linux
render_svg_case('key.includes("linux")', 'linux', lines)

# React
render_svg_case('key.includes("react")', 'react', lines)

# Next.js
render_svg_case('key.includes("next")', 'nextjs', lines)

# Tailwind CSS
render_svg_case('key.includes("tailwind")', 'tailwindcss', lines)

# Cloudinary
render_svg_case('key.includes("cloudinary")', 'cloudinary', lines)

# Leaflet
render_svg_case('key.includes("leaflet")', 'leaflet', lines)

# HTML / HTML5
render_svg_case('key.includes("html")', 'html5', lines)

# CSS / CSS3
render_svg_case('key.includes("css")', 'css3', lines)

# AWS / Cloud
lines.append('  if (key.includes("aws") || key.includes("amazon") || key.includes("cloud")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">')
lines.append('        <path fill="#232F3E" className="dark:fill-white" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />')
lines.append('        <path fill="#FF9900" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# Audio / Speech / Vosk / PocketSphinx
lines.append('  if (key.includes("vosk") || key.includes("sphinx") || key.includes("speech") || key.includes("audio")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <line x1="4" y1="10" x2="4" y2="14" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />')
lines.append('        <line x1="8" y1="6" x2="8" y2="18" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />')
lines.append('        <line x1="12" y1="3" x2="12" y2="21" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />')
lines.append('        <line x1="16" y1="7" x2="16" y2="17" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />')
lines.append('        <line x1="20" y1="10" x2="20" y2="14" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# iText7 / PDF
lines.append('  if (key.includes("itext") || key.includes("pdf")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EF4444" fillOpacity="0.2" stroke="#DC2626" strokeWidth="1.8" />')
lines.append('        <path d="M14 2V8H20" stroke="#DC2626" strokeWidth="1.8" />')
lines.append('        <path d="M9 13H15M9 17H13" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# ExoPlayer
lines.append('  if (key.includes("exoplayer") || key.includes("player")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">')
lines.append('        <polygon points="5,3 19,12 5,21" fill="#EA4335" />')
lines.append('        <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2" fill="none" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# APScheduler / Cron
lines.append('  if (key.includes("apscheduler") || key.includes("cron") || key.includes("schedul")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="2" />')
lines.append('        <polyline points="12,6 12,12 16,14" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# REST / API
lines.append('  if (key.includes("rest") || key.includes("api")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <rect x="2" y="6" width="20" height="12" rx="4" stroke="#0284C7" strokeWidth="1.8" fill="#38BDF8" fillOpacity="0.15" />')
lines.append('        <path d="M6 12H18M15 9L18 12L15 15" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# SQL / Database Default
lines.append('  if (key.includes("sql") || key.includes("data")) {')
lines.append('    return (')
lines.append('      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#0284C7" fillOpacity="0.3" stroke="#0369A1" strokeWidth="1.8" />')
lines.append('        <path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" stroke="#0369A1" strokeWidth="1.8" />')
lines.append('        <path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" stroke="#0369A1" strokeWidth="1.8" />')
lines.append('      </svg>')
lines.append('    );')
lines.append('  }')
lines.append('')

# Default Engineering Node
lines.append('  return (')
lines.append('    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">')
lines.append('      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" fill="currentColor" fillOpacity="0.1" />')
lines.append('      <path d="M9 9L6.5 12L9 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />')
lines.append('      <path d="M15 9L17.5 12L15 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />')
lines.append('      <line x1="13" y1="8.5" x2="11" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />')
lines.append('    </svg>')
lines.append('  );')
lines.append('}')
lines.append('')

output_code = '\n'.join(lines)
with open('components/current/BrandLogos.tsx', 'w') as f:
    f.write(output_code)

print('Successfully written components/current/BrandLogos.tsx! Total lines:', len(lines))
