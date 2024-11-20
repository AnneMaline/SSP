import Authentication from "./components/Authentication";
import FeedbackForm from "./components/FeedbackForm";
import TopTask from "./components/TopTask";

export default function Home() {
  // TopTask titles and routes
  const topTaskTitle = [
    "OSDU General",
    "Information about the role",
    "Step-guides",
    "Useful links",
  ];
  const topTaskRoutes = [
    "OSDU-general",
    "Role-information",
    "Step-guides",
    "Useful-links",
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/*<Authentication />*/}

        {/* TopTasks */}
        <ul className="flex justify-end space-x-4">
          {topTaskTitle.map((text, index) => (
            <li key={index}>
              <TopTask
                targetUrl={`/${topTaskRoutes[index]}`}
                text={`${text}`}
              />
            </li>
          ))}
        </ul>

        {/* Mission statement */}
        <h1>Mission statement</h1>
        <p>
          OSDU Selv-service portal enables you to find, collect and read
          relevant information for the xx and xx. This page contains all
          relevant documentation and provides you with the right tools to share,
          collect and save data. The self-service portal is under construction
          and we appreciate feedback for further improvements.
        </p>

        {/* Further documentation - OSDU documentation */}
        <h1>Further documentation</h1>
        <a
          href="https://docs.osdu.equinor.com/"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600`}
        >
          OSDU Documentation
        </a>

        {/* Feedback or questions about the SSP */}
        <h1>Feedback or questions</h1>
        <p>
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything we can improve.
        </p>
        <FeedbackForm />
      </main>
    </div>
  );
}
