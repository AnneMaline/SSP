import Card from "../components/StepCard";

export default function StepGuidesPage() {
  const cardsData = [
    {
      title: "React Documentation",
      information:
        "Learn more about React and its features on the official documentation.",
      link: "https://reactjs.org",
    },
    {
      title: "Next.js",
      information:
        "Next.js provides the best developer experience for building React applications.",
      link: "https://nextjs.org",
    },
    {
      title: "Playwright",
      information: "Automate tests for your web applications with Playwright.",
      link: "https://playwright.dev",
    },
  ];

  return (
    <div>
      <h1>Step-guides</h1>
      {/* List of StepCards */}
      <div className="bg-gray-100">
        <h1 className="text-2xl font-bold text-center my-6">
          Step-by-step-guides
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              information={card.information}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
