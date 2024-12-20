import getFromDatabase from "@/app/components/action/getFromDatabase";
import ScoreSummary from "@/app/components/scoreSummary";
import SideBar from "@/app/components/sidebar";

export async function generateMetadata({ params }) {
  return {
    title: `${params._id}`,
    description: "Data is generated dynamically for this page",
  };
}

export default async function ChoirSummary({ params }) {
  const current = await params;
  let currentPage;
  if (current) {
    currentPage = current.choirSlug || null;
  }
  const choirs = await getFromDatabase(currentPage, "gratitude");

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-100 border-r">
        <SideBar currentPage={currentPage} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
            Choir Summary
          </h2>
          {choirs?.length ? (
            <div className="overflow-x-auto">
              <ScoreSummary choirs={choirs} />
            </div>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}
