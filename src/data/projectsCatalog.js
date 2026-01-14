export const PROJECTS_CATALOG = [
  {
    id: 1,
    title: 'Jira Digital Twin',
    category: 'Computer Science',
    owner: 'Internal',
    repoUrl: '',
    goal: 'A flagship twin of our Jira workflows, showcasing how project management systems can be modeled as digital twins for portfolio visibility.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
  {
    id: 2,
    title: 'USGBC Engagement Twin',
    category: 'Computer Science',
    owner: 'Mario',
    teamMemberFirstName: 'Mario',
    teamMemberLastName: '',
    teamMemberRole: 'Software Engineer',
    repoUrl: 'https://siromidahmadi.github.io/USGBC-/',
    goal: 'A comprehensive digital twin solution for USGBC engagement data, providing real-time visualization and analysis of sustainability projects and certifications.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
    lastUpdated: '2024-01-01',
    
    // Detailed Project Description
    description: 'The USGBC Engagement Twin is a state-of-the-art digital platform that transforms how sustainability data is visualized and analyzed. It serves as a central hub for tracking LEED certifications, project progress, and sustainability metrics across multiple dimensions.',
    
    // Technical Specifications
    techStack: {
      frontend: ['React', 'D3.js', 'Mapbox GL'],
      backend: ['Node.js', 'Express'],
      database: ['MongoDB', 'PostGIS'],
      devOps: ['Docker', 'GitHub Actions', 'AWS']
    },
    
    // Key Features
    features: [
      'Interactive 3D visualization of project locations and certifications',
      'Real-time data synchronization with USGBC APIs',
      'Custom dashboard builder for different user roles',
      'Automated reporting with PDF/Excel export',
      'Predictive analytics for certification outcomes',
      'Mobile-responsive design for field data collection'
    ],
    
    // Project Modules
    modules: {
      dataIngestion: {
        description: 'Automated data collection from multiple sources',
        components: [
          'USGBC API integration',
          'CSV/Excel import tools',
          'Data validation and cleaning'
        ]
      },
      analytics: {
        description: 'Advanced data processing and analysis',
        components: [
          'LEED score calculator',
          'Sustainability impact assessment',
          'Benchmarking tools'
        ]
      },
      visualization: {
        description: 'Interactive data presentation',
        components: [
          'Custom chart builder',
          'Geospatial mapping',
          '3D project visualization'
        ]
      }
    },
    
    // Project Impact
    impact: {
      metrics: [
        '30% reduction in data processing time',
        '50+ projects actively monitored',
        '10+ sustainability metrics tracked',
        'Real-time certification status updates'
      ],
      benefits: [
        'Improved decision-making with real-time data',
        'Enhanced stakeholder engagement',
        'Streamlined certification process',
        'Better resource allocation'
      ]
    },
    
    // Data Management
    data: {
      sources: [
        'USGBC API v3',
        'LEED Online',
        'Arc platform',
        'Custom project submissions'
      ],
      types: [
        'Project metadata',
        'Certification records',
        'Energy/water usage data',
        'Material specifications',
        'Waste management metrics'
      ]
    },
    
    // Project Roadmap
    roadmap: [
      { phase: 'Phase 1', status: 'Completed', items: ['Core platform development', 'Basic visualization'] },
      { phase: 'Phase 2', status: 'In Progress', items: ['Advanced analytics', 'Mobile optimization'] },
      { phase: 'Phase 3', status: 'Planned', items: ['AI predictions', 'Blockchain verification'] }
    ],
    
    // Team and Collaboration
    team: {
      members: [
        { name: 'Mario', role: 'Lead Developer' },
        { name: 'Design Team', role: 'UI/UX Design' },
        { name: 'Data Science', role: 'Analytics' }
      ],
      collaboration: [
        'USGBC Technical Committee',
        'Sustainability Consultants',
        'Building Owners and Operators'
      ]
    },
    
    // Additional Metadata
    tags: ['sustainability', 'leed', 'green-building', 'data-visualization'],
    license: 'MIT',
    documentation: 'https://github.com/siromidahmadi/USGBC-/wiki',
    demoUrl: 'https://siromidahmadi.github.io/USGBC-/',
    
    // Project Health
    health: {
      status: 'active',
      lastDeployed: '2024-01-10',
      openIssues: 5,
      testCoverage: '85%'
    }
  },
  {
    id: 3,
    title: 'Alpha Earth Sandbox',
    category: 'Architecture',
    owner: 'Lab',
    repoUrl: '',
    goal: 'An experimental sandbox twin where new structures, modules, and data types can be prototyped before going live.',
    image: '',
    status: 'Idea',
    projectType: 'flagship',
  },
  {
    id: 4,
    title: 'Baldwin Hills 6-Mile Corridor Digital Twin',
    category: 'Architecture',
    owner: 'Omid Ahmadi',
    teamMemberFirstName: 'Omid',
    teamMemberLastName: 'Ahmadi',
    teamMemberRole: 'Software Engineer',
    repoUrl: 'https://digitaltwinshub.github.io/Baldwin/',
    goal: 'The goal of the Baldwin Hills 6-Mile Corridor Digital Twin is to provide an accessible, data-driven platform that visualizes environmental, infrastructure, and community conditions along the corridor. The project aims to bridge the gap between technical urban data and public understanding, enabling planners, students, and community members to explore risks, opportunities, and impacts in a clear, interactive way that supports informed decision-making and equitable planning.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
  {
    id: 1001,
    title: 'User Project',
    category: 'Architecture',
    owner: 'You',
    repoUrl: '',
    goal: 'A starter user project that demonstrates how to describe goals, structure, and modules for your own digital twin.',
    image: '',
    status: 'Idea',
    projectType: 'user',
  },
  {
    id: 1002,
    title: 'Urban Heat Island Analysis',
    category: 'Environmental Science',
    owner: 'Research Team',
    teamMemberFirstName: 'Research',
    teamMemberLastName: 'Team',
    teamMemberRole: 'Environmental Researchers',
    repoUrl: '',
    goal: 'A digital twin project analyzing urban heat island effects in major cities, providing insights into temperature variations and potential mitigation strategies.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
  {
    id: 1003,
    title: 'Pando',
    category: 'Environmental Science',
    owner: 'Research Team',
    repoUrl: '',
    goal: 'A digital twin project focused on the Pando aspen clone, the world\'s largest known organism, to study its growth patterns and environmental impact.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
  {
    id: 1004,
    title: 'ASU-RECLAMATION',
    category: 'Water Resources',
    owner: 'ASU Research Team',
    repoUrl: '',
    goal: 'A collaborative project with the Bureau of Reclamation to develop digital twin technologies for water resource management and reclamation projects.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
  {
    id: 1005,
    title: 'ShadeLA',
    category: 'Urban Planning',
    owner: 'City of Los Angeles',
    repoUrl: '',
    goal: 'A digital twin initiative to map and analyze shade distribution across Los Angeles to improve urban heat island mitigation and public space planning.',
    image: '',
    status: 'In Progress',
    projectType: 'flagship',
  },
];

export function getAllProjects() {
  return PROJECTS_CATALOG;
}

export function getProjectById(id) {
  return PROJECTS_CATALOG.find((p) => String(p.id) === String(id)) || null;
}
