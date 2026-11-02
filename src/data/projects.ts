// Projects data for portfolio
export const projects: {
    title: string;
    description: string;
    tags: string[];
    links?: { label: string; href: string }[];
}[] = [
    {
        title: "DotEnv Lens",
        description:
            "Published a free, open-source VS Code extension that shows .env values when you hover over process.env in your code, and compares .env files with their templates to find missing, extra, and empty keys. Includes an optional mode that masks secrets for screen sharing. Built with TypeScript and covered by 79 unit tests.",
        tags: ["VS Code Extension", "TypeScript", "Open Source"],
        links: [
            {
                label: "VS Code Marketplace",
                href: "https://marketplace.visualstudio.com/items?itemName=venkatarohithpesala.dotenv-lens",
            },
            {
                label: "GitHub",
                href: "https://github.com/venkatarohithpesala/dotenv-lens",
            },
        ],
    },
    {
        title: "Ventrack",
        description:
            "Developed a full-stack vendor compliance platform for managing, approving, and tracking vendor documents and compliance status. Implemented secure document handling, role-based access, and automated notifications.",
        tags: ["Full-Stack", "Vendor Compliance", "Role-Based Access"],
    },
    {
        title: "Newstrust",
        description:
            "Built a full-stack web app for verifying news claims using OpenAI and NewsAPI. Users submit claims and receive confidence scores, source links, and concise explanations for each result.",
        tags: ["OpenAI", "NewsAPI", "Fact-Checking"],
    },
    {
        title: "AI Code Generator",
        description:
            "Developed an AI-powered tool to generate code snippets from user prompts using OpenAI models. Provided a Flask API for prompt handling, code generation, and easy integration.",
        tags: ["OpenAI", "Flask", "Code Generation"],
    },
    {
        title: "3D Free Space detection",
        description:
            "Designed a 3D free space detection system for autonomous vehicles, leveraging stereo camera depth data and advanced line-fitting to identify safe, navigable areas and improve obstacle avoidance.",
        tags: ["Computer Vision", "Autonomous Systems", "3D Detection"],
    },
];
