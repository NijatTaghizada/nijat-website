export const profile = {
  name: 'Nijat Taghizada',
  email: 'nijattag@stanford.edu',
  personalEmail: 'taghizada.nijat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nijat-taghizada/',
  github: 'https://github.com/NijatTaghizada',
}

export type Link = { href: string; label: string }

export type Project = {
  title: string
  meta: string
  body: string
  tags: string[]
  links: Link[]
}

export const projects: Project[] = [
  {
    title: 'Wildfire Severity Prediction',
    meta: 'Research project · 2026 · follow-up to ISEF',
    body:
      'When a satellite first spots a new fire in California, can we tell whether it will grow past 1,000 acres? I built a dataset of 5,565 California fires from 2012–2024 by matching NASA VIIRS detections to US Forest Service fire records, then added weather, fuel, vegetation and terrain data from before each fire was seen. I trained models including XGBoost and an explainable boosting machine, and used SHAP to see what drives each prediction. It follows up our ISEF project, Wildfire Predictiveness With Explainable AI, which won a Grand Award at Regeneron ISEF 2025.',
    tags: ['Python', 'XGBoost', 'EBM', 'SHAP'],
    links: [
      { href: 'https://github.com/NijatTaghizada/wildfire-severity-prediction', label: 'Code on GitHub' },
      { href: 'https://isef.net/project/soft031t-wildfire-predictiveness-with-explainable-ai', label: 'ISEF project page' },
    ],
  },
  {
    title: 'React Right',
    meta: 'Startup · founder · since 2024',
    body:
      'An early-stage startup I founded to build technology for the gap between a disaster starting and help arriving. So far that’s a first snake-robot prototype for moving through tight spaces like collapsed buildings, plus the wildfire research above.',
    tags: ['Robotics', 'Disaster response'],
    links: [{ href: 'https://nijattaghizada.github.io/reactright-website/', label: 'React Right website' }],
  },
  {
    title: 'Chest X-ray classification',
    meta: 'Course project · Stanford DATASCI 112',
    body: 'Trained a DenseNet121 convolutional network to classify NIH chest X-rays. It reached 0.80 ROC-AUC.',
    tags: ['Python', 'CNN', 'DenseNet121'],
    links: [],
  },
]

export type Entry = { title: string; org: string; when?: string; body?: string }

export const experience: Entry[] = [
  {
    title: 'Founder',
    org: 'React Right',
    when: '2024 – present',
    body: 'Started React Right in 2024 (see Projects above).',
  },
  {
    title: 'Team Captain',
    org: 'FIRST Global, Team Azerbaijan',
    body: 'Captained Azerbaijan’s team at the FIRST Global robotics challenge. I coordinated programming, match strategy, and outreach.',
  },
  {
    title: 'Media Operations Volunteer',
    org: 'COP29 (UNFCCC), Baku',
    when: '2024',
    body: '157 volunteer hours helping with logistics and filming, and working with journalists and delegates.',
  },
]

export const education: Entry[] = [
  { title: 'B.S. (planned): Data Science or Computer Science', org: 'Stanford University', when: 'Class of 2030' },
  { title: 'Summer Session: Applied Statistics; Principles of Data Science', org: 'Stanford University' },
  { title: 'High School Honors Program: Multivariable Calculus; Macroeconomic Analysis', org: 'Boston University' },
  { title: 'IB Diploma Programme (43/45)', org: 'European Azerbaijan School, Baku' },
]

export const honors: Entry[] = [
  { title: 'Grand Award, Systems Software', org: 'Regeneron ISEF 2025' },
  { title: 'Semi-finalist', org: 'National Informatics Olympiad, Azerbaijan' },
  { title: 'Gold medal (essay), silver medal (debate)', org: 'World Scholar’s Cup' },
  { title: 'Medals', org: 'International science fairs', body: 'Including iWISE and VILIPO.' },
  { title: 'Awards', org: 'National science fairs in Azerbaijan', body: 'Including Sabahın Alimləri.' },
]

export const outside: Entry[] = [
  {
    title: 'Hiking',
    org: 'Duke of Edinburgh, European Azerbaijan School hiking team',
    body: '50+ hours of hiking across different regions of Azerbaijan, picking up first aid and navigation along the way.',
  },
  {
    title: 'Debate & writing',
    org: 'World Scholar’s Cup',
    body: 'Debated and wrote essays from the Baku round all the way to the Tournament of Champions at Yale.',
  },
]

export const skills = [
  { label: 'Programming', items: 'Python, C++, Java' },
  { label: 'ML / data', items: 'pandas, NumPy, scikit-learn, PyTorch, TensorFlow, SHAP' },
  { label: 'Competitive programming', items: 'Around 500 problems on Codeforces, LeetCode and Eolymp' },
  { label: 'Languages', items: 'English and Azerbaijani (native), Russian, Turkish' },
]
