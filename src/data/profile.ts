export const profile = {
  name: 'Nijat Taghizada',
  email: 'taghizada.nijat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nijat-taghizada/',
  github: 'https://github.com/NijatTaghizada',
  school: 'Stanford University',
  degree: 'B.S. Data Science · Quantitative Finance',
  gradYear: 2030,
}

export const stats = [
  { value: 43, suffix: '/45', label: 'IB Diploma score' },
  { value: 500, prefix: '~', label: 'competitive programming problems solved' },
  { value: 157, label: 'volunteer hours at COP29' },
  { value: 4, label: 'languages spoken' },
]

export type Project = {
  index: string
  title: string
  kicker: string
  summary: string
  stack: string[]
  outcomes: { label: string; detail: string }[]
  visual: 'pipeline' | 'roc'
}

export const projects: Project[] = [
  {
    index: '01',
    kicker: 'Research · Published',
    title: 'Predicting wildfire severity from orbit',
    summary:
      'Gradient-boosted trees and attentive neural networks trained on NASA satellite data to estimate how severe a wildfire will be, with SHAP explaining why the model thinks so.',
    stack: ['XGBoost', 'TabNet', 'SHAP', 'NASA satellite data', 'Python'],
    outcomes: [
      { label: 'Published', detail: 'ISPEC 17th International Conference on Engineering & Natural Sciences' },
      { label: 'Presented', detail: 'Regeneron ISEF 2025, Grand Award, Systems Software' },
      { label: 'Discussed', detail: 'Deployment with the Ministry of Emergency Situations of Azerbaijan' },
    ],
    visual: 'pipeline',
  },
  {
    index: '02',
    kicker: 'Deep learning · Stanford',
    title: 'Reading chest X-rays with a CNN',
    summary:
      'A DenseNet121 convolutional network trained to classify NIH chest radiographs. Built as the final project for Stanford’s DATASCI 112.',
    stack: ['DenseNet121', 'CNN', 'NIH chest X-rays', 'Python'],
    outcomes: [
      { label: 'Result', detail: '0.80 ROC-AUC' },
      { label: 'Course', detail: 'Stanford DATASCI 112, final project' },
    ],
    visual: 'roc',
  },
]

export const honors = [
  { title: 'Grand Award Winner', org: 'Regeneron ISEF', note: 'Systems Software category' },
  { title: 'Semi-Finalist', org: 'National Informatics Olympiad', note: 'Azerbaijan' },
  { title: 'Medalist', org: 'International Science Fairs', note: 'iWISE, VILIPO & more' },
]

export const impact = [
  {
    role: 'Founder',
    org: 'React Right',
    body: 'A nonprofit disaster-management platform using new technology to help people before, during, and after natural disasters.',
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
    body: '157 hours keeping the world’s press running at the UN climate conference.',
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
