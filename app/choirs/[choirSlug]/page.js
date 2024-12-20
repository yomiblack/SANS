import getFromDatabase from "@/app/components/action/getFromDatabase";
import ScoreSummary from "@/app/components/scoreSummary";
import SideBar from "@/app/components/sidebar";

export default async function ChoirSummary({ params }) {
  let currentPage;
  const current = await params;
  if (current) currentPage = current.choirSlug;
  const choirs = await getFromDatabase(currentPage, "gratitude");

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <SideBar currentPage={currentPage} />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            Choir Summary
          </h2>
          {choirs && <ScoreSummary choirs={choirs} />}
        </div>
      </div>
    </div>
  );
}
