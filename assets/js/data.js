/**
 * Debasish Nandy - Production Portfolio Dataset
 * Extracted accurately and completely from input/Deba_Resume_5yoe.pdf
 * Dynamic configuration loaded from config.json
 */

export const candidateData = {
  name: "Debasish Nandy",
  title: "Lead AI Engineer",
  currentCompany: "Neutrino IQ",
  previousCompany: "Celebal Technologies",
  email: "nandydeba2@gmail.com",
  location: "Bongaigaon, Assam, India (IST)",
  github: "https://github.com/JokaDPiero",
  linkedin: "https://linkedin.com/in/debasishnandy-3d0306n",
  portfolio: "https://jokadpiero.github.io/ai-engineering-portfolio/",
  motto: "ALWAYS REMEMBER YOUR ‘WHY,’ LEARN FROM EVERY FAILURE, AND KEEP PUSHING FORWARD—NO MATTER THE CIRCUMSTANCES.",
  noticePeriodDays: 60,
  noticePeriodText: "60 Days (Negotiable)",
  summary: [
    "Accomplished Data Scientist and Lead AI Engineer with 5+ years of experience developing and delivering robust data-driven & GenAI solutions across BFSI, Manufacturing & Supply Chain domains.",
    "Skilled in full-lifecycle data processing, model development, and high-concurrency cloud deployments on Azure and AWS (Bedrock Runtime, Boto3), with strong MLOps foundations in Linux, Docker, MLflow, uv, and Locust.",
    "Deep expertise in autonomous multi-agent systems (AutoGen, CrewAI), intelligent web extraction (Crawl4AI), prompt optimization (DSPy), and enterprise orchestration (LangChain, LangSmith, RAG, Text-to-SQL).",
    "Passionate about building scalable models for diverse industries, with an unwavering commitment to continuous growth, resilience, adaptability, and engineering excellence."
  ]
};

export const defaultQuantifiables = {
  yearsExperience: 5,
  yearsExperienceDisplay: "5+ YOE",
  concurrentUsers: 1000,
  concurrentUsersDisplay: "1,000+",
  pocsDelivered: 10,
  pocsDeliveredDisplay: "10+",
  studentsMentored: 150,
  studentsMentoredDisplay: "150+",
  certificationsCount: 4,
  certificationsCountDisplay: "4x",
  projectsDeliveredCount: 9,
  projectsDeliveredDisplay: "9 Projects",
  genaiAccuracy: "80%+",
  idppAccuracy: "90%",
  faqAccuracy: "90%",
  faqConcurrency: 1000,
  faqConcurrencyDisplay: "1,000 concurrent users",
  faqLatency: "5-8s",
  purchasersBrainConcurrency: 100,
  purchasersBrainConcurrencyDisplay: "100 concurrent users",
  purchasersBrainLatency: "15-30s",
  purchasersBrainDocs: "1,100+",
  purchasersBrainTables: "30+",
  drishtiLatency: "3-5s",
  spaiLatency: "15-30s",
  cgpa: "8.8",
  higherSecondaryPct: "89%",
  secondarySchoolPct: "94%"
};

export let activeQuantifiables = { ...defaultQuantifiables };

export const keyMetrics = [
  {
    id: "concurrent-users",
    value: "1,000+",
    numericTarget: 1000,
    suffix: "+",
    label: "Concurrent Users Scaled",
    subtext: "Production GenAI systems serving real-time inference"
  },
  {
    id: "yoe",
    value: "5+ YOE",
    numericTarget: 5,
    suffix: "+ YOE",
    label: "Production AI/ML Experience",
    subtext: "From research POCs to enterprise scale"
  },
  {
    id: "pocs",
    value: "10+",
    numericTarget: 10,
    suffix: "+",
    label: "Enterprise POCs Delivered",
    subtext: "100% fulfilled client success criteria"
  },
  {
    id: "mentees",
    value: "150+",
    numericTarget: 150,
    suffix: "+",
    label: "Engineers & Students Mentored",
    subtext: "Full-stack data science & Azure AI hackathons"
  },
  {
    id: "certs",
    value: "4x",
    numericTarget: 4,
    suffix: "x",
    label: "Industry Certifications",
    subtext: "Microsoft & Databricks certified specialist"
  }
];

export const projectsData = [
  {
    id: "niq-cfa",
    title: "NIQ - AI based CFA Platform",
    period: "Oct 2025 – Present",
    role: "Lead AI Engineer",
    domain: "Enterprise Platforms",
    challenge: "Chartered Financial Analysts require simultaneous, real-time intelligence over voluminous 10-K filings, financial disclosures, and recorded earnings calls with zero tolerance for hallucinations.",
    impact: "Architecting a multi-stream financial intelligence platform ingesting complex documents, live web sources, and audio streams, providing auditable citation-backed insights with high compliance standards.",
    approach: "Designed a multimodal pipeline combining Amazon Bedrock Runtime (Claude 3.5 Sonnet) via Boto3 with Amazon OpenSearch vector indexing. Structured declarative prompt modules with DSPy, coordinated multi-agent financial extraction with CrewAI, extracted web filings with Crawl4AI, tracked traces via LangSmith, and containerized microservices managed via uv and Docker with AWS KMS envelope encryption.",
    techStack: ["AWS Bedrock", "Bedrock Runtime", "Boto3", "CrewAI", "Crawl4AI", "DSPy", "LangChain", "LangSmith", "Amazon OpenSearch", "uv", "KMS", "EC2", "Docker"],
    metrics: ["Multi-stream Ingestion", "Sub-second Retrieval", "LangSmith Traced", "KMS Envelope Encryption"],
    featured: true,
    githubUrl: "https://github.com/JokaDPiero/financial-doc-audio-cfa-engine"
  },
  {
    id: "nbl-spai",
    title: "NBL-SPAI - SharePoint AI Chatbot using Azure AI Foundry",
    period: "Jun 2025 – Oct 2025",
    role: "Lead Data Scientist (GenAI)",
    domain: "GenAI & RAG",
    challenge: "Client required an enterprise-grade, real-time AI assistant capable of streaming multimodal responses over internal SharePoint knowledge bases (pages, lists, files) with minimal latency and strict ACLs.",
    impact: "Engineered a streaming AI chatbot delivering accurate, low-latency (15-30s) responses over domain-specific corporate data with zero data leakage.",
    approach: "Architected a custom RAG system leveraging Microsoft Graph API for direct SharePoint indexing. Built robust prompt workflows using LangChain, bypassing traditional REST bottlenecks, and integrated content moderation guardrails, RBAC, and JWT authentication.",
    techStack: ["Azure OpenAI", "Azure AI Foundry", "LangChain", "Microsoft Graph API", "Azure Search", "Cosmos DB", "Azure SQL", "Git", "DevOps"],
    metrics: ["15-30s Latency", "Zero Data Leakage", "Full SharePoint Graph Ingestion"],
    featured: true
  },
  {
    id: "drishti-anything",
    title: "Drishti.Anything - Enterprise AI Chatbot",
    period: "May 2024 – Apr 2025",
    role: "Lead Data Scientist (GenAI)",
    domain: "Enterprise Platforms",
    challenge: "Enterprise needed a unified, ultra-low latency streaming AI assistant operating across disparate business departments (IT, HR, Manufacturing) with multimodal capabilities.",
    impact: "Delivered a cutting-edge multimodal chatbot with streaming responses, real-time DALL·E 3 image generation, STT audio parsing, and ultra-low latency (3-5s).",
    approach: "Spearheaded end-to-end system design utilizing message brokers (Azure EventHubs) for ultra-low latency data transfer. Orchestrated prompt routing with DSPy and LangChain, implemented LLM-ready web crawlers with Crawl4AI, multi-agent task dispatch with AutoGen, content moderation guardrails, RBAC, and JWT security.",
    techStack: ["Azure OpenAI", "DALL·E 3", "AutoGen", "Crawl4AI", "DSPy", "LangChain", "Azure EventHub", "Azure Search", "Cosmos DB", "Redis", "Azure Computer Vision", "Form Recognizer"],
    metrics: ["3-5s Response Latency", "Multimodal STT + Image", "Cross-Department Routing"],
    featured: true
  },
  {
    id: "purchasers-brain",
    title: "Purchaser’s Brain Chatbot – Supply Chain Analytics",
    period: "Oct 2023 – May 2024",
    role: "Lead Data Scientist (GenAI)",
    domain: "Supply Chain",
    challenge: "Procurement teams needed to analyze vast, disparate structured data (30+ Azure Synapse SQL tables) and unstructured contracts (1,100+ documents) concurrently without manual SQL writing.",
    impact: "Engineered a hybrid GenAI chatbot combining Text-to-SQL and unstructured RAG, scaling to 100 concurrent users at 15-30s latency, significantly boosting procurement decision speed.",
    approach: "Engineered an intelligent query classification routing system. Routed relational queries to Text-to-SQL with schema validation, and unstructured queries to hybrid vector search, seamlessly synthesizing joint insights with LangChain and RBAC.",
    techStack: ["Azure OpenAI", "LangChain", "DSPy", "Text-to-SQL", "Azure App Service", "Azure Synapse SQL", "Cosmos DB", "Python", "Blob Storage"],
    metrics: ["1,100+ Docs + 30 Tables", "100 Concurrent Users", "Hybrid SQL + RAG Routing"],
    featured: true,
    githubUrl: "https://github.com/JokaDPiero/enterprise-rag-router"
  },
  {
    id: "faq-chatbot-bfsi",
    title: "High-Concurrency FAQ Chatbot – BFSI Sector",
    period: "Jun 2023 – Sep 2023",
    role: "Data Scientist (NLP & GenAI)",
    domain: "BFSI",
    challenge: "Financial services client faced severe customer support queues and inconsistent manual resolution across thousands of repetitive banking inquiries.",
    impact: "Built a high-accuracy (90%) RAG FAQ chatbot supporting up to 1,000 concurrent users with 5-8 second response latency, dramatically lowering contact center costs.",
    approach: "Preprocessed 4,000+ Q&A pairs; trained Sentence Transformer embeddings with cross-encoder rerankers; fine-tuned a GPU-accelerated BERT model for follow-up query classification; logged experiments and models with MLflow; packaged with uv; deployed on Red Hat VMs with Locust load testing.",
    techStack: ["Sentence Transformers", "Cross-Encoder", "PyTorch", "MLflow", "uv", "Locust", "Flask", "Docker", "Red Hat Linux"],
    metrics: ["1,000 Concurrent Users", "90% Resolution Accuracy", "5-8s Latency Under Load", "MLflow Tracked"],
    featured: true
  },
  {
    id: "customer-call-analytics",
    title: "Customer Call Analytics MVP (Post-Call Intelligence)",
    period: "Jan 2023 – May 2023",
    role: "Data Scientist (NLP & GenAI)",
    domain: "Speech & Audio",
    challenge: "Manual post-call analysis in telecom customer service was unscalable and posed high risk of sensitive data exposure (credit cards, PII).",
    impact: "Delivered an automated post-call intelligence MVP that performed real-time PII redaction, intent recognition, sentiment scoring, and emotional shift tracking from transcripts.",
    approach: "Curated domain Q&A datasets via Selenium. Fine-tuned custom BERT models for Presidio PII masking, emotion detection, and summarization. Integrated Azure OpenAI Whisper for audio transcription and built an FAQ RAG copilot.",
    techStack: ["Python", "BERT", "Presidio", "Azure OpenAI Whisper", "Selenium", "Docker", "Azure App Service"],
    metrics: ["Automated PII Redaction", "Whisper Speech-to-Text", "Multitask Emotion & Sentiment"],
    featured: false
  },
  {
    id: "idpp-bfsi",
    title: "Intelligent Document Processing Platform (IDPP)",
    period: "Jun 2022 – Dec 2022",
    role: "Associate Data Scientist (Vision & NLP)",
    domain: "BFSI",
    challenge: "Tedious, error-prone manual data extraction from complex bank statements featuring heterogeneous layouts across diverse financial institutions.",
    impact: "Engineered an end-to-end IDP platform that automated document classification, table parsing, and financial digitization with 90% accuracy, cutting manual effort by over 70%.",
    approach: "Trained a classification model to determine bank types. Utilized Azure Form Recognizer custom models for NER to extract financial ledger items, followed by deterministic post-processing into validated Excel formats.",
    techStack: ["Azure Form Recognizer", "Azure Custom Vision", "Python", "Docker", "Azure App Service", "Blob Storage"],
    metrics: ["90% Extraction Accuracy", "Automated Excel Ledger Export", "Multi-Bank Layout Parsing"],
    featured: false
  },
  {
    id: "ai-student-analyzer",
    title: "AI Student Analyzer – Zoom Meeting Analysis",
    period: "Feb 2022 – May 2022",
    role: "Junior Data Scientist (Speech & NLP)",
    domain: "Speech & Audio",
    challenge: "Educators struggled to evaluate engagement, speaking distribution, and sentiment during remote online lectures post-COVID-19.",
    impact: "Created an AI-driven meeting analysis tool providing teachers with actionable dashboards on student participation, pronunciation scores, and topic comprehension.",
    approach: "Integrated Azure Speech Services and OpenAI Whisper for transcription and speaker diarization. Implemented Azure Pronunciation Assessment alongside SpaCy and BERT for NER, topic modeling, word clouds, and PII masking.",
    techStack: ["Azure Speech Services", "OpenAI Whisper", "BERT", "SpaCy", "Presidio", "FFmpeg", "Python"],
    metrics: ["Speaker Diarization", "Pronunciation Scoring", "Automated Sentiment & NER"],
    featured: false
  },
  {
    id: "dreamai-videokyc",
    title: "DreamAI - VideoKYC Identity Verification",
    period: "Oct 2021 – Jan 2022",
    role: "Junior Associate Data Scientist (Vision & NLP)",
    domain: "Computer Vision & NLP",
    challenge: "Traditional in-person KYC verification was slow, costly, and bottlenecked customer onboarding.",
    impact: "Built an AI-driven VideoKYC system delivering automated, real-time identity verification and biometric validation, significantly streamlining compliance cycles.",
    approach: "Utilized Azure Computer Vision/Custom Vision for face detection and liveness; engineered Siamese Networks for biometric signature matching; integrated Azure Form Recognizer for OCR/NER cross-validation with government IDs.",
    techStack: ["Azure Computer Vision", "Siamese Networks", "Form Recognizer", "Python", "Linux", "Blob Storage"],
    metrics: ["Real-time Liveness Check", "Biometric Signature Match", "Automated ID Cross-Check"],
    featured: false
  }
];

export const experienceData = [
  {
    id: "neutrino-iq",
    role: "Lead AI Engineer",
    company: "Neutrino IQ",
    period: "Oct 2025 – Present",
    location: "Remote",
    highlights: [
      "Lead system architecture and end-to-end engineering of an AWS-based multimodal CFA intelligence platform.",
      "Orchestrate dual-stream document and audio ingestion pipelines utilizing AWS Bedrock Runtime, Boto3, DSPy, LangChain, LangSmith, Amazon OpenSearch, and KMS envelope encryption.",
      "Architect multi-agent financial extraction pipelines with CrewAI and Crawl4AI web extraction.",
      "Standardized project builds with uv and Docker for high-velocity CI/CD and reproducible deployments."
    ],
    skillsApplied: ["AWS Bedrock", "Bedrock Runtime", "Boto3", "CrewAI", "Crawl4AI", "DSPy", "LangChain", "LangSmith", "Amazon OpenSearch", "KMS", "uv", "Docker"],
    projectIds: ["niq-cfa"]
  },
  {
    id: "celebal-senior",
    role: "Associate then Senior Data Scientist",
    company: "Celebal Technologies",
    period: "May 2022 – Oct 2025",
    location: "Jaipur / Remote",
    highlights: [
      "Led diverse Data and AI engagements from inception to production delivery across BFSI, Supply Chain, and Enterprise domains.",
      "Coordinated with enterprise executive stakeholders to understand business requirements, authoring proposals and architectural blueprints.",
      "Built, deployed, and delivered 2+ enterprise Generative AI solutions with 80%+ accuracy, auto-scaling on Azure to handle 1,000 concurrent users.",
      "Delivered 10+ enterprise POCs, fulfilling 100% of defined success criteria on schedule.",
      "Integrated MLflow for centralized experiment tracking and model registries across GPU cluster nodes.",
      "Taught 100+ students and young engineers how to become full-stack data scientists using modern ML tools, algorithms, and MLOps practices."
    ],
    skillsApplied: ["Azure OpenAI", "RAG", "Text-to-SQL", "AutoGen", "DSPy", "LangChain", "FastAPI", "Docker", "Locust", "MLflow", "SentenceTransformers"],
    projectIds: ["nbl-spai", "drishti-anything", "purchasers-brain", "faq-chatbot-bfsi", "idpp-bfsi"]
  },
  {
    id: "celebal-junior",
    role: "Junior Associate Data Scientist",
    company: "Celebal Technologies",
    period: "Oct 2021 – Apr 2022",
    location: "Jaipur / Remote",
    highlights: [
      "Enhanced Python coding and algorithmic problem-solving by practicing coding challenges and building production-grade utilities.",
      "Implemented classical ML algorithms alongside rigorous EDA, feature engineering, hyperparameter tuning, and drift monitoring.",
      "Trained deep learning architectures (ResNet, YOLO, R-CNN) with Detectron2 for object detection and visual classification in client projects.",
      "Mastered the complete machine learning lifecycle (MLOps), earning industry certifications to validate production expertise.",
      "Actively led weekly technical discussions and architectural presentations on AI innovations."
    ],
    skillsApplied: ["Python", "PyTorch", "Detectron2", "OpenCV", "ResNet", "YOLO", "Linux", "Azure AI Services"],
    projectIds: ["ai-student-analyzer", "dreamai-videokyc"]
  }
];

export const educationData = [
  {
    degree: "B.Tech Honors in Information Technology",
    institution: "Kalinga Institute of Industrial Technology (KIIT)",
    period: "06/2018 – 08/2022",
    location: "Patia, Bhubaneswar, Odisha, India",
    score: "8.8 CGPA",
    scoreType: "CGPA",
    notes: "Honors degree focusing on Machine Learning, Distributed Systems, Algorithms, and Software Engineering."
  },
  {
    degree: "Higher Secondary (XI – XII)",
    institution: "Assam Higher Secondary Education Council (AHSEC)",
    period: "06/2016 – 05/2018",
    location: "Dibrugarh, Assam, India",
    score: "89%",
    scoreType: "Percentage",
    notes: "Majors in Physics, Chemistry, and Mathematics."
  },
  {
    degree: "Secondary School (Nursery – X)",
    institution: "Secondary Education Board of Assam (SEBA)",
    period: "01/2005 – 05/2016",
    location: "Dibrugarh, Assam, India",
    score: "94%",
    scoreType: "Percentage",
    notes: "Graduated with distinction and academic excellence honors."
  }
];

export const skillCategories = [
  {
    category: "Libraries Commonly Used",
    description: "Core algorithmic, deep learning, NLP, multi-agent frameworks, and LLM tools",
    skills: [
      "Python", "AutoGen", "CrewAI", "Crawl4AI", "DSPy", "LangChain", 
      "LangSmith", "PyTorch", "TensorFlow", "FastAPI", "Flask", 
      "Pandas", "NumPy", "Scikit-Learn", "OpenCV", "Detectron2", 
      "Sentence Transformers", "MLflow", "Locust", "uv", 
      "Poetry", "SQLite", "Librosa", "Pillow", "Gradio", "Matplotlib/Seaborn"
    ]
  },
  {
    category: "Cloud (Azure & AWS)",
    description: "Enterprise cloud AI architectures, foundation model serving, vector search, and compute",
    skills: [
      "AWS Bedrock", "Bedrock Runtime", "Boto3", "Amazon OpenSearch", "AWS EC2", "AWS KMS", 
      "Secrets Manager", "AWS RDS", "Azure OpenAI", "Azure AI Foundry", "Azure AI Search", 
      "Document Intelligence (Form Recognizer)", "Azure DevOps", "Azure App Service", 
      "Virtual Machines", "Container Registry (ACR)", "Azure Cognitive Services", 
      "Azure Functions", "Logic Apps", "Azure SQL", "Cosmos DB", "Blob Storage", "Azure EventHubs"
    ]
  },
  {
    category: "Developer Tools & MLOps",
    description: "Package management, containerization, version control, testing, and observability",
    skills: [
      "Git", "Docker", "uv", "Linux (Ubuntu / Red Hat)", "VS Code", 
      "Postman", "Jupyter", "Databricks Lakehouse", "Anaconda", 
      "Redis", "FFmpeg", "Presidio PII Redaction", "Microsoft Office"
    ]
  },
  {
    category: "Soft Skills & Leadership",
    description: "Stakeholder consulting, project delivery, and engineering leadership",
    skills: [
      "Problem-Solving", "Time Management", "Technical Documentation", 
      "Client Consulting", "Engineering Leadership", "On-site Coordination", 
      "Mentorship", "Cross-Functional Collaboration"
    ]
  }
];

export const certificationsData = [
  {
    id: "dp-100",
    title: "Microsoft Certified: Azure Data Scientist Associate",
    issuer: "Microsoft",
    code: "DP-100",
    badgeClass: "badge-microsoft",
    description: "Expertise in designing and implementing data science and machine learning solutions using Azure Machine Learning and Databricks."
  },
  {
    id: "databricks-ml",
    title: "Databricks Certified: Machine Learning Professional",
    issuer: "Databricks",
    code: "ML-PRO",
    badgeClass: "badge-databricks",
    description: "Production machine learning mastery across Lakehouse, feature store, MLflow tracking, distributed training, and automated model serving."
  },
  {
    id: "ai-102",
    title: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    code: "AI-102",
    badgeClass: "badge-microsoft",
    description: "Building, managing, and deploying AI solutions that leverage Azure Cognitive Services, Cognitive Search, and Azure OpenAI."
  },
  {
    id: "az-900",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
    badgeClass: "badge-microsoft",
    description: "Foundational mastery of cloud computing concepts, Azure security, compliance, identity, and governance."
  }
];

export const achievementsData = [
  {
    id: "tech-bairn-2024",
    year: "2024",
    title: "Tech Bairn Data Science Mentor",
    organization: "Tech Bairn",
    description: "Mentored a cohort of aspiring data scientists, training them in full-stack data science, machine learning algorithms, model optimization, and production deployment.",
    impactTag: "Mentorship & Education"
  },
  {
    id: "coe-mentor-2023",
    year: "2023",
    title: "COE Internship Programme Mentor",
    organization: "Celebal Technologies",
    description: "Trained 50+ students in advanced data science, hands-on ML tools, and model engineering workflows, preparing them for production-grade engineering roles.",
    impactTag: "50+ Students Trained"
  },
  {
    id: "hackathon-2023",
    year: "2023",
    title: "Client Hackathon Organizer & Tech Support",
    organization: "Celebal Technologies",
    description: "Organized and provided core architectural technical support for client hackathons focusing on OpenAI and Azure AI services, guiding teams to build functional enterprise prototypes.",
    impactTag: "Enterprise GenAI Hackathon"
  },
  {
    id: "cle-mentor-2022",
    year: "2022",
    title: "CLE Internship Programme Mentor",
    organization: "Celebal Technologies",
    description: "Led a group of students in learning core data science algorithms, data structures, and practical modeling, equipping them with essential industry skills.",
    impactTag: "Foundation Mentorship"
  }
];

export const strengthsData = [
  {
    name: "Empathy",
    description: "I connect closely with my team's challenges and do my utmost to help solve them collaboratively.",
    iconName: "heart"
  },
  {
    name: "Work Management",
    description: "I manage work by staying disciplined, prioritizing high-leverage milestones, and thinking positively every single day.",
    iconName: "calendar"
  },
  {
    name: "Proficient in AI/ML Lifecycle",
    description: "I effectively manage and deliver quality end-to-end solutions to improve automated business decision-making.",
    iconName: "layers"
  },
  {
    name: "Team Player",
    description: "I work seamlessly with diverse teams across different projects and encourage everyone to deliver their very best.",
    iconName: "users"
  },
  {
    name: "Problem-Solving",
    description: "Skilled at diagnosing and resolving complex bottlenecks across machine learning, GenAI, and distributed pipelines.",
    iconName: "zap"
  }
];

export const languagesData = [
  { language: "English", proficiency: "Proficient", percentage: 95 },
  { language: "Assamese", proficiency: "Native", percentage: 100 },
  { language: "Bengali", proficiency: "Intermediate", percentage: 75 },
  { language: "Hindi", proficiency: "Intermediate", percentage: 80 }
];

export const interestsData = [
  {
    title: "Sports & Athletics",
    description: "Avid footballer. Also enjoy cricket, volleyball, table tennis (TT), and PC gaming.",
    icon: "⚽"
  },
  {
    title: "Interacting & Continuous Learning",
    description: "Passionate about discovering new AI paradigms, paper reading, and engaging with technical communities.",
    icon: "📚"
  },
  {
    title: "Exploration & Star Gazing",
    description: "Love exploring new places, cultures, and star gazing to reflect on the vast universe and our purpose.",
    icon: "✨"
  }
];

export async function loadPortfolioConfig() {
  try {
    const res = await fetch('config.json');
    if (!res.ok) return null;
    const cfg = await res.json();

    if (cfg.quantifiables) {
      activeQuantifiables = { ...defaultQuantifiables, ...cfg.quantifiables };
    }

    if (cfg.kpiMetrics && Array.isArray(cfg.kpiMetrics)) {
      cfg.kpiMetrics.forEach(m => {
        const found = keyMetrics.find(km => km.id === m.id || km.label === m.label);
        if (found) {
          found.value = m.value;
          found.numericTarget = m.numericTarget;
          found.suffix = m.suffix || found.suffix;
          found.label = m.label || found.label;
          found.subtext = m.subtext || found.subtext;
        }
      });
    }

    if (cfg.candidate) {
      Object.assign(candidateData, cfg.candidate);
    }

    if (cfg.skills) {
      if (cfg.skills.librariesAndFrameworks) {
        skillCategories[0].skills = cfg.skills.librariesAndFrameworks;
      }
      if (cfg.skills.cloudAndInfrastructure) {
        skillCategories[1].skills = cfg.skills.cloudAndInfrastructure;
      }
      if (cfg.skills.developerToolsAndMLOps) {
        skillCategories[2].skills = cfg.skills.developerToolsAndMLOps;
      }
      if (cfg.skills.softSkillsAndLeadership) {
        skillCategories[3].skills = cfg.skills.softSkillsAndLeadership;
      }
    }

    return cfg;
  } catch (err) {
    console.info('Config loaded with built-in defaults (fetch omitted or file:// protocol).');
    return null;
  }
}
