import ResultSummary from "../components/resultSummary";
import getFromDatabase from "../components/action/getFromDatabase";

export default async function Result() {
  const choirs = await getFromDatabase(null, "gratitude");

  return (
    // <div className="flex min-h-screen bg-gray-100">
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Final Result</h2>
      {choirs.length > 0 ? (
        <ResultSummary choirs={choirs} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    // </div>
  );
}
