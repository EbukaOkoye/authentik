import {
  AuditLogEntry,
  ConsoleBatch,
  HeroSlide,
  ManufacturerStep,
  NavItem,
  PrivacyPillar,
  SampleCodeRecord,
  ScanResultItem,
  VerificationStatus,
  VerificationStep,
} from "@/types";

export const BRAND = {
  name: "Huthentic",
  tagline: "Know it's genuine before you buy.",
  supportEmail: "support@huthentik.com",
  copyright: "© 2026 Huthentic",
} as const;

export const SECTION_IDS = {
  about: "about",
  howItWorks: "how-it-works",
  results: "results",
  manufacturers: "manufacturers",
  privacy: "privacy",
  getStarted: "get-started",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { name: "About", href: `#${SECTION_IDS.about}` },
  {
    name: "How it works",
    href: `#${SECTION_IDS.howItWorks}`,
    items: [
      {
        name: "Find the QR code",
        href: `#${SECTION_IDS.howItWorks}`,
        description: "Look for the verification code printed on the pack.",
      },
      {
        name: "Point your camera",
        href: `#${SECTION_IDS.howItWorks}`,
        description: "Align the code inside the frame, or type it in by hand.",
      },
      {
        name: "See the result",
        href: `#${SECTION_IDS.results}`,
        description: "A clear answer, saved to your scan history.",
      },
    ],
  },
  { name: "Results", href: `#${SECTION_IDS.results}` },
  {
    name: "For manufacturers",
    href: `#${SECTION_IDS.manufacturers}`,
    items: [
      {
        name: "Register products",
        href: `#${SECTION_IDS.manufacturers}`,
        description: "A unique PUIN is generated for each product type.",
      },
      {
        name: "Generate and publish codes",
        href: `#${SECTION_IDS.manufacturers}`,
        description: "Codes become verifiable the moment you publish.",
      },
      {
        name: "Recall a batch",
        href: `#${SECTION_IDS.manufacturers}`,
        description: "Every code in it returns RECALLED from the next scan.",
      },
    ],
  },
  { name: "Privacy", href: `#${SECTION_IDS.privacy}` },
];

export const HERO_AUTO_ADVANCE_MS = 9000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "consumer",
    headline: "Know it's genuine before you buy.",
    subheadline:
      "Find the QR code on the pack, point your camera at it and see the result in seconds — product, manufacturer, batch, NAFDAC number and expiry.",
    primaryCtaLabel: "See how it works",
    primaryCtaHref: `#${SECTION_IDS.howItWorks}`,
    secondaryCtaLabel: "For manufacturers",
    secondaryCtaHref: `#${SECTION_IDS.manufacturers}`,
    image: "/images/hero-pharmacy.jpg",
    imageAlt: "A shopper scanning the QR code on a medicine pack at a pharmacy counter",
  },
  {
    id: "markets",
    headline: "Protecting Nigerians from counterfeit products.",
    subheadline:
      "Shoppers cannot always identify genuine products from fake ones by physical checks alone. We use technology so they don't have to guess.",
    primaryCtaLabel: "About Huthentic",
    primaryCtaHref: `#${SECTION_IDS.about}`,
    secondaryCtaLabel: "Try a scan",
    secondaryCtaHref: `#${SECTION_IDS.results}`,
    image: "/images/hero-market.jpg",
    imageAlt: "Stalls stacked with packaged goods in a busy Nigerian market",
  },
  {
    id: "manufacturers",
    headline: "Protect your products — and the people who buy them.",
    subheadline:
      "Register each product, generate a unique code for every pack, and publish to your own table. When something goes wrong, recall a whole batch in one step.",
    primaryCtaLabel: "Talk to us",
    primaryCtaHref: `#${SECTION_IDS.getStarted}`,
    secondaryCtaLabel: "See the console",
    secondaryCtaHref: `#${SECTION_IDS.manufacturers}`,
    image: "/images/hero-factory.jpg",
    imageAlt: "A worker inspecting medicine cartons on a packaging line",
  },
];

export const PRODUCT_CATEGORIES: string[] = [
  "Medicines",
  "Food and beverages",
  "Cosmetics",
  "Baby care",
  "Agro-chemicals",
  "Household products",
  "Personal care",
  "Supplements",
];

export const ABOUT_CONTENT = {
  heading: "Protecting Nigerians from counterfeit products.",
  paragraphs: [
    "Counterfeit products put Nigerians' health and livelihoods at risk and shoppers cannot always identify genuine products from fake products by just physical checks. Our mission is to use technology to protect Nigerians from purchasing and consuming counterfeit consumer products which have proliferated the markets.",
    "We are working with Manufacturers, regulators and other stakeholders concerned with public health and consumer protection to make sure that every product purchased by Nigerian consumers is genuine. Together we are ridding Nigerian markets off counterfeit products.",
  ],
  image: "/images/about-hands.jpg",
  imageAlt: "Hands holding a medicine carton with a printed QR code",
} as const;

export const HOW_IT_WORKS_STEPS: VerificationStep[] = [
  {
    stepNumber: "01",
    title: "Find the QR code",
    description: "Look for the verification code printed on the pack.",
  },
  {
    stepNumber: "02",
    title: "Point your camera",
    description:
      "Align the code inside the frame. Low light? Switch on the torch, or type the code in by hand.",
  },
  {
    stepNumber: "03",
    title: "See the result",
    description:
      "A clear answer about what you bought, saved to your scan history.",
  },
];

export const HOW_IT_WORKS_STEP_DURATIONS_MS = [4200, 4200, 7000] as const;

export const SCAN_DETECT_MS = 1400;
export const VERIFY_CHECK_MS = 650;
export const REPORT_SEND_MS = 1300;
export const SCAN_HISTORY_LIMIT = 5;

export const VERIFY_CHECKS: string[] = [
  "Reading code",
  "Finding manufacturer record",
  "Checking batch and expiry",
];

export const SCAN_RESULTS: ScanResultItem[] = [
  {
    status: "VERIFIED",
    description:
      "See its name, manufacturer, batch, NAFDAC number and expiry. Expired stock is flagged so you don't buy it.",
    sampleCode: "HTK-2026-8841",
  },
  {
    status: "NOT VERIFIED",
    description:
      "We could not find this code. Check the code is clean and scan again in good light, or contact the seller or NAFDAC.",
    sampleCode: "HTK-0000-7720",
  },
  {
    status: "EXPIRED",
    description: "This product has expired and shouldn't be used",
    sampleCode: "HTK-2024-1102",
  },
  {
    status: "RECALLED",
    description:
      "The manufacturer has recalled this batch. Do not use it. Report it so it can be traced.",
    sampleCode: "HTK-2026-3390",
  },
];

export const STATUS_LABELS: Record<VerificationStatus, string> = {
  VERIFIED: "Verified",
  "NOT VERIFIED": "Not verified",
  EXPIRED: "Expired",
  RECALLED: "Recalled",
};

export const STATUS_TEXT_STYLES: Record<VerificationStatus, string> = {
  VERIFIED: "text-success",
  "NOT VERIFIED": "text-danger",
  EXPIRED: "text-warning",
  RECALLED: "text-danger",
};

export const STATUS_SOFT_STYLES: Record<VerificationStatus, string> = {
  VERIFIED: "bg-success-soft text-success",
  "NOT VERIFIED": "bg-danger-soft text-danger",
  EXPIRED: "bg-warning-soft text-warning",
  RECALLED: "bg-danger-soft text-danger",
};

export const STATUS_GUIDANCE: Record<VerificationStatus, string> = {
  VERIFIED: "This pack matches the manufacturer's records.",
  "NOT VERIFIED":
    "Check the code is clean and scan again in good light, or contact the seller or NAFDAC.",
  EXPIRED: "This product has expired and shouldn't be used.",
  RECALLED: "Do not use it. Report it so it can be traced.",
};

export const UNKNOWN_CODE_RECORD: Omit<SampleCodeRecord, "code"> = {
  status: "NOT VERIFIED",
  productName: "Code not found",
  manufacturer: "No matching manufacturer",
  batchNumber: "Not found",
  nafdacNumber: "Not found",
  expiryDate: "Not found",
  note: "We could not find this code in any manufacturer's published records.",
};

export const SAMPLE_CODE_RECORDS: Record<string, SampleCodeRecord> = {
  "HTK-2026-8841": {
    code: "HTK-2026-8841",
    status: "VERIFIED",
    productName: "Artemether/Lumefantrine 20/120mg, 24 tablets",
    manufacturer: "Medilane Pharmaceuticals Ltd",
    batchNumber: "ML2608",
    nafdacNumber: "A4-1048",
    expiryDate: "11/2028",
    note: "First scan of this pack.",
  },
  "HTK-2024-1102": {
    code: "HTK-2024-1102",
    status: "EXPIRED",
    productName: "Amoxicillin 500mg, 10 capsules",
    manufacturer: "Crestfield Healthcare Ltd",
    batchNumber: "CF2319",
    nafdacNumber: "04-8821",
    expiryDate: "08/2025",
    note: "Genuine pack, but past its expiry date.",
  },
  "HTK-2026-3390": {
    code: "HTK-2026-3390",
    status: "RECALLED",
    productName: "Paracetamol Oral Suspension 120mg/5ml, 100ml",
    manufacturer: "Novacare Laboratories Ltd",
    batchNumber: "NC2619",
    nafdacNumber: "A4-3390",
    expiryDate: "07/2027",
    note: "Batch NC2619 was recalled by the manufacturer.",
  },
};

export const MANUFACTURER_CONTENT = {
  heading: "Protect your products — and the people who buy them.",
  description:
    "Register each product, generate a unique code for every pack, and publish to your own table. When something goes wrong, recall a whole batch in one step.",
  guarantees: [
    "Uploads validated in full — nothing loads if any record fails",
    "A permanent audit log of every action",
  ],
} as const;

export const MANUFACTURER_STEPS: ManufacturerStep[] = [
  {
    stepNumber: "1",
    title: "Register products",
    description:
      "Add the name, description and regulatory number. A unique PUIN is generated for each product type.",
  },
  {
    stepNumber: "2",
    title: "Generate and publish codes",
    description:
      "Create serials and QR codes per batch, upload them, and publish to your own table. Codes become verifiable the moment you publish.",
  },
  {
    stepNumber: "3",
    title: "Consumers verify — you stay in control",
    description:
      "Shoppers scan in the app. Recall a batch and every code in it returns RECALLED from the next scan.",
  },
];

export const CONSOLE_ORG = {
  name: "Medilane Pharmaceuticals",
  initials: "ML",
  operator: "A. Bello",
} as const;

export const CONSOLE_PRODUCT = {
  name: "Artemether/Lumefantrine 20/120mg",
  description: "Antimalarial, 24 tablets per pack",
  nafdacNumber: "A4-1048",
  puin: "PUIN-4410-ML-0027",
} as const;

export const CONSOLE_UPLOAD = {
  batchId: "ML2608",
  fileName: "ML2608_serials.csv",
  totalRows: 50000,
  tickMs: 70,
  tickPercent: 3,
} as const;

export const CONSOLE_PUIN_MS = 1200;
export const CONSOLE_RECALL_MS = 1500;

export const CONSOLE_BATCHES: ConsoleBatch[] = [
  { id: "ML2608", product: "Artemether/Lumefantrine", packs: 50000, published: "12 Nov" },
  { id: "ML2571", product: "Artemether/Lumefantrine", packs: 40000, published: "28 Oct" },
  { id: "ML2544", product: "Ibuprofen 400mg", packs: 25000, published: "14 Oct" },
];

export const RECALL_TARGET_BATCH_ID = "ML2571";

export const INITIAL_AUDIT_LOG: AuditLogEntry[] = [
  { id: "a3", time: "10:14", actor: "A. Bello", action: "Published batch ML2608 (50,000 codes)" },
  { id: "a2", time: "09:58", actor: "A. Bello", action: "Uploaded ML2608_serials.csv, all rows valid" },
  { id: "a1", time: "09:41", actor: "System", action: "Blocked code …4417 after repeated scans, sent for review" },
];

export const PRIVACY_PILLARS: PrivacyPillar[] = [
  {
    id: "camera",
    title: "Camera reads codes only",
    description:
      "The camera is used only to scan the QR code. No photos are stored.",
  },
  {
    id: "location",
    title: "Location is your choice",
    description:
      "Reports share an approximate location only if you switch it on.",
  },
  {
    id: "serials",
    title: "Serials stay protected",
    description:
      "Operator screens never show plaintext serials, and only the manufacturer can recall a batch.",
  },
  {
    id: "copies",
    title: "Copies get caught",
    description:
      "A code scanned too many times is blocked and sent for review.",
  },
];

export const INQUIRY_SUBMIT_MS = 1400;

export const PRODUCT_CATEGORY_OPTIONS = [
  { value: "pharmaceuticals", label: "Pharmaceuticals" },
  { value: "food-beverage", label: "Food and beverages" },
  { value: "cosmetics", label: "Cosmetics and personal care" },
  { value: "agrochemicals", label: "Agro-chemicals" },
  { value: "other", label: "Other consumer goods" },
] as const;
