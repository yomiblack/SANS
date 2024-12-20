import ResultSummary from "../components/resultSummary";
import getFromDatabase from "../components/action/getFromDatabase";

export default async function Result() {
  const choirs = await getFromDatabase(null, "gratitude");

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Final Result
      </h2>
      {choirs.length > 0 ? (
        <ResultSummary choirs={choirs} />
      ) : (
        <p className="text-lg text-gray-600">Loading...</p>
      )}
    </div>
  );
}
