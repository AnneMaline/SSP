import Image from "next/image";
import Authentication from "./components/Authentication";
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
    "Role-Information",
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
      </main>
    </div>
  );
}
