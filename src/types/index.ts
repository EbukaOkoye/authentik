export type VerificationStatus =
  | "VERIFIED"
  | "NOT VERIFIED"
  | "EXPIRED"
  | "RECALLED";

export type ScanPhase = "idle" | "scanning" | "verifying" | "result";

export type ReportState = "idle" | "sending" | "sent";

export type PhoneTab = "scan" | "history";

export type StatusBarTone = "light" | "dark";

export type RegisterState = "idle" | "generating" | "done";

export type UploadState = "idle" | "validating" | "published";

export type BatchState = "active" | "recalling" | "recalled";

export interface NavDropdownItem {
  name: string;
  href: string;
  description: string;
}

export interface NavItem {
  name: string;
  href: string;
  items?: NavDropdownItem[];
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  imageAlt: string;
}

export interface VerificationStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ScanResultItem {
  status: VerificationStatus;
  description: string;
  sampleCode: string;
}

export interface SampleCodeRecord {
  code: string;
  status: VerificationStatus;
  productName: string;
  manufacturer: string;
  batchNumber: string;
  nafdacNumber: string;
  expiryDate: string;
  note: string;
}

export interface ManufacturerStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface PrivacyPillar {
  id: "camera" | "location" | "serials" | "copies";
  title: string;
  description: string;
}

export interface ConsoleBatch {
  id: string;
  product: string;
  packs: number;
  published: string;
}

export interface AuditLogEntry {
  id: string;
  time: string;
  actor: string;
  action: string;
}
