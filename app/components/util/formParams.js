"use client";

import Link from "next/link";
import Button from "@/app/components/button/button";
import { useState, useEffect } from "react";
import Input from "@/app/components/input/input";
import handleFormParams from "@/app/components/action/formParams";
import FormParamsInput from "@/app/components/input/formParamsInput";
import { redirect } from "next/navigation";
import BlurBackground from "./blurBackground";

export default function FormParameters({ setIsFormParams }) {
  const [data, setData] = useState(null); // Persist data
  const [numberOfJudges, setNumberOfJudges] = useState("");
  const [harvestTheme, setHarvestTheme] = useState("");
  const [sansEpisode, setSansEpisode] = useState("");

  const activeClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700";

  let totalJudges;
  if (numberOfJudges) {
    totalJudges = Number(numberOfJudges);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await handleFormParams(
      formData,
      totalJudges,
      harvestTheme,
      sansEpisode
    );
    setData(result); // Save the data
  }

  //reroute to Form
  if (data) {
    localStorage.setItem("formdata", JSON.stringify(data));
    redirect("/choirs/form");
  }

  useEffect(() => {
    // Debugging data persistence
    // console.log("Persisted data:", data);
  }, [data]);

  {
    return (
      <BlurBackground>
        <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8 overflow-y-auto max-h-screen m-2 md:m-2">
          <form className="text-sm" onSubmit={handleSubmit}>
            <h1 className="text-center text-lg font-bold mb-4 block">
              SANS SCORE SHEET PARAMETERS
            </h1>

            <div className="space-y-6 w-full">
              {/* Row 1: Harvest Theme and SANS Episode */}
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <FormParamsInput
                    type="text"
                    name="Harvest Theme"
                    activeClass={activeClass}
                    setHarvestTheme={setHarvestTheme}
                    placeholder="Harvest theme"
                  />
                </div>
                <div className="flex-1">
                  <FormParamsInput
                    type="number"
                    name="SANS Episode"
                    activeClass={activeClass}
                    setSansEpisode={setSansEpisode}
                    placeholder="SANS episode"
                  />
                </div>
              </div>

              {/* Row 2: Number of Judges */}
              <div className="flex flex-col">
                <FormParamsInput
                  type="number"
                  name="Number of Judges"
                  setNumberOfJudges={setNumberOfJudges}
                  activeClass={activeClass}
                  placeholder="Number of judges (max. 5)"
                />
              </div>
            </div>

            {numberOfJudges &&
              Array.from({ length: totalJudges }, (_, i) => (
                <Input key={`judge${i + 1}`} name={`judge${i + 1}`} type="text">
                  {`Judge ${i + 1}`}
                </Input>
              ))}

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-4 mt-6">
              <Link
                href="/choirs"
                onClick={() => setIsFormParams((prev) => !prev)}
                className="text-orange-700 hover:text-orange-800 hover:shadow-sm"
              >
                Cancel
              </Link>
              <Button route="" type="submit" label="Save">
                Save
              </Button>
            </div>
          </form>
        </div>
      </BlurBackground>
    );
  }
}
