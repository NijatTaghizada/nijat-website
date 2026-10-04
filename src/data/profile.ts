export const profile = {
  name: 'Nijat Taghizada',
  email: 'nijattag@stanford.edu',
  personalEmail: 'taghizada.nijat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nijat-taghizada/',
  github: 'https://github.com/NijatTaghizada',
  school: 'Stanford University',
  degree: 'Data Science / Computer Science',
  gradYear: 2030,
}

export const stats = [
  { value: 43, suffix: '/45', label: 'IB Diploma score' },
  { value: 500, prefix: '~', label: 'competitive programming problems solved' },
  { value: 157, label: 'volunteer hours at COP29' },
  { value: 50, suffix: '+', label: 'hours hiking across Azerbaijan' },
]

export type Build = {
  title: string
  kicker: string
  blurb: string
  tags: string[]
  visual: 'snake' | 'sensor' | 'platform' | 'pipeline' | 'roc'
  size: 'wide' | 'tall' | 'full' | 'normal'
}

export const builds: Build[] = [
  {
    kicker: 'Robotics · React Right',
    title: 'A snake robot that finds earthquake survivors',
    blurb: 'A segmented robot that slithers into collapsed rubble where people can’t go, to locate survivors.',
    tags: ['Robotics', 'Search & rescue'],
    visual: 'snake',
    size: 'wide',
  },
  {
    kicker: 'Hardware · React Right',
    title: 'Smoke sensor that calls for help',
    blurb: 'Detects smoke and automatically alerts first responders. No one has to make the call.',
    tags: ['Sensors', 'Alerts'],
    visual: 'sensor',
    size: 'tall',
  },
  {
    kicker: 'Platform · React Right',
    title: 'Disaster-management platform',
    blurb: 'One place to help people before, during, and after a natural disaster.',
    tags: ['Platform', 'Nonprofit'],
    visual: 'platform',
    size: 'normal',
  },
  {
    kicker: 'ML · Published at ISPEC',
    title: 'Wildfire prediction model',
    blurb: 'Co-authored XGBoost + TabNet models on NASA satellite data, explained with SHAP. Presented at ISEF 2025.',
    tags: ['XGBoost', 'TabNet', 'SHAP'],
    visual: 'pipeline',
    size: 'normal',
  },
  {
    kicker: 'Deep learning · Stanford',
    title: 'Chest X-ray classifier',
    blurb: 'A DenseNet121 CNN on NIH chest X-rays reaching 0.80 ROC-AUC. Final project for DATASCI 112.',
    tags: ['CNN', 'DenseNet121'],
    visual: 'roc',
    size: 'full',
  },
]

export const path = [
  {
    when: 'Grade 9',
    items: [
      { title: 'World Scholar’s Cup', body: 'Baku → London Global Round → Yale Tournament of Champions. Silver in debate, gold in essay writing.' },
      { title: 'Competitive programming', body: 'Started grinding C++ on Codeforces, LeetCode and Eolymp: DP, graphs, greedy.' },
    ],
  },
  {
    when: 'Grade 10',
    items: [
      { title: 'Boston University Honors Program', body: 'Multivariable Calculus (A) and Macroeconomic Analysis (A-).' },
      { title: 'Founded React Right', body: 'Started building technology for disaster response.' },
      { title: 'Duke of Edinburgh hiking', body: 'Trekked across Azerbaijan’s regions and learned first aid and navigation.' },
    ],
  },
  {
    when: 'Grade 11',
    items: [
      { title: 'Stanford Summer Session', body: 'Applied Statistics and Principles of Data Science for college credit. That’s where data clicked.' },
      { title: 'COP29 · Baku', body: 'Media operations at the UN climate conference, bridging journalists, activists and delegates.' },
      { title: 'ISEF 2025 & ISPEC', body: 'Grand Award at Regeneron ISEF; wildfire research published at ISPEC.' },
    ],
  },
  {
    when: 'Now',
    items: [
      { title: 'Stanford University', body: 'Class of 2030, exploring Data Science and Computer Science.' },
    ],
  },
]

export const honors = [
  { title: 'Grand Award Winner', org: 'Regeneron ISEF', note: 'Systems Software category' },
  { title: 'Gold & Silver', org: 'World Scholar’s Cup', note: 'Essay · Debate · Yale ToC' },
  { title: 'National Winner', org: 'Science Fairs', note: 'Sabahın Alimləri & more' },
  { title: 'Semi-Finalist', org: 'National Informatics Olympiad', note: 'Azerbaijan' },
  { title: 'Medalist', org: 'International Science Fairs', note: 'iWISE, VILIPO & more' },
]

export const impact = [
  {
    role: 'Founder',
    org: 'React Right',
    body: 'A nonprofit building technology for natural disasters, from a rubble-crawling snake robot to sensors that alert first responders on their own.',
    phases: ['Before', 'During', 'After'],
  },
  {
    role: 'Captain',
    org: 'FIRST Global Team Azerbaijan',
    body: 'Led the national robotics team: programming, match strategy, and outreach on an international stage.',
  },
  {
    role: 'Media Operations',
    org: 'COP29 · UNFCCC',
    body: '157 hours supporting logistics and filming, and acting as a bridge between journalists, activists and delegates.',
  },
]

export const greetings = [
  { word: 'Hello', lang: 'English' },
  { word: 'Salam', lang: 'Azərbaycanca' },
  { word: 'Привет', lang: 'Русский' },
  { word: 'Merhaba', lang: 'Türkçe' },
]

export const toolkit = {
  Code: ['Python', 'C++', 'Java'],
  'ML / Data': ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'SHAP', 'pandas', 'NumPy'],
  Arenas: ['Codeforces', 'LeetCode', 'Eolymp'],
}
