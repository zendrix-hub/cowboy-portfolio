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

export interface Project {
  title: string;
  subtitle?: string;
  roleContext?: string;
  description: string;
  problem: string;
  constraints: string;
  architecture: string;
  highlights: string[];
  architectureSteps: ArchitectureStep[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
  status?: string;
  category?: "Mobile" | "Web" | "Backend" | "AI / Full-Stack";
}

export const projects: Project[] = [
  {
    title: "PlayIT",
    subtitle: "Mobile Phonics & Reading Literacy System (BasaTrack)",
    roleContext: "Project Manager & Core Android Developer • Capstone Team",
    featured: true,
    status: "Flagship Engineering Thesis",
    category: "Mobile",
    description:
      "A native Android phonics literacy platform engineered for Filipino Grade 1 learners using the Marungko Approach. Designed for zero-connectivity environments, running on-device speech evaluation and isolated multi-learner profiles completely offline.",
    problem:
      "Early grade reading literacy in resource-constrained Philippine public schools requires focused phonetic intervention, but classrooms frequently suffer from unreliable internet and high teacher-to-student ratios (40+ pupils per class).",
    constraints:
      "100% offline operation post-install with zero cloud dependencies; must run smoothly on bounded, budget Android hardware with strict audio latency limits.",
    architecture:
      "Clean Architecture with strict MVVM separation. Decoupled audio recording, Vosk acoustic phoneme evaluation, and UI presentation through Kotlin Coroutines and StateFlow.",
    highlights: [
      "Authored the v3.0 Software Requirements Specification (SRS) and Requirements Traceability Matrix (RTM) defining verification criteria before coding.",
      "Integrated Vosk edge acoustic models for real-time, on-device phoneme speech recognition without remote API latency or data costs.",
      "Engineered Room SQLite schema supporting up to 6 distinct learner profiles per tablet, complete with automated on-device PDF progress report generation via iText7.",
    ],
    architectureSteps: [
      {
        step: "01",
        title: "On-Device Audio Capture",
        subtitle: "16kHz Mono Stream",
        description:
          "AudioRecord captures learner speech input directly into an in-memory ring buffer with strict sample-rate validation, ensuring zero cloud transit latency.",
        technologies: ["Android AudioRecord", "Kotlin Coroutines"],
        dataContract: {
          input: "Microphone analog PCM input @ 16kHz, 16-bit Mono",
          processing: "Android AudioRecord streaming into in-memory non-blocking ring buffer (4096 samples)",
          output: "ByteArray audio stream without temporary disk allocations",
        },
        specs: "Latency: < 40ms | Buffer size: ~8KB | Zero network I/O",
        tradeoff:
          "In-memory ring buffer avoids flash storage wear on low-cost tablets and eliminates garbage collection pauses during speech evaluation.",
      },
      {
        step: "02",
        title: "Edge Speech Recognition (ASR)",
        subtitle: "Vosk Embedded Kaldi Model",
        description:
          "Embedded offline Vosk acoustic models process audio frames locally, computing phoneme hypothesis strings and confidence scores without network access.",
        technologies: ["Vosk ASR Engine", "Offline Acoustic Model"],
        dataContract: {
          input: "16kHz 16-bit PCM audio chunks from buffer",
          processing: "Kaldi acoustic model decoding + phonetic alignment against Filipino Marungko syllable grammar",
          output: "{ text: 'ba', conf: 0.94, phonemes: ['b', 'a'] }",
        },
        specs: "Model size: ~42MB packaged in APK | Execution time: ~110ms per phoneme",
        tradeoff:
          "Packaged offline Kaldi model runs 100% on-device. Cloud speech APIs (Google/AWS) were rejected due to school connectivity dead-zones and per-request recurring costs.",
      },
      {
        step: "03",
        title: "Domain Scorer & StateFlow",
        subtitle: "Marungko Approach Evaluation",
        description:
          "Domain UseCases compare phoneme sequences against target Filipino syllable drills, emitting immutable UI state through Kotlin StateFlow via MVVM.",
        technologies: ["MVVM", "Clean Architecture", "StateFlow"],
        dataContract: {
          input: "Hypothesis string & phoneme confidence scores from Vosk",
          processing: "Domain UseCase computes distance against target Marungko syllable matrix with threshold gates",
          output: "EvaluationResult.Success(accuracy = 92%, isCorrect = true)",
        },
        specs: "State dispatch: Instant via StateFlow | UI recomposition: Isolated to lesson card",
        tradeoff:
          "Strict Clean Architecture decouples evaluation rules from Compose UI, enabling unit testing of syllable scoring without Android instrumentation.",
      },
      {
        step: "04",
        title: "Local Persistence & Telemetry",
        subtitle: "Multi-Child Isolation & PDF",
        description:
          "Room SQLite database securely isolates progress for up to 6 learner profiles per device, triggering automated on-device iText7 PDF report compilation.",
        technologies: ["Room (SQLite)", "iText7 PDF Engine"],
        dataContract: {
          input: "LearnerProfileSession(childId = 3, score = 100, attempts = 2)",
          processing: "Room SQLite transactional insert + iText7 PDF binary layout rendering",
          output: "ACID SQLite database state + on-device printable BasaTrack PDF progress report",
        },
        specs: "Schema: Up to 6 isolated profiles per tablet | PDF generation: ~350ms on device",
        tradeoff:
          "On-device PDF compilation using iText7 allows teachers to print or transfer progress reports via USB/Bluetooth without requiring an administrative web server.",
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
    githubUrl: "https://github.com/zendrix-hub/playIT-v2",
  },
  {
    title: "ReadHub",
    subtitle: "Full-Stack Library Management System",
    roleContext: "Backend Developer • 4-Member Team",
    featured: false,
    status: "Completed",
    category: "Web",
    description:
      "A full-stack library management system for campus communities to manage book catalogs, track borrow/return lifecycles, and deliver operational dashboard analytics through a secure, containerized architecture.",
    problem:
      "Academic communities frequently rely on fragile, manual spreadsheet workflows to track shared technical textbooks and lab reserve items, resulting in lost inventory and unmonitored overdue materials.",
    constraints:
      "Multi-role authorization (Student vs. Administrator) requiring stateless security, dependable token invalidation, and reproducible multi-service container deployment across environments.",
    architecture:
      "Multi-tier architecture in Java 17 and Spring Boot 3 implementing the Controller-Service-Repository pattern, containerized alongside MySQL and Nginx via Docker Compose.",
    highlights: [
      "Architected stateless REST APIs with Spring Security and JWT validation, enforcing fine-grained role-based access control across endpoints.",
      "Engineered borrow lifecycle finite-state transitions (Available → Requested → Borrowed → Overdue → Returned) with automated overdue scheduling via ShedLock.",
      "Containerized backend, web proxy (Nginx), and database services with Docker Compose for consistent local development and staging parity.",
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
          processing: "Nginx routes static / to React build, proxies /api/* to Spring Boot container",
          output: "Reverse-proxied HTTP stream with Gzip compression and security headers",
        },
        specs: "Docker Compose network | Reverse proxy latency: < 2ms",
        tradeoff:
          "Separating static asset delivery from Spring Boot application server protects Java JVM threads from serving static image/HTML I/O.",
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
          processing: "OncePerRequestFilter verifies HMAC-SHA256 signature, extracts claims, loads UserDetails",
          output: "SecurityContextHolder populated with AuthenticatedUser(role=ROLE_STUDENT)",
        },
        specs: "Token expiry: 24h access | Stateless session policy (SessionCreationPolicy.STATELESS)",
        tradeoff:
          "Stateless JWT tokens eliminate distributed session storage (Redis/sticky sessions), enabling trivial horizontal scaling.",
      },
      {
        step: "03",
        title: "Service Layer & State Lifecycle",
        subtitle: "Controller-Service-Repository",
        description:
          "Business logic manages transactional book availability and borrow state lifecycles, orchestrating overdue tracking with ShedLock cron locks.",
        technologies: ["Spring Boot 3", "ShedLock Cron", "REST APIs"],
        dataContract: {
          input: "BorrowRequestDTO(bookId = 42, userId = 105)",
          processing: "Spring Service validates availability in @Transactional boundary, advances state (Available -> Borrowed)",
          output: "BorrowRecord entity with calculated dueDate (T + 7 days)",
        },
        specs: "ShedLock cron: Hourly audit with distributed lock preventing duplicate overdue notifications",
        tradeoff:
          "ShedLock ensures scheduled overdue background tasks run exactly once even when running multiple replica instances.",
      },
      {
        step: "04",
        title: "Persistence & Media CDN",
        subtitle: "ACID Relational Storage",
        description:
          "Spring Data JPA maps entities to MySQL container for transactional integrity, while book cover assets are offloaded to Cloudinary CDN.",
        technologies: ["MySQL", "Spring Data JPA", "Cloudinary"],
        dataContract: {
          input: "Entity state changes / multipart book cover uploads",
          processing: "Hibernate maps entities to MySQL container; Cloudinary SDK streams image buffers",
          output: "ACID transactional commit in MySQL + public Cloudinary secure CDN URL",
        },
        specs: "Connection pooling: HikariCP | Image delivery: Cloudinary WebP optimization",
        tradeoff:
          "Offloading binary cover images to Cloudinary prevents database bloat and saves server container disk bandwidth.",
      },
    ],
    tags: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security (JWT)",
      "REST APIs",
      "Docker Compose",
      "Nginx",
      "MySQL",
      "React",
      "Cloudinary",
    ],
    githubUrl: "https://github.com/zendrix-hub/ReadHub-IT342-G01-Group8",
    liveUrl: "https://readhub-three.vercel.app/login",
  },
  {
    title: "DaloyAqua",
    subtitle: "Agro-Meteorological Advisory Backend",
    roleContext: "Backend Developer • Collaborative Project",
    featured: true,
    status: "In Progress",
    category: "Backend",
    description:
      "An agro-meteorological advisory and decision-support backend that continuously processes microclimate weather telemetry against crop biological stages to deliver actionable automated risk alerts.",
    problem:
      "Smallholder farmers suffer severe crop loss (such as tomato fruit cracking) from abrupt microclimate swings in rainfall and soil moisture, yet enterprise agronomy platforms are too costly, slow, and overly complex for timely field decisions.",
    constraints:
      "Telemetry ingestion must remain non-blocking; background crop-stage evaluation algorithms must run asynchronously; outbound SMS alerts must comply with provider throughput limits.",
    architecture:
      "Asynchronous Python/FastAPI backend utilizing APScheduler for non-blocking periodic cron jobs, Pydantic for rigid weather payload validation, and decoupled outbound messaging workers.",
    highlights: [
      "Implemented domain evaluation rules translating environmental thresholds (soil moisture variance, temperature curves, precipitation deltas) into actionable crop risk scores.",
      "Engineered asynchronous scheduled pipelines with APScheduler, maintaining decoupled API ingestion routes and persistent telemetry storage.",
      "Designed for practical operational field realities—prioritizing reliable SMS delivery over fragile real-time web sockets for low-bandwidth farming areas.",
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
          input: "JSON payload: { station_id, soil_moisture, ambient_temp, rainfall_mm }",
          processing: "FastAPI endpoint validates bounds with strict Pydantic model",
          output: "Validated TelemetryRecord schema ready for queue/database insertion",
        },
        specs: "Ingestion throughput: > 500 req/s | Validation latency: < 5ms",
        tradeoff:
          "Pydantic guarantees malicious or out-of-range sensor readings (e.g. negative soil moisture) are rejected at the edge before hitting storage.",
      },
      {
        step: "02",
        title: "Async Scheduled Pipelines",
        subtitle: "Non-Blocking Background Cron",
        description:
          "APScheduler orchestrates periodic evaluation tasks independent of HTTP request threads, maintaining high API availability under sensor bursts.",
        technologies: ["APScheduler", "Python Asyncio"],
        dataContract: {
          input: "Periodic timer trigger (cron intervals)",
          processing: "APScheduler invokes async evaluator coroutine on asyncio event loop",
          output: "Batch query for recent telemetry aggregates across active agricultural zones",
        },
        specs: "Non-blocking asyncio loop | Zero HTTP request thread starvation",
        tradeoff:
          "Running evaluation on background scheduler keeps telemetry ingestion endpoints fast and responsive even during heavy database calculations.",
      },
      {
        step: "03",
        title: "Agronomy Rule Engine",
        subtitle: "Phenological Risk Assessment",
        description:
          "Calculates critical risk deltas matching microclimate changes to specific crop biological stages (e.g. tomato fruit expansion vs. moisture swings).",
        technologies: ["Domain Risk Matrix", "Crop Analytics"],
        dataContract: {
          input: "Telemetry aggregates + CropPhenologyProfile(crop='tomato', stage='fruiting')",
          processing: "Calculates rate of moisture change vs. fruit wall tensile threshold",
          output: "RiskAssessment(level=HIGH, risk='Fruit Cracking', recommendation='Halt irrigation')",
        },
        specs: "Evaluation latency: ~15ms per parcel",
        tradeoff:
          "Domain rule engine separates mathematical crop biology models from database schemas, allowing agronomists to update thresholds without schema migrations.",
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
          processing: "Rate-limited queue worker batches outbound requests to telco SMS Gateway API",
          output: "Telco SMS dispatch confirmation with delivery receipt tracking",
        },
        specs: "Rate limit: 20 SMS/sec provider compliance | Fallback: Retry with exponential backoff",
        tradeoff:
          "Prioritized native cellular SMS over mobile push notifications because farming communities frequently lack active mobile data or 4G connectivity in the field.",
      },
    ],
    tags: [
      "Python",
      "FastAPI",
      "APScheduler",
      "Async Architecture",
      "Pydantic",
      "Telemetry Pipelines",
      "SMS Gateway",
    ],
    githubUrl: "https://github.com/zendrix-hub/daloyaqua",
  },
  {
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
      "Bounded API token budgets; mitigating generative hallucinations in health advice; maintaining low query latency without heavy distributed vector database overhead.",
    architecture:
      "Application-level AI integration built on Python and Streamlit, incorporating a Retrieval-Augmented Generation (RAG) pipeline using ChromaDB to ground responses in vetted nutritional databases.",
    highlights: [
      "Built a RAG pipeline utilizing ChromaDB embeddings, ensuring Google Gemini API responses remain strictly tethered to verified nutritional literature.",
      "Designed persistent user session state and tiered coaching personality engines with interactive Michelin-star style accountability ratings.",
      "Integrated Langfuse LLM observability to trace token utilization, monitor prompt latency, and debug prompt chains in production.",
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
          input: "User chat message: 'Give me a post-workout dinner under 600 calories'",
          processing: "Streamlit session state tracks conversation history, user calorie targets, and dietary constraints",
          output: "Aggregated conversation payload with contextual user preferences",
        },
        specs: "Client: Streamlit interactive loop | State lifetime: Browser session",
        tradeoff:
          "In-memory session state enables rapid prototyping of interactive personality coaching without database overhead.",
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
          processing: "ChromaDB executes cosine similarity search over chunked USDA and exercise science literature",
          output: "Top-3 relevant verified literature chunks with source metadata",
        },
        specs: "ChromaDB: Embedded local vector store | Retrieval time: < 85ms",
        tradeoff:
          "Local ChromaDB avoids expensive vector cloud subscriptions (Pinecone) and ensures zero data egress for sensitive personal dietary queries.",
      },
      {
        step: "03",
        title: "Domain-Grounded Generation",
        subtitle: "Google Gemini Model Pipeline",
        description:
          "Feeds retrieved nutritional context into Gemini prompts with structured system directives, eliminating hallucinated macro recommendations.",
        technologies: ["Google Gemini API", "Prompt Engineering"],
        dataContract: {
          input: "System prompt + Retrieved literature chunks + User dialogue history",
          processing: "Google Gemini API synthesizes advice strictly bounded by retrieved nutritional facts in Ramsay persona",
          output: "Structured response with exact verified macro breakdown and accountability score",
        },
        specs: "Model: Google Gemini | Hallucination mitigation: Strict system prompt grounding",
        tradeoff:
          "RAG grounding prevents the LLM from inventing fictional calorie numbers or unsafe crash diet recommendations.",
      },
      {
        step: "04",
        title: "Telemetry & Observability",
        subtitle: "Langfuse Prompt Tracing",
        description:
          "Langfuse tracks model inference latency, token consumption, and response quality metrics for continuous prompt chain optimization.",
        technologies: ["Langfuse", "LLM Observability"],
        dataContract: {
          input: "Inference event metadata, prompt tokens, completion tokens, execution duration",
          processing: "Langfuse SDK captures trace spans asynchronously",
          output: "Trace record with latency waterfall and token cost breakdown",
        },
        specs: "Telemetry overhead: Non-blocking background flush | Trace granularity: Step-level",
        tradeoff:
          "Langfuse observability provides continuous monitoring of prompt token consumption and latency bottlenecks across model versions.",
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
  },
];
