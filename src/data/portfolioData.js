export const caseStudies = [
  {
    id: 'my-file-nyc',
    title: 'My File NYC',
    tagline: 'Secure document access for all New Yorkers',
    shortDesc: 'Redesigned the core document upload and verification flow to reduce friction for residents accessing city benefits — scaling a platform used by hundreds of thousands of New Yorkers.',
    role: 'Senior Product Designer',
    company: "NYC Mayor's Office for Economic Opportunity",
    timeline: 'Feb 2024 – Present',
    team: 'Engineering, Policy, Resident Advocates, Agency Staff',
    tools: ['Figma', 'Miro', 'UserTesting', 'Maze', 'Airtable'],
    tags: ['Design Systems', 'Accessibility', 'Civic Tech'],
    accentColor: '#4D96FF',
    accentDark: '#2171DB',
    bgGradient: 'linear-gradient(135deg, #1E5EBF 0%, #4D96FF 60%, #8CC5FF 100%)',
    metricPrimary: '22%',
    metricLabel: 'faster processing',
    metricSecondary: '83%',
    metricSecondaryLabel: 'engagement increase',
    editorialHeadline: 'Streamlined agency workflows by refining the UX and creating a scalable design system',
    productDesc: "My File NYC is a platform that supports both residents and agencies throughout the shelter, letting both parties focus on housing — not paperwork.",
    challenge: "New Yorkers applying for city benefits faced a broken document submission experience — repeated uploads across agencies, unclear status tracking, and no way to know if their documents were received or accepted. Agency staff were equally frustrated by inconsistent formats and manual review bottlenecks. The product had accumulated years of disconnected feature additions with no unifying design language.",
    process: [
      {
        phase: 'Discover',
        emoji: '🔍',
        color: '#FFD93D',
        activities: [
          '30+ usability testing sessions with residents and agency staff',
          'Journey mapping across 6 agency touchpoints',
          'Gap analysis of existing document submission flows',
          'Stakeholder interviews with policy and program leadership'
        ],
        insight: 'Residents uploaded the same document an average of 4.2 times across different programs — often with no confirmation it was received or accepted.'
      },
      {
        phase: 'Define',
        emoji: '🎯',
        color: '#FF6B6B',
        activities: [
          'Synthesized research into 3 core problem themes',
          'Defined success metrics with product leadership',
          'Created design principles for the platform',
          'Mapped MVP feature priorities with engineering and policy teams'
        ],
        insight: "The biggest opportunity wasn't in the upload flow — it was the complete absence of status visibility after submission. Residents were in the dark."
      },
      {
        phase: 'Design',
        emoji: '✏️',
        color: '#4D96FF',
        activities: [
          'Rapid wireframing and concept exploration across 3 mental models',
          'Design system creation for all document status states',
          'High-fidelity prototypes for resident and agency workflows',
          'Accessibility review and remediation against WCAG 2.2 standards'
        ],
        insight: "We tested 3 mental models for status visibility: 'mail tracking,' 'checklist,' and 'timeline.' Residents overwhelmingly preferred the timeline metaphor — it felt familiar and trustworthy."
      },
      {
        phase: 'Deliver',
        emoji: '🚀',
        color: '#6BCB77',
        activities: [
          'Partnered with engineering on detailed component specifications',
          'Created scalable design system adopted across 4 city products',
          'Mentored and managed 4 fellow designers through critique and coaching',
          'Presented design vision to senior stakeholders — influenced org-wide design system adoption'
        ],
        insight: "Advocating for a centralized design system was as much a design challenge as the interface itself. The real work was getting stakeholder buy-in."
      }
    ],
    results: [
      { number: '22%', label: 'Reduction in application processing time' },
      { number: '83%', label: 'Increase in resident engagement' },
      { number: '30+', label: 'Usability testing sessions conducted' },
      { number: '4', label: 'Products unified under one design system' }
    ],
    reflection: "This project taught me that in civic tech, the most impactful design decisions happen before any pixel is placed. Advocating for a centralized design system — and getting stakeholder buy-in — was as much a design challenge as the interface itself. When you're designing for residents who depend on these systems, getting it right isn't optional."
  },
  {
    id: 'jobs-nyc',
    title: 'Jobs NYC',
    tagline: 'Connecting upskilled talent with NYC employers',
    shortDesc: 'Led 0→1 product design for a workforce platform matching program graduates with employers — later selected as the early pilot for the 2026 NYC.gov Design System.',
    role: 'Product Designer',
    company: "NYC Mayor's Office for Economic Opportunity",
    timeline: 'Jan 2023 – Feb 2024',
    team: 'Engineering, NYC Office of Technology & Innovation, Workforce Programs, Employers',
    tools: ['Figma', 'Miro', 'Maze', 'Airtable'],
    tags: ['0→1 Design', 'Platform Design', 'Accessibility'],
    accentColor: '#3DC47E',
    accentDark: '#1F9A5C',
    bgGradient: 'linear-gradient(135deg, #1A7A4A 0%, #3DC47E 60%, #90E4B5 100%)',
    metricPrimary: '0→1',
    metricLabel: 'full product built',
    metricSecondary: '2026',
    metricSecondaryLabel: 'NYC.gov pilot',
    editorialHeadline: 'Designed a 0→1 workforce marketplace connecting upskilled New Yorkers with employers — later piloting the 2026 NYC.gov Design System',
    productDesc: "Jobs NYC is a platform that connects workforce training programs and their vetted graduates with NYC employers actively hiring for specific skill sets.",
    challenge: "Workforce programs had no efficient way to showcase their graduates to employers, and employers had no trusted pipeline to find pre-vetted, upskilled candidates. Job seekers were qualified but invisible. Existing tools were disconnected, inaccessible, and designed for the agency — not the people.",
    process: [
      {
        phase: 'Discover',
        emoji: '🔍',
        color: '#FFD93D',
        activities: [
          'Interviews with 20+ workforce program coordinators',
          'Employer needs assessment across 12 industries',
          'Job seeker journey mapping sessions',
          'Competitive analysis of workforce marketplace platforms'
        ],
        insight: "Employers didn't distrust workforce program graduates — they just didn't know how to find them. The platform needed to build visibility, not convince anyone."
      },
      {
        phase: 'Define',
        emoji: '🎯',
        color: '#FF6B6B',
        activities: [
          'Defined 3 distinct user types with unique needs and mental models',
          'Created product requirements for candidate-skill matching',
          'Designed program catalog information architecture',
          'Established NYC accessibility compliance standards with OTI'
        ],
        insight: "The program catalog was the key differentiator. Employers needed context about how candidates were trained, not just a list of skills."
      },
      {
        phase: 'Design',
        emoji: '✏️',
        color: '#4D96FF',
        activities: [
          'Designed employer-facing search, filtering, and candidate profile system',
          'Built responsive component library from scratch',
          'Created candidate profile templates across 12 skill categories',
          'Piloted 2026 NYC.gov Design System — every decision had to scale city-wide'
        ],
        insight: "We were simultaneously designing a product and the future of NYC.gov. That dual constraint made every decision more intentional."
      },
      {
        phase: 'Deliver',
        emoji: '🚀',
        color: '#6BCB77',
        activities: [
          'Launched platform serving NYC workforce ecosystem',
          'Served as early pilot for 2026 NYC.gov Design System',
          'Created comprehensive design handoff documentation',
          'Transitioned to Senior Designer role on expanded scope'
        ],
        insight: "The updated version of Jobs NYC launched in 2026 as part of the new NYC.gov Design System — work I seeded in this role, a year earlier."
      }
    ],
    results: [
      { number: '3', label: 'User types served: programs, employers, job seekers' },
      { number: '2026', label: 'NYC.gov Design System pilot partner' },
      { number: '12+', label: 'Industries represented in employer network' },
      { number: '100%', label: 'WCAG 2.2 accessibility compliance' }
    ],
    reflection: "Building 0→1 in a civic context is rare and humbling. You're not just designing a product — you're shaping how a city talks about opportunity. The constraint of serving as a design system pilot forced me to think at a systems level from day one. Every component I built had to earn its place in the broader NYC design language."
  },
  {
    id: 'workforce-data-portal',
    title: 'Workforce Data Portal',
    tagline: 'Making workforce data actionable for city planners',
    shortDesc: 'Designed an agency-facing analytics platform giving program coordinators and city policy staff real-time visibility into workforce outcomes.',
    role: 'Senior Product Designer',
    company: "NYC Mayor's Office for Economic Opportunity",
    timeline: '2024 – Present',
    team: 'Data Engineering, Policy Leadership, Program Coordinators',
    tools: ['Figma', 'Miro', 'Google Analytics', 'Airtable'],
    tags: ['Data Visualization', 'Dashboard Design', 'Civic Tech'],
    accentColor: '#9B72E6',
    accentDark: '#6D45C5',
    bgGradient: 'linear-gradient(135deg, #4A2B9E 0%, #9B72E6 60%, #C9B8FF 100%)',
    metricPrimary: '4+',
    metricLabel: 'products unified',
    metricSecondary: '30+',
    metricSecondaryLabel: 'research sessions',
    editorialHeadline: 'Replaced manual reporting with a role-based analytics portal giving city planners real-time workforce insights',
    productDesc: "The Workforce Data Portal gives program coordinators, policy staff, and city planners real-time visibility into workforce program outcomes — replacing hours of manual reporting.",
    challenge: "Program data was scattered across spreadsheets, email chains, and disconnected tools. Coordinators spent hours each week manually compiling reports. Policy staff and leadership wanted different views of the same data — but had no way to access it without requesting custom exports.",
    process: [
      {
        phase: 'Discover',
        emoji: '🔍',
        color: '#FFD93D',
        activities: [
          'Workflow shadowing with program coordinators (20+ hours observed)',
          'Audit of existing data sources, tools, and reporting structures',
          'Stakeholder interviews across 4 levels: coordinators, managers, policy, leadership',
          'Analysis of current reporting pain points and workarounds'
        ],
        insight: "Policy staff and coordinators had completely different mental models for what 'useful' data looked like. One dashboard for all was never going to work."
      },
      {
        phase: 'Define',
        emoji: '🎯',
        color: '#FF6B6B',
        activities: [
          'Defined 4 distinct data personas with unique needs and questions',
          'Created information hierarchy for role-based dashboard views',
          'Mapped data taxonomy and field definitions with engineering',
          'Established filtering, comparison, and export requirements'
        ],
        insight: "Role-based views surfacing different metrics were the answer. The data was the same — the question was always 'what decision does this person need to make?'"
      },
      {
        phase: 'Design',
        emoji: '✏️',
        color: '#4D96FF',
        activities: [
          'Designed role-based dashboard templates for 4 user types',
          'Created accessible data visualization component library',
          'Built color-blind-safe chart palette from the start',
          'Prototyped filtering, drill-down, and export interactions'
        ],
        insight: "Data visualization accessibility is usually an afterthought. We built inclusive charts from day one — color-blind-safe palettes, screen-reader-compatible legends, the whole thing."
      },
      {
        phase: 'Deliver',
        emoji: '🚀',
        color: '#6BCB77',
        activities: [
          'Launched portal with phased rollout and coordinator onboarding',
          'Integrated with My File NYC design system — launched faster because patterns existed',
          'Established feedback loops for continuous improvement',
          'Created documentation for future design team iteration'
        ],
        insight: "The design system investment from My File NYC paid real dividends here. We launched faster because we weren't starting from zero."
      }
    ],
    results: [
      { number: '4+', label: 'Products sharing one unified design system' },
      { number: '30+', label: 'Research sessions informing design decisions' },
      { number: '2×', label: 'Faster report compilation for coordinators' },
      { number: '100%', label: 'WCAG 2.2 accessibility compliance' }
    ],
    reflection: "This project solidified my conviction that design systems aren't a luxury — they're how you scale good design. Every decision we made here benefited from patterns established in earlier products. Investing early in shared foundations creates compounding returns on every future product."
  },
  {
    id: 'orchid-b2b',
    title: 'Orchid B2B Platform',
    tagline: 'Streamlining enterprise procurement at scale',
    shortDesc: 'Led UX design for a B2B supplier relationship platform — delivering a scalable design system and high-fidelity product on a compressed 5-month timeline.',
    role: 'UX Designer',
    company: 'Moment Studio',
    timeline: 'Aug 2022 – Jan 2023',
    team: 'Product Owners, Engineering, Client Stakeholders',
    tools: ['Figma', 'Adobe XD', 'ProtoPie', 'Miro'],
    tags: ['B2B Design', 'Design Systems', 'Enterprise UX'],
    accentColor: '#FF6B6B',
    accentDark: '#E04444',
    bgGradient: 'linear-gradient(135deg, #C42B2B 0%, #FF6B6B 60%, #FFB5B5 100%)',
    metricPrimary: '5mo',
    metricLabel: 'delivery timeline',
    metricSecondary: 'Scalable',
    metricSecondaryLabel: 'system reused',
    editorialHeadline: 'Delivered a scalable enterprise procurement platform and design system on a 5-month agency timeline',
    productDesc: "Orchid is a B2B platform streamlining supplier relationship management for enterprise clients — designed and delivered at Moment Studio under a tight agency timeline.",
    challenge: "Enterprise procurement teams were managing hundreds of supplier relationships through email threads, spreadsheets, and disconnected portals. Every stakeholder level had different workflows. Existing tools forced users to adapt to the software — not the other way around.",
    process: [
      {
        phase: 'Discover',
        emoji: '🔍',
        color: '#FFD93D',
        activities: [
          'Client workshops with procurement and operations teams',
          'User interviews across 3 stakeholder levels',
          'Workflow documentation and process mapping',
          'Competitive analysis of enterprise procurement tools'
        ],
        insight: "Power users and occasional users needed completely different entry points. The same feature set could serve both — but the information hierarchy had to flex."
      },
      {
        phase: 'Define',
        emoji: '🎯',
        color: '#FF6B6B',
        activities: [
          'Defined 3 user archetypes: power users, managers, executives',
          'Created information architecture for complex data relationships',
          'Established design system foundations and component inventory',
          'Aligned on MVP scope — cut 40% of nice-to-haves to build core 60% exceptionally'
        ],
        insight: "Scope discipline was the unlock. Cutting scope didn't mean less quality — it meant focusing quality where it mattered most."
      },
      {
        phase: 'Design',
        emoji: '✏️',
        color: '#4D96FF',
        activities: [
          'Wireframes first — kept stakeholder focus on flow before visual polish',
          'Built scalable design system for consistent delivery across team',
          'High-fidelity prototypes with ProtoPie for key interaction demos',
          'Design rationale documentation for every major decision'
        ],
        insight: "Wireframing first, always. Stakeholders fall in love with color and forget about flow. Wireframes keep the conversation on what actually matters."
      },
      {
        phase: 'Deliver',
        emoji: '🚀',
        color: '#6BCB77',
        activities: [
          'Delivered complete product on 5-month compressed timeline',
          'Design system reused across multiple subsequent client projects',
          'Facilitated client training and collected structured feedback',
          'Full handoff documentation for engineering and future designers'
        ],
        insight: "Agency work is a design accelerator. Limited time forces sharper decisions. The habits I built here — systems thinking, stakeholder alignment, scoped delivery — shape every project I do today."
      }
    ],
    results: [
      { number: '5mo', label: 'Delivered on compressed agency timeline' },
      { number: '3', label: 'Stakeholder levels served with one platform' },
      { number: 'Reused', label: 'Design system adopted across future projects' },
      { number: '100%', label: 'Stakeholder sign-off on final designs' }
    ],
    reflection: "Agency work taught me to make decisive calls quickly, communicate rationale clearly, and build systems that outlast the engagement. It also taught me the power of scope discipline — sometimes the most impactful design decision is knowing what not to build."
  }
];

export const about = {
  name: 'Jaylene Rubio',
  title: 'Senior Product Designer',
  location: 'New York, NY',
  tagline: "I design city systems that actually work for the people who need them most.",
  bio: "I'm a Senior Product Designer with 4+ years of experience designing digital systems that serve real people — especially those who've historically been underserved by technology. My work at the NYC Mayor's Office has been used by 2M+ New Yorkers, and I care deeply about making government services accessible, clear, and genuinely human.",
  bio2: "I came to UX from education and psychology — which means I think about behavior, systems, and equity before I open Figma. I mentor designers, facilitate research, run design critique sessions, and push hard for design systems that scale. Good design at the city level has to be built to last.",
  skills: {
    'UX & Research': ['Design Thinking', 'User Research', 'Journey Mapping', 'Usability Testing', 'Information Architecture', 'Accessibility (WCAG 2.2)', 'Gap Analysis'],
    'Product Design': ['Wireframing', 'Prototyping', 'Design Systems', 'Component Libraries', '0→1 Design', 'Stakeholder Alignment', 'Design Critique'],
    'Tools': ['Figma', 'Framer', 'ProtoPie', 'Miro', 'Adobe XD', 'Sketch', 'Maze', 'UserTesting'],
    'AI & Emerging': ['Figma AI', 'Framer AI', 'Loveable', 'Claude']
  },
  skillColors: {
    'UX & Research': '#4D96FF',
    'Product Design': '#6BCB77',
    'Tools': '#9B72E6',
    'AI & Emerging': '#FF6B6B'
  },
  stats: [
    { number: '2M+', label: 'New Yorkers using products I designed' },
    { number: '83%', label: 'Engagement increase (My File NYC)' },
    { number: '22%', label: 'Processing time reduction' },
    { number: '30+', label: 'Usability sessions conducted' },
    { number: '4', label: 'Designers mentored & managed' }
  ],
  experience: [
    {
      title: 'Senior Product Designer',
      company: "NYC Mayor's Office for Economic Opportunity",
      period: 'Feb 2024 – Present',
      location: 'Brooklyn, NY',
      highlight: 'My File NYC · Workforce Data Portal · NYC Poverty Atlas'
    },
    {
      title: 'Product Designer',
      company: "NYC Mayor's Office for Economic Opportunity",
      period: 'Jan 2023 – Feb 2024',
      location: 'Brooklyn, NY',
      highlight: 'Jobs NYC · 2026 NYC.gov Design System pilot'
    },
    {
      title: 'UX Designer',
      company: 'Moment Studio',
      period: 'Aug 2022 – Jan 2023',
      location: 'Remote',
      highlight: 'Orchid B2B Platform · Design Systems'
    },
    {
      title: 'Instructional Designer',
      company: 'Catapult Learning',
      period: 'Jun 2021 – Aug 2022',
      location: 'Remote',
      highlight: 'Digital learning · Teacher development'
    }
  ],
  email: 'jaylenerubio1@gmail.com',
  linkedin: '#'
};
