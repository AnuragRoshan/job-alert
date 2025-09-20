export const jobKeywords = [
  // Programming Languages
  "JavaScript", "Python", "Java", "TypeScript", "C++", "C#", "PHP", "Ruby", "Go", "Rust",
  "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Dart", "Objective-C",

  // Frontend Technologies
  "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "HTML", "CSS", "SASS", "SCSS",
  "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Styled Components", "jQuery",

  // Backend Technologies
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Laravel", "Ruby on Rails",
  "ASP.NET", "FastAPI", "Nest.js", "Koa.js", "Fastify",

  // Databases
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "SQLite", "Oracle",
  "Cassandra", "DynamoDB", "Firebase", "Supabase", "PlanetScale",

  // Cloud & DevOps
  "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Jenkins", "GitLab CI",
  "GitHub Actions", "Terraform", "Ansible", "Chef", "Puppet", "Helm",

  // Mobile Development
  "React Native", "Flutter", "iOS", "Android", "Xamarin", "Ionic", "Cordova",

  // Data & Analytics
  "Machine Learning", "Data Science", "AI", "Deep Learning", "TensorFlow", "PyTorch",
  "Pandas", "NumPy", "Jupyter", "Tableau", "Power BI", "Apache Spark", "Hadoop",

  // Testing
  "Jest", "Cypress", "Selenium", "Playwright", "Testing Library", "Mocha", "Chai",
  "JUnit", "pytest", "Puppeteer",

  // Tools & Platforms
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Slack", "Figma",
  "Adobe XD", "Sketch", "Postman", "VSCode", "IntelliJ", "Vim", "Emacs",

  // Job Roles
  "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer",
  "Data Scientist", "Machine Learning Engineer", "Product Manager", "UI/UX Designer",
  "Software Engineer", "Senior Developer", "Lead Developer", "Architect", "CTO",
  "Engineering Manager", "Scrum Master", "QA Engineer", "Site Reliability Engineer",

  // Industries
  "Fintech", "Healthcare", "E-commerce", "SaaS", "EdTech", "Gaming", "Blockchain",
  "Cryptocurrency", "IoT", "Cybersecurity", "Startup", "Enterprise", "B2B", "B2C",

  // Skills
  "Agile", "Scrum", "Kanban", "Microservices", "API Development", "REST API", "GraphQL",
  "WebSockets", "OAuth", "JWT", "CI/CD", "Performance Optimization", "Code Review",
  "Technical Leadership", "System Design", "Database Design", "Security", "Accessibility",

  // Experience Levels
  "Entry Level", "Junior", "Mid-level", "Senior", "Lead", "Principal", "Staff",
  "Remote", "Hybrid", "On-site", "Contract", "Freelance", "Part-time", "Full-time",

  // Soft Skills
  "Communication", "Problem Solving", "Team Leadership", "Mentoring", "Cross-functional",
  "Collaboration", "Project Management", "Time Management", "Critical Thinking"
];

export const getKeywordSuggestions = (input) => {
  if (!input || input.length < 2) return [];

  const searchTerm = input.toLowerCase();
  return jobKeywords
    .filter(keyword =>
      keyword.toLowerCase().includes(searchTerm)
    )
    .slice(0, 10)
    .sort((a, b) => {
      // Prioritize exact matches at the beginning
      const aStarts = a.toLowerCase().startsWith(searchTerm);
      const bStarts = b.toLowerCase().startsWith(searchTerm);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.localeCompare(b);
    });
};