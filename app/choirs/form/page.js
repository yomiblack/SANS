import Link from "next/link";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import handleFormSubmit from "@/app/components/action/formSubmit";

export default function Form() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        className="w-full sm:w-3/4 bg-gray-50 p-6 sm:p-8 shadow-md rounded-md"
        // action={handleFormSubmit}
      >
        <h1 className="text-center text-2xl font-bold mb-4">
          SANS 2.0 SCORE SHEET
        </h1>
        <h2 className="text-center text-lg font-semibold mb-6">
          Choir Summary
        </h2>

        {/* Choir Details Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="w-full sm:w-1/2">
              <Input name="choirName" type="text">
                Choir Name
              </Input>
            </div>
            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-4">
              <Input name="duration" type="time">
                Duration
              </Input>
              <Input name="choirTotalNumber" type="number">
                Choir Total Number
              </Input>
              <Input name="choirBallotNumber" type="number">
                Choir Ballot Number
              </Input>
              <Input name="choirArrivalTime" type="time">
                Choir Arrival Time
              </Input>
            </div>
          </div>
        </div>

        {/* Score Table */}
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full border-collapse border border-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Criteria</th>
                <th className="border border-gray-300 px-4 py-2">Threshold</th>
                <th className="border border-gray-300 px-4 py-2">IgeSings</th>
                <th className="border border-gray-300 px-4 py-2">Frettic</th>
                <th className="border border-gray-300 px-4 py-2">Bambam</th>
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
              ].map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    {item.criteria}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.threshold} marks
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Input name={`igeSings_${item.criteria}`} type="number" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Input name={`frettic_${item.criteria}`} type="number" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Input name={`bambam_${item.criteria}`} type="number" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Judges' Comments */}
        <div className="mb-6">
          {["IgeSings", "Frettic", "Bambam"].map((judge, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`comment_${index}`}
                className="block font-semibold mb-2"
              >
                {judge}&apos;s Comments
              </label>
              <textarea
                id={`comment_${index}`}
                name={`comment_${index}`}
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={`Enter ${judge}'s comments here`}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-4 mt-6">
          <Link
            href="/choirs"
            className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
          >
            Cancel
          </Link>
          <Button route="/choirs" type="submit" label="Save">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
