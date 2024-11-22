import LinkItem from "../components/LinkItem";

export default function UsefulLinksPage() {
  const listData = [
    {
      title: "React Documentation",
      information: "Learn about React's features, hooks, and components.",
      tags: ["React", "JavaScript", "Frontend"],
      link: "https://reactjs.org",
    },
    {
      title: "Next.js",
      information: "Discover the power of server-side rendering with Next.js.",
      tags: ["Next.js", "React", "SSR"],
      link: "https://nextjs.org",
    },
    {
      title: "Playwright",
      information: "Automate testing for web applications using Playwright.",
      tags: ["Testing", "Automation", "Playwright"],
      link: "https://playwright.dev",
    },
  ];
  return (
    <div>
      <h1>Useful links</h1>
      {/* List of LinkItems */}
      <div className="bg-white p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center my-6">Links</h1>
        {listData.map((item, index) => (
          <LinkItem
            key={index}
            title={item.title}
            information={item.information}
            tags={item.tags}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
}
