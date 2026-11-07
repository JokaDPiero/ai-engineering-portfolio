/**
 * TypeScript Data Models & Type Definitions
 * Debasish Nandy - AI Engineering Dynamic Portfolio
 */

export interface CandidateProfile {
  name: string;
  title: string;
  currentCompany: string;
  previousCompany?: string;
  phone?: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  motto: string;
  noticePeriodDays?: number;
  noticePeriodText?: string;
}

export interface ContactInfo extends CandidateProfile {
  summary: string[];
}

export interface Metric {
  id?: string;
  value: string;
  numericTarget: number;
  suffix?: string;
  label: string;
  subtext: string;
}

export interface QuantifiablesConfig {
  yearsExperience: number;
  yearsExperienceDisplay: string;
  concurrentUsers: number;
  concurrentUsersDisplay: string;
  pocsDelivered: number;
  pocsDeliveredDisplay: string;
  studentsMentored: number;
  studentsMentoredDisplay: string;
  certificationsCount: number;
  certificationsCountDisplay: string;
  projectsDeliveredCount: number;
  projectsDeliveredDisplay: string;
  genaiAccuracy: string;
  idppAccuracy: string;
  faqAccuracy: string;
  faqConcurrency: number;
  faqConcurrencyDisplay: string;
  faqLatency: string;
  purchasersBrainConcurrency: number;
  purchasersBrainConcurrencyDisplay: string;
  purchasersBrainLatency: string;
  purchasersBrainDocs: string;
  purchasersBrainTables: string;
  drishtiLatency: string;
  spaiLatency: string;
  cgpa: string;
  higherSecondaryPct: string;
  secondarySchoolPct: string;
}

export interface SkillsConfig {
  librariesAndFrameworks: string[];
  cloudAndInfrastructure: string[];
  developerToolsAndMLOps: string[];
  softSkillsAndLeadership: string[];
}

export interface PortfolioConfig {
  version: string;
  lastUpdated: string;
  candidate: CandidateProfile;
  quantifiables: QuantifiablesConfig;
  kpiMetrics: Metric[];
  skills: SkillsConfig;
}

export type ProjectDomain = 
  | 'GenAI & RAG' 
  | 'Computer Vision & NLP' 
  | 'BFSI' 
  | 'Supply Chain' 
  | 'Speech & Audio' 
  | 'Enterprise Platforms';

export interface Project {
  id: string;
  title: string;
  period: string;
  role: string;
  domain: ProjectDomain;
  challenge: string;
  impact: string;
  approach: string;
  techStack: string[];
  metrics: string[];
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  skillsApplied: string[];
  projectIds?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  notes?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: 'Microsoft' | 'Databricks';
  code: string;
  badgeClass: string;
  description: string;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  impactTag: string;
}

export interface Strength {
  name: string;
  description: string;
  iconName: string;
}

export interface LanguageSkill {
  language: string;
  proficiency: 'Native' | 'Proficient' | 'Intermediate';
  percentage: number;
}

export interface Interest {
  title: string;
  description: string;
  icon: string;
}
