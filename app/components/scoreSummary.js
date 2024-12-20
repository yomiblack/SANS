import Link from "next/link";

export default function ScoreSummary({ choirs }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {choirs.map((choir) => (
        <div
          key={choir._id}
          className="w-full max-w-4xl bg-white p-6 md:p-8 shadow-lg rounded-lg mb-6"
        >
          <h1 className="text-center text-2xl font-bold mb-4">
            SANS 2.0 SCORE SHEET
          </h1>
          <h2 className="text-center text-lg font-semibold mb-6">
            {`${choir.choirDetails.choirName}'s Score Summary`}
          </h2>

          {/* Choir Details Section */}
          <div className="mb-6 border border-gray-300 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Choir Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Choir Name", value: choir.choirDetails.choirName },
                { label: "Duration", value: choir.choirDetails.duration },
                {
                  label: "Choir Total Number",
                  value: choir.choirDetails.choirTotalNumber,
                },
                {
                  label: "Choir Ballot Number",
                  value: choir.choirDetails.choirBallotNumber,
                },
                {
                  label: "Choir Arrival Time",
                  value: choir.choirDetails.choirArrivalTime,
                },
              ].map((detail, index) => (
                <div key={index}>
                  <label className="block font-semibold mb-1">
                    {detail.label}
                  </label>
                  <div>{detail.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Table */}
          <div className="overflow-x-auto mb-6">
            <table className="table-auto w-full border-collapse border border-gray-300 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Criteria</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Threshold
                  </th>
                  <th className="border border-gray-300 px-4 py-2">IgeSings</th>
                  <th className="border border-gray-300 px-4 py-2">Frettic</th>
                  <th className="border border-gray-300 px-4 py-2">Bambam</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
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
                        {scores[0]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {scores[1]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {scores[2]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {total}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {average.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Judges' Comments */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Judges&apos; Comments
            </h3>
            {["IgeSings", "Frettic", "Bambam"].map((judge, index) => (
              <div key={index} className="mb-4">
                <label className="block font-semibold mb-2">
                  {judge}&apos;s Comments
                </label>
                <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                  {choir.comments[judge]}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
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
