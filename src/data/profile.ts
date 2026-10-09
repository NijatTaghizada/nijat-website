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
    title: 'Wildfire Predictiveness With Explainable AI',
    meta: 'Team research project · ISEF 2025 · ISPEC',
    body:
      'Co-authored a study on estimating wildfire risk from NASA satellite data using XGBoost and TabNet, with SHAP to explain what drives each prediction. We presented it at Regeneron ISEF 2025 and published it at the ISPEC 17th International Conference on Engineering & Natural Sciences.',
    tags: ['Python', 'XGBoost', 'TabNet', 'SHAP'],
    links: [
      { href: 'https://isef.net/project/soft031t-wildfire-predictiveness-with-explainable-ai', label: 'ISEF project page' },
    ],
  },
  {
    title: 'React Right',
    meta: 'Student project · since 2024',
    body:
      'A small student group I started to see whether we could build anything useful for the gap between a disaster starting and help arriving. So far that’s an early-stage snake-robot prototype for moving through tight spaces like collapsed buildings, plus the wildfire research above.',
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
  { title: 'IB Diploma Programme (43/45)', org: 'High school, Baku' },
]

export const honors: Entry[] = [
  { title: 'Grand Award, Systems Software', org: 'Regeneron ISEF 2025' },
  { title: 'Semi-finalist', org: 'National Informatics Olympiad, Azerbaijan' },
  { title: 'Gold medal (essay), silver medal (debate)', org: 'World Scholar’s Cup', body: 'Advanced from Baku through the London Global Round to the Tournament of Champions at Yale.' },
  { title: 'Medals', org: 'International science fairs', body: 'Including iWISE and VILIPO.' },
  { title: 'Awards', org: 'National science fairs in Azerbaijan', body: 'Including Sabahın Alimləri.' },
]

export const skills = [
  { label: 'Programming', items: 'Python, C++, Java' },
  { label: 'ML / data', items: 'pandas, NumPy, scikit-learn, PyTorch, TensorFlow, SHAP' },
  { label: 'Competitive programming', items: 'Around 500 problems on Codeforces, LeetCode and Eolymp' },
  { label: 'Languages', items: 'English and Azerbaijani (native), Russian, Turkish' },
]
