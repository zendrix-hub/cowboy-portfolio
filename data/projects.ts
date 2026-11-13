export interface DataContract {
  input: string;
  processing: string;
  output: string;
}

export interface ArchitectureStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  dataContract?: DataContract;
  specs?: string;
  tradeoff?: string;
}

export interface StoryboardBeat {
  beat: number;
  timeRange: string;
  shortLabel: string;
  role: string;
  shot: string;
  action: string;
  hudBadge: string;
  stageIndex: number | null;
  semanticAccent: "rose" | "cyan" | "sky" | "emerald" | "amber";
}


export interface EvaluationResult {
  figure: string;
  label: string;
  basis: string;
}

export interface ProjectEvaluation {
  title: string;
  summary: string;
  results: EvaluationResult[];
  quote?: { text: string; source: string };
  note: string;
}

export interface Project {
  slug: "playit" | "readhub" | "daloyaqua" | "gordon-ramsai";
  title: string;
  subtitle?: string;
  roleContext?: string;
  description: string;
  problem: string;
  constraints: string;
  architecture: string;
  highlights: string[];
  architectureSteps: ArchitectureStep[];
  storyboardBeats: StoryboardBeat[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  storyboardSheetUrl?: string;
  image?: string;
  featured?: boolean;
  status?: string;
  evaluation?: ProjectEvaluation;
  category?: "Mobile" | "Web" | "Backend" | "AI / Full-Stack";
}

export const projects: Project[] = [
  {
    slug: "playit",
    title: "PlayIT",
    subtitle: "Mobile Phonics & Reading Literacy System (BasaTrack)",
    roleContext: "Project Manager & Core Android Developer • Capstone Team",
    featured: true,
    status: "Flagship Engineering Thesis",
    category: "Mobile",
    description:
      "A native Android phonics literacy platform engineered for Filipino Grade 1 learners with Marungko-grouped lessons. Designed for zero-connectivity classrooms, running on-device Vosk speech evaluation and isolated multi-learner profiles completely offline.",
    problem:
      "Early grade reading literacy in resource-constrained Philippine public schools requires focused phonetic intervention, but classrooms frequently suffer from unreliable internet and high teacher-to-student ratios (40+ pupils per class).",
    constraints:
      "100% offline operation post-install with zero cloud dependencies; must run smoothly on budget Android tablets with isolated multi-learner local storage.",
    architecture:
      "Clean Architecture with strict MVVM separation. Decoupled audio recording, bundled ~68MB Vosk offline speech recognition, and Jetpack Compose UI presentation through Kotlin Coroutines and StateFlow.",
    highlights: [
      "Engineered an offline-first Android phonics platform with 691 passing unit tests (0 failed across 697 tests), adhering to Clean Architecture with strict Kotlin-only domain/ separation.",
      "Integrated bundled Vosk 0.3.47 offline acoustic recognition with foil grammars and mouth articulation visual scaffolding without cellular data or remote API dependencies.",
      "Built multi-learner profile isolation (Room SQLite) and Bohol Chocolate Hills curriculum progression covering 26 letters across 7 chapters with decodable CVC words (SAM, SIS, AM).",
    ],
    storyboardBeats: [
      {
        beat: 1,
        timeRange: "00:00 – 00:05",
        shortLabel: "01 Problem",
        role: "Problem & Constraint",
        shot: "Medium-Wide 3/4 Shot (16:9)",
        action:
          "A crowded Philippine public school classroom (40+ pupils in soft twilight zinc #18181b depth) has a glowing Rose (#f43f5e) NO INTERNET icon outside the window and an Amber (#f59e0b) LOW-COST TABLET badge. In the foreground, a round-cheeked Grade 1 pupil opens PlayIT to 6 isolated profile avatars.",
        hudBadge: "PROBLEM: 0% INTERNET • 6 PROFILES/TABLET",
        stageIndex: null,
        semanticAccent: "rose",
      },
      {
        beat: 2,
        timeRange: "00:05 – 00:10",
        shortLabel: "02 Stage 01",
        role: "Stage 01: Audio Capture",
        shot: "Close-Up 3/4 Profile",
        action:
          "The pupil selects their profile and speaks the syllable 'BA' aloud. Their circular Ghibli eyes catch a bright #06b6d4 cyan highlight as a dimensional, cel-shaded cyan sound wave streams from their mouth into a spinning in-memory ring buffer on the tablet edge (no disk wear).",
        hudBadge: "STAGE 01 // 16kHz PCM → RING BUFFER",
        stageIndex: 0,
        semanticAccent: "cyan",
      },
      {
        beat: 3,
        timeRange: "00:10 – 00:15",
        shortLabel: "03 Stage 02",
        role: "Stage 02: Edge Vosk ASR",
        shot: "Isometric Glassmorphic Cutaway",
        action:
          "Camera glides inside the dark #09090b tablet interior lit by floating #06b6d4 and #0ea5e9 blobs. The cyan audio wave flows through the packaged on-device Vosk acoustic crystal, decoding phoneme tokens ['b', 'a'] locally while a crossed-out cloud server above stays completely dark.",
        hudBadge: "STAGE 02 // OFFLINE VOSK ASR DECODING",
        stageIndex: 1,
        semanticAccent: "sky",
      },
      {
        beat: 4,
        timeRange: "00:15 – 00:20",
        shortLabel: "04 Stage 03",
        role: "Stage 03: Domain Scorer",
        shot: "Macro Pipeline Split Shot",
        action:
          "A tactile Kotlin StateFlow conduit carries the ['b', 'a'] phoneme orbs into the Marungko Syllable Matrix gate; the gate matches the target drill and flips a dimensional toggle from #06b6d4 cyan to #10b981 emerald (EvaluationResult.Success).",
        hudBadge: "STAGE 03 // MARUNGKO SCORER → STATEFLOW",
        stageIndex: 2,
        semanticAccent: "emerald",
      },
      {
        beat: 5,
        timeRange: "00:20 – 00:25",
        shortLabel: "05 Stage 04",
        role: "Stage 04: Room SQLite",
        shot: "Medium Close-Up on Tablet & Child",
        action:
          "Only the active Jetpack Compose lesson card recomposes with a glowing #10b981 emerald star while an animated data capsule locks into Compartment #3 of a 6-slot Room SQLite vault inside the tablet.",
        hudBadge: "STAGE 04 // ACID ROOM SQLITE (6 PROFILES)",
        stageIndex: 3,
        semanticAccent: "emerald",
      },
      {
        beat: 6,
        timeRange: "00:25 – 00:30",
        shortLabel: "06 Trade-Off",
        role: "Trade-Off & Impact",
        shot: "Wide Hero Resolution Shot",
        action:
          "A clean visual scale badge shows On-Device Ring Buffer + Embedded Vosk outweighing Cloud API Costs & Dead-Zones; the pupil beams with a wide Ghibli smile under a #06b6d4 cyan and golden top-right spotlight rim before looping smoothly back to Beat 1.",
        hudBadge: "TRADE-OFF // 100% OFFLINE • ZERO CLOUD COST",
        stageIndex: 3,
        semanticAccent: "amber",
      },
    ],

    architectureSteps: [
      {
        step: "01",
        title: "On-Device Audio Capture",
        subtitle: "16kHz Mono Stream",
        description:
          "AudioRecord captures learner speech input directly into an in-memory ring buffer with sample-rate validation, ensuring zero cloud transit dependency.",
        technologies: ["Android AudioRecord", "Kotlin Coroutines"],
        dataContract: {
          input: "Microphone analog PCM input @ 16kHz, 16-bit Mono",
          processing:
            "Android AudioRecord streaming into in-memory non-blocking ring buffer",
          output: "ByteArray audio stream without temporary disk allocations",
        },
        specs: "16kHz 16-bit Mono PCM | Zero network I/O",
        tradeoff:
          "In-memory buffer avoids flash storage wear on budget tablets and eliminates temporary file I/O pauses during speech capture.",
      },
      {
        step: "02",
        title: "Edge Speech Recognition (ASR)",
        subtitle: "Vosk Embedded Kaldi Model",
        description:
          "Bundled ~68MB offline Vosk acoustic model processes audio frames locally on the device, computing phoneme and word hypotheses without network access.",
        technologies: ["Vosk ASR Engine", "Offline Acoustic Model"],
        dataContract: {
          input: "16kHz 16-bit PCM audio chunks from buffer",
          processing:
            "On-device Vosk Kaldi acoustic model decoding against Marungko lesson targets",
          output: "Recognized utterance hypothesis emitted to domain layer",
        },
        specs: "Bundled model: ~68MB in APK assets | 100% Offline execution",
        tradeoff:
          "Packaged offline Vosk model runs entirely on-device. Cloud speech APIs were rejected due to classroom connectivity dead-zones and recurring API costs.",
      },
      {
        step: "03",
        title: "Domain Scorer & StateFlow",
        subtitle: "Marungko Lesson Evaluation",
        description:
          "Domain UseCases evaluate spoken hypotheses against Marungko-grouped syllable and word drills, emitting immutable UI state through Kotlin StateFlow via MVVM.",
        technologies: ["MVVM", "Clean Architecture", "StateFlow"],
        dataContract: {
          input: "Hypothesis string from Vosk recognizer",
          processing:
            "Domain UseCase compares spoken output against target Marungko lesson item",
          output: "Immutable lesson evaluation state dispatched to Compose UI",
        },
        specs: "State dispatch: Kotlin StateFlow | UI: Jetpack Compose",
        tradeoff:
          "Strict Clean Architecture decouples evaluation rules from Compose UI, enabling independent testing of audio, UI, and data layers.",
      },
      {
        step: "04",
        title: "Local Persistence & Profiles",
        subtitle: "Multi-Learner Room SQLite",
        description:
          "Room SQLite database isolates progress and lesson mastery across up to 6 distinct learner profiles on a single shared classroom tablet.",
        technologies: ["Room (SQLite)", "Jetpack Compose"],
        dataContract: {
          input: "LearnerProfileSession(profileId, lessonId, masteryState)",
          processing:
            "Room SQLite DAO transactional insert isolated by learner profile ID",
          output: "Persisted offline learner mastery state across 6 profiles",
        },
        specs: "Schema: Up to 6 isolated learner profiles per tablet",
        tradeoff:
          "Local Room SQLite persistence allows multiple students to share one classroom tablet without overwriting each other's reading progress.",
      },
    ],
    tags: [
      "Kotlin",
      "Android SDK",
      "Jetpack Compose",
      "Material 3",
      "MVVM",
      "Clean Architecture",
      "Vosk (Edge ASR)",
      "Room (SQLite)",
      "Coroutines & StateFlow",
      "Hilt",
    ],
    evaluation: {
      title: "Field evaluation with real users",
      summary:
        "Tested with 30 participants across two rounds (Sept to Nov 2026): 16 Grade 1 learners, 5 parents or supervising adults, and 9 teachers and reading specialists.",
      results: [
        {
          figure: "15 of 16",
          label: "learners chose the happy face",
          basis: "Smileyometer, 16 learners",
        },
        {
          figure: "14 of 16",
          label: "learners wanted to play again",
          basis: "Smileyometer, 16 learners",
        },
        {
          figure: "4.6 / 5",
          label: "fit for Grade 1, rated by parents",
          basis: "Mean of 5 parents",
        },
        {
          figure: "4.4 / 5",
          label: "would recommend, rated by parents",
          basis: "Mean of 5 parents",
        },
        {
          figure: "75.5",
          label: "System Usability Scale score",
          basis: "5 parents; 68 is the usual average",
        },
        {
          figure: "4.7 / 5",
          label: "teaching design, rated by teachers",
          basis: "Mean of a 16-item rubric, 5 of the 9 teachers",
        },
      ],
      quote: {
        text: "The app is very useful and engaging for Grade 1 learners.",
        source: "DepEd Grade 1 teacher, Round 1",
      },
      note: "Capstone evaluation data frozen on 12 Nov 2026 for TekCon 2026. Small samples: these are early signals, not proof of learning gains.",
    },
    githubUrl: "https://github.com/zendrix-hub/playIt",
    videoUrl: "/videos/playit.mp4?v=playit-current-v8",
    posterUrl: "/images/projects/playit-poster.webp",
    storyboardSheetUrl: "/images/projects/playit-storyboard.webp",
  },
  {
    slug: "readhub",
    title: "ReadHub",
    subtitle: "Peer Lending & Library Management Web Portal",
    roleContext: "Backend Lead & Full-Stack Contributor • 4-Member Capstone Team",
    featured: false,
    status: "Completed",
    category: "Web",
    description:
      "A full-stack campus peer lending and academic library management system engineered for university students and administrators. Features multi-role JWT authentication (ROLE_STUDENT and ROLE_ADMIN), borrowing request lifecycle workflows (PENDING → APPROVED → BORROWED → OVERDUE → RETURNED), automated overdue background scheduling via ShedLock & async email notices, and an interactive glassmorphic dashboard with live 5-second polling and monthly borrowing trends.",
    problem:
      "Academic communities frequently rely on fragile, manual spreadsheet workflows to track shared technical textbooks and lab reserve items, resulting in lost inventory and unmonitored overdue materials.",
    constraints:
      "Multi-role authorization (Student vs. Administrator) requiring stateless security, dependable token validation, and reproducible multi-service container deployment across environments.",
    architecture:
      "Multi-tier architecture in Java 17 and Spring Boot 3 implementing the Controller-Service-Repository pattern, containerized alongside MySQL and Nginx via Docker Compose.",
    highlights: [
      "Architected Spring Boot 3.2.5 RESTful microservices with Spring Security, stateless JJWT authentication, and role-based access control protecting student and administrative endpoints.",
      "Engineered borrowing request finite-state lifecycle (PENDING → APPROVED → BORROWED → OVERDUE → RETURNED) with ShedLock daily distributed scheduler and async overdue email alerts.",
      "Built responsive React frontend adopting CIT-U Maroon (#821124) and Gold (#FDC83A) brand palette with glassmorphism, live 5-second polling notifications, urgent action modals, and SVG borrowing trend charts.",
      "Deployed frontend to Vercel and containerized backend services with MySQL via Docker Compose for production parity.",
    ],
    storyboardBeats: [
      {
        beat: 1,
        timeRange: "00:00 – 00:05",
        shortLabel: "01 Problem",
        role: "Problem & Constraint",
        shot: "Medium-Wide 3/4 Shot (16:9)",
        action:
          "In a twilight-zinc (#09090b / #18181b) campus library lit by subtle #06b6d4 and #0ea5e9 ambient blobs, paper spreadsheet logs scatter in Rose (#f43f5e) alert sparks beside a missing textbook shelf. The student librarian reacts with raised Pixar brows.",
        hudBadge: "PROBLEM: FRAGILE SPREADSHEETS & LOST BOOKS",
        stageIndex: null,
        semanticAccent: "rose",
      },
      {
        beat: 2,
        timeRange: "00:05 – 00:10",
        shortLabel: "02 Stage 01",
        role: "Stage 01: Nginx Gateway",
        shot: "Over-the-Shoulder 3/4 Shot",
        action:
          "The librarian opens the ReadHub Live Portal. A Docker Compose constellation of 3 translucent glassmorphic cubes appears; the front Nginx Gateway cube serves cached React UI instantly while routing /api/* requests down a glowing #06b6d4 cyan conduit to Spring Boot 3.",
        hudBadge: "STAGE 01 // DOCKER NGINX REVERSE PROXY",
        stageIndex: 0,
        semanticAccent: "cyan",
      },
      {
        beat: 3,
        timeRange: "00:10 – 00:15",
        shortLabel: "03 Stage 02",
        role: "Stage 02: Stateless JWT",
        shot: "Macro Cutaway on Security Gate",
        action:
          "A request carrying a glowing cyan JWT key token passes through the Spring Security 6 filter chain (OncePerRequestFilter), verifying the HMAC-SHA256 signature and stamping a ROLE_STUDENT vs. ROLE_ADMIN badge—while an old session-storage cabinet fades away.",
        hudBadge: "STAGE 02 // STATELESS JWT ROLE GUARD",
        stageIndex: 1,
        semanticAccent: "sky",
      },
      {
        beat: 4,
        timeRange: "00:15 – 00:20",
        shortLabel: "04 Stage 03",
        role: "Stage 03: Lifecycle & ShedLock",
        shot: "Mechanical-Ghibli Track Shot",
        action:
          "Inside the Spring Boot 3 service layer, a textbook card glides along a state-machine rail (Available → Requested → Borrowed → Overdue), while overhead a single ShedLock padlock clockwork gear ticks once—blocking duplicate cron alerts across replicas.",
        hudBadge: "STAGE 03 // STATE LIFECYCLE + SHEDLOCK CRON",
        stageIndex: 2,
        semanticAccent: "emerald",
      },
      {
        beat: 5,
        timeRange: "00:20 – 00:25",
        shortLabel: "05 Stage 04",
        role: "Stage 04: MySQL & Cloudinary",
        shot: "Split Persistence Cutaway",
        action:
          "The transactional borrow record locks into an ACID MySQL crystal cylinder with an Emerald (#10b981) pulse, while heavy book-cover image streams offload upward to a sleek Cloudinary CDN prism that returns optimized WebP covers.",
        hudBadge: "STAGE 04 // ACID MYSQL + CLOUDINARY CDN",
        stageIndex: 3,
        semanticAccent: "emerald",
      },
      {
        beat: 6,
        timeRange: "00:25 – 00:30",
        shortLabel: "06 Trade-Off",
        role: "Trade-Off & Impact",
        shot: "Medium Close-Up 3/4 Resolution",
        action:
          "The tall-silhouetted librarian flashes a composed KeshArt smirk as the dashboard displays organized book states and crisp covers under a #06b6d4 cyan spotlight rim, looping seamlessly back to Beat 1.",
        hudBadge: "TRADE-OFF // STATELESS SCALE + ZERO DB BLOAT",
        stageIndex: 3,
        semanticAccent: "amber",
      },
    ],

    architectureSteps: [
      {
        step: "01",
        title: "Client Gateway & Proxy",
        subtitle: "Dockerized Nginx Server",
        description:
          "Nginx acts as the primary web server and reverse proxy, routing authenticated API calls to Spring Boot while delivering cached React static assets.",
        technologies: ["Nginx", "Docker Compose", "Vite / React"],
        dataContract: {
          input: "Client HTTP/HTTPS request (port 80/443)",
          processing:
            "Nginx serves React static build and reverse-proxies /api/* to Spring Boot container",
          output: "Reverse-proxied HTTP stream with Gzip compression",
        },
        specs: "Multi-container Docker Compose network (Nginx + Spring Boot + MySQL)",
        tradeoff:
          "Separating static asset delivery from the Spring Boot application server keeps JVM threads focused on API business logic.",
      },
      {
        step: "02",
        title: "Security & JWT Filter Chain",
        subtitle: "Stateless Role Authorization",
        description:
          "Spring Security filter chain intercepts every request, validates signed JWT claims, and enforces granular role permissions (Student vs. Administrator).",
        technologies: ["Spring Security 6", "JWT Auth", "BCrypt"],
        dataContract: {
          input: "Authorization: Bearer <jwt_token>",
          processing:
            "OncePerRequestFilter verifies HMAC-SHA256 signature, extracts claims, loads UserDetails",
          output:
            "SecurityContextHolder populated with AuthenticatedUser(role=ROLE_STUDENT)",
        },
        specs: "Stateless session policy (SessionCreationPolicy.STATELESS)",
        tradeoff:
          "Stateless JWT tokens eliminate server-side session storage, simplifying containerized deployment.",
      },
      {
        step: "03",
        title: "Service Layer & State Lifecycle",
        subtitle: "Controller-Service-Repository",
        description:
          "Business logic manages transactional book availability and borrow state lifecycles, orchestrating overdue tracking with ShedLock cron locks.",
        technologies: ["Spring Boot 3", "ShedLock Cron", "REST APIs"],
        dataContract: {
          input: "BorrowRequestDTO(bookId, userId)",
          processing:
            "Spring Service validates availability in @Transactional boundary, advances state (Available -> Borrowed)",
          output: "BorrowRecord entity with calculated dueDate",
        },
        specs: "ShedLock distributed lock for scheduled overdue audit jobs",
        tradeoff:
          "ShedLock ensures scheduled overdue background tasks run without duplicate execution across container restarts or replicas.",
      },
      {
        step: "04",
        title: "Persistence & Media CDN",
        subtitle: "ACID Relational Storage",
        description:
          "Spring Data JPA maps entities to a MySQL container for transactional integrity, while book cover assets are stored on Cloudinary CDN.",
        technologies: ["MySQL", "Spring Data JPA", "Cloudinary"],
        dataContract: {
          input: "Entity state changes & multipart book cover uploads",
          processing:
            "Hibernate maps entities to MySQL container; Cloudinary SDK stores cover images",
          output: "ACID transactional commit in MySQL + Cloudinary CDN asset URL",
        },
        specs: "Connection pooling: HikariCP | Media: Cloudinary CDN",
        tradeoff:
          "Offloading binary cover images to Cloudinary prevents relational database bloat and keeps backups lightweight.",
      },
    ],
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security",
      "JWT (JJWT)",
      "Spring Data JPA",
      "MySQL",
      "HikariCP",
      "React",
      "SCSS",
      "ShedLock",
      "REST APIs",
      "Vercel",
    ],
    githubUrl: "https://github.com/zendrix-hub/ReadHub-IT342-G01-Group8",
    liveUrl: "https://readhub-three.vercel.app/login",
    videoUrl: "/videos/readhub.mp4?v=readhub-pure-video-v5",
    posterUrl: "/images/projects/readhub-poster.webp",
    storyboardSheetUrl: "/images/projects/readhub-storyboard.webp",
  },
  {
    slug: "daloyaqua",
    title: "DaloyAqua",
    subtitle: "AgriTech System Architecture & Spec-Driven Fieldwork Research",
    roleContext: "Lead Software Architect • 3-Sibling Agritech Initiative (IT, Agri, Acct)",
    featured: false,
    status: "SDLC Phase 0: Research & System Specification",
    category: "Backend",
    description:
      "An agritech system architecture and research-first initiative designed for coconut smallholder farm families in Baleno, Masbate. Developed across SDLC Phase 0 with Spec-Driven Development (SDD) to replace arbitrary copra deductions and unmonitored costs with transparent farm logbooks and pooled co-op selling data models.",
    problem:
      "Smallholder copra and coconut farmers in rural Masbate lack verifiable cost accounting and face up to 18% arbitrary moisture deductions at middlemen buying stations, leaving them trapped in informal high-interest debt cycles without bargaining power.",
    constraints:
      "Zero cellular connectivity in interior farm tracts; manual entry must be assisted and error-tolerant for non-technical elders; specifications must be proven on our family farm homestead before writing mobile code.",
    architecture:
      "Spec-Driven Development (SDD) adhering to strict SDLC Phase 0 stage gates. System specifications (Spec 001 Logbook, Spec 002 Offline Mobile Ingestion, Spec 003 Copra Quality Formula) defining Pydantic schemas and fair moisture deduction data contracts.",
    highlights: [
      "Authored Spec-Driven Development (SDD) artifacts for Baleno, Masbate smallholders: Spec 001 (Family Farm Logbook v0.1), Spec 002 (Offline-First Mobile Ingestion), and Spec 003 (Copra Moisture & Deductions Formula).",
      "Synthesized 6 fieldwork research interview rounds (G1-G6) evaluating copra value chains, middleman deduction practices, and SAAD/ACPC government agrarian credit conduits.",
      "Designed transparent copra valuation engine and cooperative pooled selling data contracts, verified on our family homestead before writing client code.",
    ],
    storyboardBeats: [
      {
        beat: 1,
        timeRange: "00:00 – 00:05",
        shortLabel: "01 Problem",
        role: "Problem & Constraint",
        shot: "Wide 3/4 Field Shot (16:9)",
        action:
          "Under a dark storm-zinc (#09090b) sky with #0284c7 rain blobs, heavy rain batters rows of tomatoes; a close-up shows a tomato splitting (Rose #f43f5e alert) while a smallholder farmer checks a basic keypad phone with an Amber (#f59e0b) NO MOBILE DATA icon.",
        hudBadge: "PROBLEM: CROP CRACKING • NO FIELD INTERNET",
        stageIndex: null,
        semanticAccent: "rose",
      },
      {
        beat: 2,
        timeRange: "00:05 – 00:10",
        shortLabel: "02 Stage 01",
        role: "Stage 01: FastAPI & Pydantic",
        shot: "Low-Angle Sensor Close-Up",
        action:
          "A field telemetry stake in the wet soil streams moisture and rainfall droplets into a glowing #06b6d4 cyan FastAPI + Pydantic geometric shield gate; clean data orbs pass through while a jagged Rose (#f43f5e) negative-moisture glitch particle ricochets off the shield.",
        hudBadge: "STAGE 01 // FASTAPI + PYDANTIC SCHEMA GUARD",
        stageIndex: 0,
        semanticAccent: "cyan",
      },
      {
        beat: 3,
        timeRange: "00:10 – 00:15",
        shortLabel: "03 Stage 02",
        role: "Stage 02: Async APScheduler",
        shot: "Isometric Glassmorphic Cutaway",
        action:
          "Inside the #09090b backend chamber, the top FastAPI ingestion lane continues flowing smoothly without blocking, while on a separate lower track an APScheduler async clock wheel wakes up on a cron interval to batch-query recent field telemetry.",
        hudBadge: "STAGE 02 // NON-BLOCKING APSCHEDULER CRON",
        stageIndex: 1,
        semanticAccent: "sky",
      },
      {
        beat: 4,
        timeRange: "00:15 – 00:20",
        shortLabel: "04 Stage 03",
        role: "Stage 03: Agronomy Rule Engine",
        shot: "Macro Botanical-Matrix Cutaway",
        action:
          "A cel-shaded hologram of a fruiting tomato plant is evaluated against the rapid moisture-delta curve; the Agronomy Rule Engine calculates fruit-wall tension exceeding the threshold and triggers an Amber-to-Rose HIGH RISK: HALT IRRIGATION token.",
        hudBadge: "STAGE 03 // PHENOLOGY RISK MATRIX ENGINE",
        stageIndex: 2,
        semanticAccent: "amber",
      },
      {
        beat: 5,
        timeRange: "00:20 – 00:25",
        shortLabel: "05 Stage 04",
        role: "Stage 04: Rate-Limited SMS",
        shot: "Split Tower-to-Field Shot",
        action:
          "An outbound queue worker paces messages through a 20 SMS/sec rate-limiter gate into a cellular tower, beaming a crisp plain-text SMS ('Halt irrigation') across the rain to the farmer's basic keypad phone (Emerald #10b981 delivery confirmation).",
        hudBadge: "STAGE 04 // RATE-LIMITED CELLULAR SMS ALERT",
        stageIndex: 3,
        semanticAccent: "emerald",
      },
      {
        beat: 6,
        timeRange: "00:25 – 00:30",
        shortLabel: "06 Trade-Off",
        role: "Trade-Off & Impact",
        shot: "Medium Close-Up 3/4 Resolution",
        action:
          "The boxy-jawed farmer reads the SMS, shuts the field irrigation valve to save the harvest, and nods with grounded relief as #06b6d4 cyan and golden sunlight rim highlights trace their straw hat, looping cleanly back to Beat 1.",
        hudBadge: "TRADE-OFF // CELLULAR SMS BEATS 4G DEAD-ZONES",
        stageIndex: 3,
        semanticAccent: "amber",
      },
    ],

    architectureSteps: [
      {
        step: "01",
        title: "Telemetry Ingestion",
        subtitle: "Validated Sensor Payloads",
        description:
          "FastAPI endpoints receive sensor telemetry (soil moisture, temperature, rainfall delta) and validate schema bounds through Pydantic models.",
        technologies: ["FastAPI", "Pydantic", "Async Endpoints"],
        dataContract: {
          input:
            "JSON payload: { station_id, soil_moisture, ambient_temp, rainfall_mm }",
          processing: "FastAPI endpoint validates bounds with strict Pydantic model",
          output:
            "Validated TelemetryRecord schema ready for queue/database insertion",
        },
        specs: "Strict Pydantic schema boundary validation",
        tradeoff:
          "Pydantic guarantees malformed or out-of-range sensor readings (such as negative soil moisture) are rejected at the edge before hitting storage.",
      },
      {
        step: "02",
        title: "Async Scheduled Pipelines",
        subtitle: "Non-Blocking Background Cron",
        description:
          "APScheduler orchestrates periodic evaluation tasks independent of HTTP request threads, maintaining API responsiveness during scheduled runs.",
        technologies: ["APScheduler", "Python Asyncio"],
        dataContract: {
          input: "Periodic cron trigger (Asia/Manila schedule)",
          processing:
            "APScheduler invokes background evaluation job independent of request handlers",
          output:
            "Batch query for recent telemetry aggregates across active agricultural zones",
        },
        specs: "Non-blocking background scheduler lifecycle",
        tradeoff:
          "Running evaluation on a background scheduler keeps telemetry ingestion endpoints decoupled from periodic batch evaluation.",
      },
      {
        step: "03",
        title: "Agronomy Rule Engine",
        subtitle: "Phenological Risk Assessment",
        description:
          "Calculates critical risk deltas matching microclimate changes to specific crop biological stages (such as tomato fruit expansion vs. moisture swings).",
        technologies: ["Domain Risk Matrix", "Crop Analytics"],
        dataContract: {
          input:
            "Telemetry aggregates + CropPhenologyProfile(crop='tomato', stage='fruiting')",
          processing:
            "Evaluates moisture and rainfall swings against crop stage thresholds",
          output:
            "RiskAssessment(level=HIGH, risk='Fruit Cracking', recommendation='Halt irrigation')",
        },
        specs: "Deterministic domain rule evaluation matrix",
        tradeoff:
          "Domain rule engine separates crop biology thresholds from database schemas, allowing agronomists to tune rules cleanly.",
      },
      {
        step: "04",
        title: "Outbound SMS Delivery",
        subtitle: "Actionable Farmer Alerts",
        description:
          "Dispatches concise, actionable alerts directly to farmers via an SMS gateway, respecting provider rate limits without requiring internet apps.",
        technologies: ["SMS Gateway API", "Rate-Limited Queue"],
        dataContract: {
          input: "AlertMessage(farmerPhone, text, priority)",
          processing:
            "Outbound SMS service dispatches advisory messages via cellular gateway",
          output: "Cellular SMS advisory delivered to basic field handsets",
        },
        specs: "Rate-aware SMS dispatch for zero-4G rural fields",
        tradeoff:
          "Prioritized native cellular SMS over mobile push notifications because farming communities frequently lack active mobile data in the field.",
      },
    ],
    tags: [
      "Spec-Driven Development",
      "Python",
      "Pydantic",
      "Fieldwork Research",
      "Offline-First",
      "Data Contracts",
      "SDLC Phase 0",
    ],
    githubUrl: "https://github.com/zendrix-hub/daloyaqua",
    videoUrl: "/videos/daloyaqua.mp4?v=daloyaqua-clean-v4",
    posterUrl: "/images/projects/daloyaqua-poster.webp",
    storyboardSheetUrl: "/images/projects/daloyaqua-storyboard.webp",
  },
  {
    slug: "gordon-ramsai",
    title: "Gordon RamsAi",
    subtitle: "AI-Powered Fitness & Nutrition Chatbot",
    roleContext: "Core Developer (~80% of build) • 6-Member Team",
    featured: false,
    status: "Completed",
    category: "AI / Full-Stack",
    description:
      "A fitness and nutrition web application integrating domain-grounded generative AI and structured accountability coaching to deliver consistent dietary guidance without model hallucinations.",
    problem:
      "General-purpose LLM chatbots produce untethered, inconsistent dietary advice that fails to track nutritional context across sessions and often hallucinates inaccurate macro-nutrient values.",
    constraints:
      "Bounded API token budgets; mitigating generative hallucinations in health advice; maintaining responsive retrieval without external vector cloud subscriptions.",
    architecture:
      "Application-level AI integration built on Python and Streamlit, incorporating a Retrieval-Augmented Generation (RAG) pipeline using ChromaDB to ground responses in vetted nutritional databases.",
    highlights: [
      "Built a RAG pipeline utilizing ChromaDB embeddings, ensuring Google Gemini API responses remain strictly tethered to verified nutritional literature.",
      "Designed persistent user session state and tiered coaching personality engines with interactive Michelin-star style accountability ratings.",
      "Integrated Langfuse LLM observability to trace token utilization, monitor prompt latency, and debug prompt chains in production.",
    ],
    storyboardBeats: [
      {
        beat: 1,
        timeRange: "00:00 – 00:05",
        shortLabel: "01 Problem",
        role: "Problem & Constraint",
        shot: "Medium 3/4 Kitchen Shot (16:9)",
        action:
          "In a sleek twilight-zinc (#09090b / #18181b) kitchen lit by #06b6d4 and #0ea5e9 ambient blobs, an energetic home athlete in SamDoesArts' coral-red sweater and white collar tee raises a skeptical Pixar eyebrow at a generic AI chat bubble glitching in Rose (#f43f5e) static with hallucinated macros.",
        hudBadge: "PROBLEM: UNGROUNDED LLM DIET HALLUCINATIONS",
        stageIndex: null,
        semanticAccent: "rose",
      },
      {
        beat: 2,
        timeRange: "00:05 – 00:10",
        shortLabel: "02 Stage 01",
        role: "Stage 01: Streamlit Session",
        shot: "Close-Up Interaction Shot",
        action:
          "The athlete types a 600-kcal post-workout dinner prompt into the Gordon RamsAi Live Streamlit App. A glowing #06b6d4 cyan Streamlit Session State capsule locks in their calorie goal, dietary history, and chef accountability tier.",
        hudBadge: "STAGE 01 // STREAMLIT SESSION STATE CONTEXT",
        stageIndex: 0,
        semanticAccent: "cyan",
      },
      {
        beat: 3,
        timeRange: "00:10 – 00:15",
        shortLabel: "03 Stage 02",
        role: "Stage 02: Local ChromaDB RAG",
        shot: "Isometric Glassmorphic Cutaway",
        action:
          "Inside the #09090b local vector chamber, the query embedding dives as a #06b6d4 cyan laser into a crystalline shelf of ChromaDB USDA & exercise science volumes, pulling the Top-3 verified nutrition chunks (#10b981 emerald cards) with zero cloud vector database fees.",
        hudBadge: "STAGE 02 // LOCAL CHROMADB VECTOR SEARCH",
        stageIndex: 1,
        semanticAccent: "sky",
      },
      {
        beat: 4,
        timeRange: "00:15 – 00:20",
        shortLabel: "04 Stage 03",
        role: "Stage 03: Grounded Gemini",
        shot: "Hybrid AI Character Cutaway",
        action:
          "The 3 verified emerald cards lock into a radiant #06b6d4 cyan Google Gemini core alongside a stylized Ghibli-Pixar chef spirit in a crisp white apron who slices away Rose (#f43f5e) hallucination smoke with a cyan chef knife, synthesizing a grounded meal plan.",
        hudBadge: "STAGE 03 // GEMINI GROUNDED BY RAG CONTEXT",
        stageIndex: 2,
        semanticAccent: "emerald",
      },
      {
        beat: 5,
        timeRange: "00:20 – 00:25",
        shortLabel: "05 Stage 04",
        role: "Stage 04: Langfuse Tracing",
        shot: "Split UI & Telemetry Shot",
        action:
          "As the verified macro breakdown and Michelin-style accountability score render on the Streamlit screen, a parallel non-blocking Langfuse observability waterfall lights up in Emerald (#10b981), logging prompt token budget and step-level latency.",
        hudBadge: "STAGE 04 // LANGFUSE PROMPT & TOKEN TRACING",
        stageIndex: 3,
        semanticAccent: "emerald",
      },
      {
        beat: 6,
        timeRange: "00:25 – 00:30",
        shortLabel: "06 Trade-Off",
        role: "Trade-Off & Impact",
        shot: "Medium Close-Up 3/4 Resolution",
        action:
          "The athlete flashes a confident KeshArt smirk beside a real prepared meal bowl and the grounded dashboard, illuminated by #06b6d4 cyan and warm top-right spotlight rim light before looping seamlessly back to Beat 1.",
        hudBadge: "TRADE-OFF // ZERO HALLUCINATIONS • LOCAL RAG",
        stageIndex: 3,
        semanticAccent: "amber",
      },
    ],

    architectureSteps: [
      {
        step: "01",
        title: "Conversational Client & Session",
        subtitle: "Streamlit State Management",
        description:
          "Maintains multi-turn context, user fitness goals, caloric targets, and personality accountability modes across interactive chat sessions.",
        technologies: ["Streamlit", "Session State Management"],
        dataContract: {
          input:
            "User chat message: 'Give me a post-workout dinner under 600 calories'",
          processing:
            "Streamlit session state tracks conversation history, user calorie targets, and dietary constraints",
          output:
            "Aggregated conversation payload with contextual user preferences",
        },
        specs: "Client: Streamlit interactive session loop",
        tradeoff:
          "In-memory session state enables responsive multi-turn personality coaching without external session database overhead.",
      },
      {
        step: "02",
        title: "Local Vector Retrieval (RAG)",
        subtitle: "ChromaDB Semantic Search",
        description:
          "Queries a local ChromaDB collection using vector embeddings, pulling the most relevant verified dietary and workout guidance chunks.",
        technologies: ["ChromaDB", "Vector Embeddings", "RAG"],
        dataContract: {
          input: "Query embedding generated for user nutritional request",
          processing:
            "ChromaDB executes similarity search over chunked nutritional and exercise literature",
          output: "Top-K relevant verified literature chunks with source metadata",
        },
        specs: "ChromaDB: Embedded local vector store",
        tradeoff:
          "Local ChromaDB avoids external vector cloud subscriptions and keeps nutritional knowledge retrieval self-contained.",
      },
      {
        step: "03",
        title: "Domain-Grounded Generation",
        subtitle: "Google Gemini Model Pipeline",
        description:
          "Feeds retrieved nutritional context into Gemini prompts with structured system directives, mitigating hallucinated macro recommendations.",
        technologies: ["Google Gemini API", "Prompt Engineering"],
        dataContract: {
          input:
            "System prompt + Retrieved literature chunks + User dialogue history",
          processing:
            "Google Gemini API synthesizes advice bounded by retrieved nutritional facts in Ramsay persona",
          output:
            "Structured response with grounded macro breakdown and accountability rating",
        },
        specs: "Model: Google Gemini | Strict system prompt grounding",
        tradeoff:
          "RAG grounding keeps the model anchored to retrieved nutritional data rather than unverified base-model guesswork.",
      },
      {
        step: "04",
        title: "Telemetry & Observability",
        subtitle: "Langfuse Prompt Tracing",
        description:
          "Langfuse tracks model inference latency, token consumption, and prompt chains for observability and debugging.",
        technologies: ["Langfuse", "LLM Observability"],
        dataContract: {
          input:
            "Inference event metadata, prompt tokens, completion tokens, execution duration",
          processing: "Langfuse SDK records trace spans for each RAG turn",
          output: "Trace record with latency waterfall and token utilization breakdown",
        },
        specs: "Trace granularity: Step-level RAG & LLM observability",
        tradeoff:
          "Langfuse observability provides visibility into prompt token consumption and pipeline bottlenecks across iterations.",
      },
    ],
    tags: [
      "Python",
      "Google Gemini API",
      "Retrieval-Augmented Generation (RAG)",
      "ChromaDB",
      "Langfuse",
      "Streamlit",
    ],
    githubUrl: "https://github.com/zendrix-hub/Gordon-Ramsai",
    liveUrl: "https://gordon-ramsai.streamlit.app/",
    videoUrl: "/videos/gordon-ramsai.mp4?v=gordon-ramsai-actual-v4",
    posterUrl: "/images/projects/gordon-ramsai-poster.webp",
    storyboardSheetUrl: "/images/projects/gordon-ramsai-storyboard.webp",
  },
];
