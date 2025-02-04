import Link from "next/link";
import BlurBackground from "../util/blurBackground";

export default function ResultSummary({
  choirs,
  index: episode,
  setChoirs,
  setSelectedContest,
}) {
  const handleClose = () => {
    setChoirs(null); // Reset the choirs state to unmount the modal
    setSelectedContest(""); // Reset the selectedContest state
  };

  // Function to calculate positions considering ties
  const calculatePositions = (choirs) => {
    // Sort choirs by totalAverage in ascending order (lowest to highest)
    const sortedChoirs = [...choirs].sort(
      (a, b) => a.totalAverage - b.totalAverage
    );

    // Assign positions, handling ties
    let position = choirs.length; // Start from the last position
    const positionedChoirs = sortedChoirs.map((choir, index) => {
      if (
        index > 0 &&
        choir.totalAverage > sortedChoirs[index - 1].totalAverage
      ) {
        position = choirs.length - index; // Update position if the average is higher than the previous
      }
      return {
        ...choir,
        position, // Assign the current position
      };
    });

    return positionedChoirs;
  };

  // Function to add ordinal suffix to a number
  const getOrdinalSuffix = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder10 = number % 10;
    const remainder100 = number % 100;

    // Handle special cases for 11, 12, 13
    if (remainder100 >= 11 && remainder100 <= 13) {
      return `${number}th`;
    }

    // Use the appropriate suffix based on the last digit
    return `${number}${suffixes[remainder10] || "th"}`;
  };

  // Calculate positions for all choirs
  const positionedChoirs = calculatePositions(choirs);

  return (
    <BlurBackground>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        {positionedChoirs.map((choir, index) => (
          <div
            key={choir._id}
            className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6"
          >
            <h1 className="font-display text-center text-2xl font-bold mb-4">
              {`Result Summary for SANS ${episode}.0`}
            </h1>
            <h2 className="font-heading text-center text-lg font-semibold mb-6">
              {`${choir.choirDetails.choirName}\'s Score Summary`}
            </h2>

            <div className="mb-6 border border-gray-300 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                Choir Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
                <div>
                  <label className="block font-semibold mb-1">Choir Name</label>
                  <div className="font-display">
                    {choir.choirDetails.choirName}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Average</label>
                  <div className="font-display">
                    {choir.totalAverage.toFixed(2)}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Position</label>
                  <div className="font-display">
                    {getOrdinalSuffix(choir.position)}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 text-center mb-6">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Criteria
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Threshold
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Average
                    </th>
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
                        <td className="font-display border border-gray-300 px-4 py-2">
                          {item.threshold} marks
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

            <div className="mb-6">
              <h3 className="font-heading text-lg font-semibold mb-4 text-center mt-4 md:mt-0">
                Judges&apos; Comments
              </h3>
              {Object.keys(choir.comments).map((judge, index) => (
                <div key={index} className="mb-4">
                  <label className="font-display block font-semibold mb-2 text-center md:text-left">
                    {judge}&apos;s Comments
                  </label>
                  <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                    {choir.comments[judge]}
                  </div>
                </div>
              ))}
            </div>

            <menu className="flex justify-end items-center gap-4">
              <Link
                href=""
                onClick={handleClose} // Call handleClose to reset the state
                className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
              >
                Close
              </Link>
            </menu>
          </div>
        ))}
      </div>
    </BlurBackground>
  );
}
