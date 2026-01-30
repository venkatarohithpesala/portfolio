// Experience data for portfolio
export const experience = [
    {
        company: 'Nebraska Innovation Labs',
        location: 'Omaha, Nebraska',
        role: 'Full Stack Developer',
        period: 'Nov 2024 - Present',
        logo: '/experience-icons/neil.png',
        website: 'https://www.neinnovationlabs.com/',
        projects: [
            {
                name: 'DM- DreamMoney',
                supervisor: 'Ms. Megan Hale',
                period: 'Oct 2025 - Present',
                highlights: [
                    'Sole full-stack engineer building the next version of DreamMoney using Next.js, TypeScript, and PostgreSQL (pgAdmin), delivering end-to-end features across UI, API, database, and deployments.',
                    'Owned the complete SDLC: created and managed work in Jira, implemented features and fixes, reviewed/merged PRs, and released to dev, QA, and production via CI/CD.',
                    'Modernized the Admin Dashboard UI and refactored user management by consolidating multiple admin pages into a single, filter-driven view to improve performance and simplify workflows.',
                    'Implemented admin-initiated onboarding flows including resend invitation email, securely retrieving temporary credentials from Keycloak and delivering them through updated email templates.',
                    'Redesigned and standardized HTML email templates across the application to improve user communication, readability, and consistent branding.',
                    'Revamped the User Dashboard experience to support business planning and financial workflows, improving navigation and overall usability.',
                    'Built and integrated core planning modules and data flows such as spending plans, revenue goal calculators, business model builder, financial projections, cash flow allocation, profit sharing planner, and yearly summaries, ensuring accurate persistence in PostgreSQL.',
                    'Performed production support and platform maintenance by monitoring New Relic, investigating AWS CloudWatch logs for Lambda issues, validating scheduled jobs, and verifying email deliverability.',
                    'Ensured environment consistency by managing configuration updates and synchronizing secrets using AWS Secrets Manager, supporting stable releases across all environments.',
                    'Improved code quality and release confidence by enforcing Sonar checks in the pipeline and resolving merge conflicts early to keep deployments reliable.'
                ]
            },
            {
                name: 'AQI - Aequitas Invest',
                supervisor: 'Mr. Lemuel Stevens',
                period: 'Feb 2025 - Present',
                highlights: [
                    'Customized an existing company dashboard into a multi-role investment platform for Entrepreneurs and Investors, enabling end-to-end onboarding, campaign creation, and investing workflows.',
                    'Built application workflows for both roles: users complete detailed applications, perform email verification, and proceed to account creation using pre-filled form data from the database.',
                    'Implemented admin approval logic: once approved, entrepreneurs can create campaigns visible to the public; investors can browse campaigns and invest based on platform rules.',
                    'Integrated investor compliance checks by invoking North Capital TransactAPI KYC/AML (performKycAml) after investor personal details submission; persisted approval/rejection results and full response payloads in the database.',
                    'Enforced campaign funding rules by validating investor investments against the minimum investment amount configured by entrepreneurs for each campaign.',
                    'Implemented payment processing through North Capital fund movement APIs, supporting both Credit Card and ACH payment options for investors.',
                    'Enabled Credit Card (Stripe) payments by embedding the Stripe payment flow via iframe using North Capital’s linkCreditCard response URL, executing the payment API, and storing transaction responses for audit and tracking.',
                    'Enabled ACH (Plaid) payments by embedding the Plaid bank-link flow via iframe using North Capital’s linkExternalAccount response URL, initiating ACH payments, and storing responses in the database.',
                    'Added payment method update capabilities so investors can overwrite existing credit card/bank account details using updateLinkedCreditCard and updateLinkExternalAccount, improving repeat-investment experience.',
                    'Integrated real-time messaging between users using WebSocket, ensuring instant message delivery within the dashboard with minimal latency.',
                    'Designed role-specific dashboards that display application and account data in read-only mode after submission/approval to enhance transparency and user experience.',
                    'Built admin functionality to view, approve, or reject applications, including internal (admin-only) and external (user-visible) notes to support effective communication and audit trails.',
                    'Implemented OTP-based phone verification using Twilio (SMS), storing verification status and applying rate limiting to prevent abuse.'
                ]
            },
            {
                name: 'VisitorLog Book System',
                supervisor: 'Mr. Lemuel Stevens',
                period: 'Aug 2025 - Sep 2025',
                highlights: [
                    'Developed a full-stack visitor management system for companies using Vite (React) for the frontend, Node.js/Express for the backend, and MS SQL Server for the database.',
                    'Implemented visitor sign-in and sign-out flows: new visitors can create a profile, while returning visitors are fetched from the database.',
                    'Visitors select the employee they are visiting; the system logs their check-in and check-out times.',
                    'Added an automated script to auto sign-out visitors after office hours. Integrated Swagger for API documentation and testing.'
                ]
            },
            {
                name: 'DAR - Digital Air Registry',
                supervisor: 'Mr. Lemuel Stevens',
                period: 'Mar 2025 - Apr 2025',
                highlights: [
                    'Developed the property claiming workflow, enabling users to register and submit claims for their properties.',
                    'Users could search their property on a map (using Mapbox GL) and view details retrieved from ReportAll USA API.',
                    'Implemented admin approval process to validate claims before displaying them in the user dashboard.',
                    'Enabled owners to withdraw their claimed properties from their dashboard at any time.'
                ]
            },
            {
                name: 'ICHA - Inspire Collaborative Health Association',
                supervisor: 'Mr. Lemuel Stevens',
                period: 'Nov 2024 - Feb 2025',
                highlights: [
                    'Implemented a role-based login system with three dashboards: Public (no login required), Patient (login required), and Member (login required).',
                    'Added email verification for user registration and ensured form submissions are securely stored and retrievable from the database.',
                    'Built an extensive enrollment form with 150+ fields, allowing admin approval/rejection with real-time notifications.',
                    'Automated directory card creation upon admin approval and developed the admin dashboard for managing users and form submissions.',
                    'Enabled temporary directory card updates pending admin approval via Mailtrap-integrated emails.',
                    'Created and managed GitHub issues for each task, providing clear solutions and step-by-step validation for troubleshooting.',
                    'Maintained detailed documentation of bugs and errors, participated in daily meetings, and provided regular progress updates.',
                    'Automated DB table setup and contributed structured README for project onboarding.'
                ]
            }
        ]
    }
    ,
    {
        company: 'University Of Nebraska at Omaha',
        location: 'Omaha, Nebraska',
        logo: '/experience-icons/uno.jpg',
        website: 'https://www.unomaha.edu/',
        roles: [
            {
                role: 'Attic Graduate Researcher',
                period: 'June 2024 - Dec 2024',
                projects: [
                    {
                        name: 'Codecrush Project',
                        supervisor: 'Dr. Deepak Khazanchi',
                        period: 'June 2024 - Dec 2024',
                        highlights: [
                            'Led the complete redevelopment of the CodeCrush website, modernizing the architecture and implementing a scalable backend using Python (Flask) and a component-based frontend with ReactJS for improved maintainability and performance.',
                            'Designed and integrated a dynamic form submission and approval system, enabling students to submit requests and administrators to review, approve, or reject entries via a secure admin dashboard.',
                            'Implemented RESTful APIs for seamless communication between the frontend and backend, ensuring efficient data handling and secure access control.',
                            'Maintained version control with Bitbucket, managing issues and performing peer code reviews to ensure high-quality, maintainable code.'
                        ]
                    }
                ]
            },
            {
                role: 'Graduate Researcher',
                period: 'Jan 2023 - June 2024',
                projects: [
                    {
                        name: 'UNMC Project',
                        supervisor: 'Dr. John Youn',
                        period: 'Jan 2023 - June 2024',
                        highlights: [
                            'Spearheaded the "Infant Monitoring Systems" project under the guidance of Dr. John Youn, focused on improving health outcomes through data driven analysis of sleep patterns in infants aged 6 - 15 months.',
                            'Developed Python-based algorithms in Jupyter Notebook, achieving a 95% accuracy rate in detecting sleep duration and patterns, leading to a 30% improvement in research insights.',
                            'Advanced the project by accurately identifying sleep and idle states, paving the way for sensor validation and the publication of findings in a peer reviewed research paper.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        company: 'HCL Technologies',
        location: 'Chennai, India',
        role: 'Software Engineer',
        period: 'Sep 2021 - Dec 2023',
        logo: '/experience-icons/hcl1.jpg',
        website: 'https://www.hcltech.com/',
        projects: [
            {
                name: 'Citi Bank – CGE Project',
                supervisor: 'Mr. Soumen Paul',
                period: 'Sep 2021 - Dec 2023',
                highlights: [
                    'Completed intensive training in Java Full Stack Development and certified through the Great Learning platform.',
                    'Joined the Citi Gifts and Entertainment (CGE) project and quickly adapted to an existing Java/Spring Boot backend and React.js frontend architecture.',
                    'Developed and enhanced RESTful APIs using Java and Spring Boot, ensuring secure and scalable data exchange between frontend and backend systems, which improved performance and reliability.',
                    'Implemented UI enhancements with React.js, refining existing components and improving user workflows, resulting in measurable gains in user satisfaction.',
                    'Optimized SQL queries and data access methods in MySQL, reducing data retrieval times by 25% and improving application responsiveness.'
                ]
            }
        ]
    }
];
