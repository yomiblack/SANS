import Link from "next/link";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import handleFormSubmit from "@/app/components/action/formSubmit";

export default function Form() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        className="w-3/4 bg-gray-50 p-8 shadow-md"
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
          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <Input name="choirName" type="text">
                Choir Name
              </Input>
            </div>
            <div className="w-1/2 grid grid-cols-2 gap-4">
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
        <table className="table-auto w-full border-collapse border border-gray-200 mb-6 text-center">
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
              { criteria: "Music Production and Arrangements", threshold: 20 },
              { criteria: "Theme Interpretation", threshold: 10 },
              { criteria: "Hymnal", threshold: 10 },
              { criteria: "Appearance and Discipline", threshold: 10 },
              { criteria: "Choreography and Audience Ovation", threshold: 10 },
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
                placeholder={`Enter ${judge}&apos;s comments here`}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <menu className="flex justify-end items-center gap-4">
          <Link
            href="/choirs"
            className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
          >
            Cancel
          </Link>
          <Button route="/choirs" type="submit" label="Save">
            Save
          </Button>
        </menu>
      </form>
    </div>
  );
}

// or this for input sanitization

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Input from "@/app/components/input";
// import Button from "@/app/components/button";

// export default function Form() {
//   const [scores, setScores] = useState({});

//   // Criteria and thresholds
//   const criteriaData = [
//     { criteria: "Originality", threshold: 15 },
//     { criteria: "Melody and Lyrics", threshold: 15 },
//     { criteria: "Music Production and Arrangements", threshold: 20 },
//     { criteria: "Theme Interpretation", threshold: 10 },
//     { criteria: "Hymnal", threshold: 10 },
//     { criteria: "Appearance and Discipline", threshold: 10 },
//     { criteria: "Choreography and Audience Ovation", threshold: 10 },
//     { criteria: "Lead Vocalist Delivery", threshold: 10 },
//   ];

//   // Handle score input
//   const handleInputChange = (criteria, judge, value) => {
//     const numericValue = parseInt(value, 10);

//     // Validate against the threshold
//     const validValue =
//       isNaN(numericValue) ||
//       numericValue <=
//         criteriaData.find((item) => item.criteria === criteria).threshold
//         ? numericValue
//         : scores[`${judge}_${criteria}`] || ""; // Revert to previous value if invalid

//     setScores((prev) => ({
//       ...prev,
//       [`${judge}_${criteria}`]: validValue,
//     }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         className="w-3/4 bg-gray-50 p-8 rounded-lg shadow-md"
//         // Uncomment when ready to handle submit
//         // onSubmit={handleFormSubmit}
//       >
//         <h1 className="text-center text-2xl font-bold mb-4">
//           SANS 2.0 SCORE SHEET
//         </h1>
//         <h2 className="text-center text-lg font-semibold mb-6">
//           Choir Summary
//         </h2>

//         {/* Choir Details Section */}
//         <div className="mb-6">
//           <div className="flex gap-4 justify-between">
//             <div className="w-1/2">
//               <Input name="choirName" type="text">
//                 Choir Name
//               </Input>
//             </div>
//             <div className="w-1/2 grid grid-cols-2 gap-4">
//               <Input name="duration" type="time">
//                 Duration
//               </Input>
//               <Input name="choirTotalNumber" type="number">
//                 Choir Total Number
//               </Input>
//               <Input name="choirBallotNumber" type="number">
//                 Choir Ballot Number
//               </Input>
//               <Input name="choirArrivalTime" type="time">
//                 Choir Arrival Time
//               </Input>
//             </div>
//           </div>
//         </div>

//         {/* Score Table */}
//         <table className="table-auto w-full border-collapse border border-gray-200 mb-6 text-center">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Criteria</th>
//               <th className="border border-gray-300 px-4 py-2">Threshold</th>
//               <th className="border border-gray-300 px-4 py-2">IgeSings</th>
//               <th className="border border-gray-300 px-4 py-2">Frettic</th>
//               <th className="border border-gray-300 px-4 py-2">Bambam</th>
//             </tr>
//           </thead>
//           <tbody>
//             {criteriaData.map((item, index) => (
//               <tr key={index} className="bg-white">
//                 <td className="border border-gray-300 px-4 py-2 text-left">
//                   {item.criteria}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {item.threshold} marks
//                 </td>
//                 {["IgeSings", "Frettic", "Bambam"].map((judge) => (
//                   <td key={judge} className="border border-gray-300 px-4 py-2">
//                     <Input
//                       name={`${judge}_${item.criteria}`}
//                       type="number"
//                       value={scores[`${judge}_${item.criteria}`] || ""}
//                       onChange={(e) =>
//                         handleInputChange(item.criteria, judge, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Judges' Comments */}
//         <div className="mb-6">
//           {["IgeSings", "Frettic", "Bambam"].map((judge, index) => (
//             <div key={index} className="mb-4">
//               <label
//                 htmlFor={`comment_${index}`}
//                 className="block font-semibold mb-2"
//               >
//                 {judge}'s Comments
//               </label>
//               <textarea
//                 id={`comment_${index}`}
//                 name={`comment_${index}`}
//                 rows="3"
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder={`Enter ${judge}'s comments here`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <menu className="flex justify-end items-center gap-4">
//           <Link
//             href="/choirs"
//             className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
//           >
//             Cancel
//           </Link>
//           <Button route="/choirs" type="submit" label="Save">
//             Save
//           </Button>
//         </menu>
//       </form>
//     </div>
//   );
// }
