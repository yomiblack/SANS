import Link from "next/link";
import { metrics } from "../util/form/metrics";

export default function ScoreSummary({ choirs, episode }) {
  const judges = Object.keys(choirs.comments); // Extract the Judge's names dynamically

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div
        key={choirs._id}
        className="w-full max-w-4xl bg-white p-6 md:p-8 shadow-lg rounded-lg mb-6"
      >
        <h1 className="font-display text-center text-2xl font-bold mb-4">
          {`SANS ${episode ? `${episode}.0` : "Musical Concert"} Score Sheet`}
        </h1>
        <h2 className="text-center text-lg font-semibold mb-6">
          {`${choirs.choirDetails.choirName}'s Score Summary`}
        </h2>

        {/* Choir Details Section */}
        <div className="mb-6 border border-gray-300 p-6 rounded-lg bg-white shadow-md">
          <h3 className="font-display text-xl font-semibold mb-6 text-center text-gray-800">
            Choir Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name: ", value: choirs.choirDetails.choirName },
              { label: "Duration: ", value: choirs.choirDetails.duration },
              {
                label: "Total Number: ",
                value: choirs.choirDetails.choirTotalNumber,
              },
              {
                label: "Ballot Number: ",
                value: choirs.choirDetails.choirBallotNumber,
              },
              {
                label: "Arrival Time: ",
                value: choirs.choirDetails.choirArrivalTime,
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-300 pb-2"
              >
                <label className="font-medium text-gray-700">
                  {detail.label}
                </label>
                <span className="font-display text-gray-900 truncate max-w-[150px] sm:max-w-[200px] md:max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Table */}
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full border-collapse border border-gray-300 text-center">
            <thead className="font-heading bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Criteria</th>
                <th className="border border-gray-300 px-4 py-2">Threshold</th>
                {/* Loop through the judges */}
                {judges.map((judge, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {judge}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Average</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((item, index) => {
                const scores =
                  choirs.criteria[item.criteria] ||
                  Array.from({ length: judges.length }, () => 0);
                const total = scores.reduce((a, b) => a + b, 0).toFixed(2);
                const average = scores.length > 0 ? total / scores.length : 0; // Prevent division by zero

                return (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      {item.criteria}
                    </td>
                    <td className="font-display border border-gray-300 px-4 py-2">
                      {item.threshold} marks
                    </td>
                    {scores.map((score, scoreIndex) => (
                      <td
                        key={scoreIndex}
                        className="font-display border border-gray-300 px-4 py-2"
                      >
                        {score}
                      </td>
                    ))}
                    <td className="font-display border border-gray-300 px-4 py-2">
                      {total}
                    </td>
                    <td className="font-display border border-gray-300 px-4 py-2">
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
          <h3 className="font-heading text-lg font-semibold mb-4">
            Judges&apos; Comments
          </h3>
          {judges.map((judge, index) => (
            <div key={index} className="mb-4">
              <label className="font-display block font-semibold mb-2">
                {judge}&apos;s Comments
              </label>
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                {choirs.comments[judge]}
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
    </div>
  );
}
