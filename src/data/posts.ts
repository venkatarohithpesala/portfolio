// LinkedIn posts shown in the Posts section, newest first.
// To add one: LinkedIn post "..." menu -> "Embed this post", then copy the
// numeric id from the iframe src (urn:li:share:<id>) and its height.
// `title` is the card label (usually the post's opening line).
// `tag` drives the filter chips; `featured` pins a post to the top row.
// The post date is decoded from the id, so there is nothing to type for it.
export const POST_TAGS = ['Cloud & AWS', 'System Design', 'Databases', 'Dev Tools', 'Security', 'Projects'] as const;
export type PostTag = (typeof POST_TAGS)[number];

export const posts: {
    id: string;
    height: number;
    title: string;
    tag: PostTag;
    featured?: boolean;
    summary?: string; // shown on the large lead card in the featured row (first featured post)
}[] = [
    { id: "7521245788904062976", height: 520, tag: "Projects", featured: true, summary: "A free, open-source VS Code extension that compares .env and .env.example files to catch missing variables, extra variables, empty values, and duplicate keys, with no secrets exposed. Built with TypeScript and 50 unit tests.", title: "One missing .env variable. One \"undefined\" error. Introducing DotEnv Lens v0.1.0" },
    { id: "7520491340460130306", height: 580, tag: "System Design", featured: true, title: "A tornado is approaching. Thousands of phones get an alert. How?" },
    { id: "7517980883211964417", height: 670, tag: "Cloud & AWS", title: "New to cloud? These are the main services to know" },
    { id: "7516552574708264960", height: 670, tag: "Databases", title: "If all databases store data, why do companies use different ones?" },
    { id: "7511440811390078977", height: 670, tag: "Cloud & AWS", title: "Imagine your application has 3 servers" },
    { id: "7510351077154766848", height: 670, tag: "Dev Tools", title: "Most developers know GET, POST, PUT, and DELETE" },
    { id: "7505720705079238657", height: 620, tag: "Databases", title: "What really happens when Google deletes data?" },
    { id: "7500596570879528960", height: 670, tag: "Cloud & AWS", title: "LocalStack: testing AWS services locally" },
    { id: "7490447576899452928", height: 625, tag: "System Design", title: "Why does reacting to a LinkedIn post feel instant, even on a weak connection?" },
    { id: "7488291867609190400", height: 642, tag: "Dev Tools", title: "Why modern dev tools are getting a massive speed boost" },
    { id: "7482906927472062464", height: 469, tag: "System Design", title: "Why doesn't Netflix or YouTube quality switch with every small speed change?" },
    { id: "7465786982334623744", height: 551, tag: "System Design", title: "Why does the car icon in Uber or DoorDash move so smoothly on the map?" },
    { id: "7458538422731952129", height: 670, tag: "System Design", title: "How does a stock app update prices instantly without refreshing?" },
    { id: "7457835132519874562", height: 670, tag: "Dev Tools", title: "How does Git quickly know what changed? Merkle trees" },
    { id: "7452373205945700352", height: 539, tag: "Security", title: "Why do many apps ask for MFA codes during login?" },
    { id: "7451010274280759297", height: 593, tag: "Security", title: "Most people think tap-to-pay works because of NFC" },
    { id: "7369384448917737474", height: 593, tag: "Databases", title: "Why does a website load so fast the second time you visit?" },
    { id: "7359608036497244160", height: 644, tag: "Projects", featured: true, title: "AeQuitas Invest website is now live" },
    { id: "7353071084683845635", height: 593, tag: "System Design", title: "What if clicking a button twice made a payment go through twice?" },
    { id: "7344377231470678016", height: 670, tag: "Databases", title: "How does Redis work?" },
    { id: "7343647746844753922", height: 264, tag: "System Design", title: "Why I don't send emails directly from my code" },
    { id: "7342922792390021123", height: 264, tag: "Security", title: "How do websites remember you after you close the tab?" },
    { id: "7340748911336214532", height: 264, tag: "System Design", title: "How do chat apps update messages instantly?" },
];

// LinkedIn ids encode the post time: milliseconds since epoch = id >> 22.
// Number() loses a few low bits of the id, which is far below one millisecond of error.
export function postDate(id: string): Date {
    return new Date(Math.floor(Number(id) / 4194304));
}
