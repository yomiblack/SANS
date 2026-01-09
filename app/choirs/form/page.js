"use client";
import Link from "next/link";
import Input from "@/app/components/input/input";
import Button from "@/app/components/button/button";
import handleFormSubmit from "@/app/components/action/formSubmit";
import AnimateWrap from "@/app/components/util/animateWrap";
import Textarea from "@/app/components/input/textarea";
import { metrics } from "@/app/components/util/form/metrics";
import { UseUIStore } from "@/app/store/uiStore";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";



export default function Form() {
  const [data, setData] = useState(null);
  const hasInitialized = useRef(false);

  const disableSignin = UseUIStore((state) => state.disableSignin);
  const enableSignin = UseUIStore((state) => state.enableSignin);

  const closeAddChoir = UseUIStore((state) => state.closeAddChoir);

  const router = useRouter();
  // useEffect(() => {
  //   closeAddChoir();
  //   disableSignin();

  //   const storedData = localStorage.getItem("formdata");
  //   if (!storedData) {
  //     setData(null);
  //     return;
  //   }

  //   setData(JSON.parse(storedData));
  // }, []);


  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    closeAddChoir();
    disableSignin();

    const storedData = localStorage.getItem("formdata");

    if (!storedData) {
      router.replace("/choirs"); // ✅ no history pollution
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      setData(parsed);
      localStorage.removeItem("formdata"); // ✅ safe now
    } catch {
      router.replace("/choirs");
    }
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();


    const formData = new FormData(event.target);
    const harvestTheme = data.harvestTheme; // Extracting data correctly

    // localStorage.removeItem("formdata");

    event.target.reset();
    // enableSignin();
    await handleFormSubmit(formData, harvestTheme);
  }

  let judges;

  if (!data) return null;

  if (data) {
    judges = Object.keys(data)
      .filter((key) => key.startsWith("judge"))
      .map((key) => data[key]);
  }

  if (data)
    return (
      <AnimateWrap>
        <form
          className="w-full sm:w-3/4 bg-gray-50 p-6 sm:p-8 shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="font-display text-center text-2xl font-bold mb-4">
            {`SANS ${data.sansEpisode}.0 SCORE SHEET`}
          </h1>
          <h2 className="font-heading text-center text-lg font-semibold mb-6">
            Choir Summary
          </h2>

          {/* Choir Details Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-full sm:w-1/2">
                <Input name="choirName" type="text" placeholder='Name of choir'>
                  choir name
                </Input>
              </div>
              <div className="w-full sm:w-1/2 grid grid-cols-2 gap-4 text-sm whitespace-nowrap">
                <Input name="duration" type="text" placeholder='MM:SS'>
                  performance duration
                </Input>
                <Input name="choirTotalNumber" type="number" placeholder='Number of choristers'>
                  total number
                </Input>
                <Input name="choirBallotNumber" type="number" placeholder='Choir ballot number'>
                  ballot number
                </Input>
                <Input name="choirArrivalTime" type="time">
                  arrival time
                </Input>
              </div>
            </div>
          </div>

          {/* Score Table */}
          <div className="overflow-x-auto mb-6">
            <table className="table-auto w-full border-collapse border border-gray-200 text-center">
              <thead className="bg-gray-100">
                <tr className="font-heading">
                  <th className="border border-gray-300 px-4 py-2">Criteria</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Threshold
                  </th>
                  {judges.map((judge, index) => (
                    <th
                      key={index}
                      className="capitalize whitespace-nowrap border border-gray-300 px-4 py-2"
                    >
                      {judge}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      {item.criteria}
                    </td>
                    <td className="font-display border border-gray-300 px-4 py-2">
                      {item.threshold} marks
                    </td>
                    {judges.map((judge, judgeIndex) => (
                      <td
                        key={judgeIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        <Input
                          name={`${judge}_${item.criteria}`}
                          type="number"
                          max={item.threshold}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Judges' Comments */}
          <Textarea judges={judges} />

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <Link
              href="/choirs"
              className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
            >
              Cancel
            </Link>
            <Button route="" type="submit" label="Save">
              Save
            </Button>
          </div>
        </form>
      </AnimateWrap>
    );
}
