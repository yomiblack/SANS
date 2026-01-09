"use server";
import { redirect } from "next/navigation";
import saveToDatabase from "./saveToDatabase";

export default async function handleFormSubmit(formData, harvestTheme) {
  const entries = Object.fromEntries(formData.entries());

  // Extract judges dynamically from form data, excluding "comment_" keys
  const judgeNames = new Set();
  Object.keys(entries).forEach((key) => {
    const match = key.match(/^(.*?)_/); // Extract judge name before underscore
    if (match && !key.startsWith("comment_")) {
      judgeNames.add(match[1]);
    }
  });

  const judges = Array.from(judgeNames);

  // Define criteria dynamically
  const criteria = new Set();
  Object.keys(entries).forEach((key) => {
    const match = key.match(/_(.*)$/); // Extract criteria after underscore
    if (match && !key.startsWith("comment_")) {
      // Ensure we're not adding comment keys
      criteria.add(match[1]);
    }
  });

  const criteriaList = Array.from(criteria);

  // Build criteria data dynamically
  const data = {};
  criteriaList.forEach((criterion) => {
    data[criterion] = judges.map(
      (judge) => Number(entries[`${judge}_${criterion}`]) || 0
    );
  });

  const comments = {};

  // Ensure we correctly map comment_X to the right judge name
  judges.forEach((judge, index) => {
    const commentKey = `comment_${index}`; // Match comment_0, comment_1, etc.
    if (entries.hasOwnProperty(commentKey)) {
      comments[judge] = entries[commentKey]; // Assign correct value
    }
  });

  // Construct final object for database storage
  try {
    const finalData = {
      choirDetails: {
        choirName: entries["choirName"] || "",
        duration: entries["duration"] || "",
        choirTotalNumber: Number(entries["choirTotalNumber"]) || 0,
        choirBallotNumber: Number(entries["choirBallotNumber"]) || 0,
        choirArrivalTime: entries["choirArrivalTime"] || "",
      },
      criteria: data, // Scores for each criterion
      comments, // Judges' comments
    };

    //break submission until next event
    // return;

    // Save data to the database
    const result = await saveToDatabase(finalData, harvestTheme);

    if (!result.success) {
      throw new Error(result.error);
    }

  } catch (error) {
    console.error("Error saving form data:", error);
    throw error;
  }

  redirect("/choirs/form");
}
