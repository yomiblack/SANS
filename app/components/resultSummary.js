// ResultSummary.js
import Link from "next/link";

export default function ResultSummary({ choirs }) {
  const totalChoirs = choirs.length;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {choirs.map((choir, index) => (
        <div
          key={choir._id}
          className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6"
        >
          <h1 className="text-center text-2xl font-bold mb-4">
            SANS 2.0 SCORE SHEET
          </h1>
          <h2 className="text-center text-lg font-semibold mb-6">
            {`${choir.choirDetails.choirName}'s Score Summary`}
          </h2>

          <div className="mb-6 border border-gray-300 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Choir Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Choir Name</label>
                <div>{choir.choirDetails.choirName}</div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Average</label>
                <div>{choir.totalAverage.toFixed(2)}</div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Position</label>
                <div>{totalChoirs - index}</div>
              </div>
            </div>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-300 text-center mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Criteria</th>
                <th className="border border-gray-300 px-4 py-2">Threshold</th>
                <th className="border border-gray-300 px-4 py-2">Average</th>
              </tr>
            </thead>
            <tbody>
              {[
                { criteria: "Originality", threshold: 15 },
                { criteria: "Melody and Lyrics", threshold: 15 },
                {
                  criteria: "Music Production and Arrangements",
                  threshold: 20,
                },
                { criteria: "Theme Interpretation", threshold: 10 },
                { criteria: "Hymnal", threshold: 10 },
                { criteria: "Appearance and Discipline", threshold: 10 },
                {
                  criteria: "Choreography and Audience Ovation",
                  threshold: 10,
                },
                { criteria: "Lead Vocalist Delivery", threshold: 10 },
              ].map((item, index) => {
                const scores = choir.criteria[item.criteria] || [0, 0, 0];
                const total = scores.reduce((a, b) => a + b, 0);
                const average = total / scores.length;

                return (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      {item.criteria}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.threshold} marks
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {average.toFixed(2)} marks
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Judges' Comments</h3>
            {Object.keys(choir.comments).map((judge, index) => (
              <div key={index} className="mb-4">
                <label className="block font-semibold mb-2">
                  {judge}'s Comments
                </label>
                <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                  {choir.comments[judge]}
                </div>
              </div>
            ))}
          </div>

          <menu className="flex justify-end items-center gap-4">
            <Link
              href="/choirs"
              className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
            >
              Close
            </Link>
          </menu>
        </div>
      ))}
    </div>
  );
}
