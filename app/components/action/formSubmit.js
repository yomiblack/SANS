"use server";
import { redirect } from "next/navigation";
import saveToDatabase from "./saveToDatabase";
//install mongodb

export default async function handleFormSubmit(formData) {
  // const client = await MongoClient.connect(process.env.MONGODB_URI);

  // Define criteria
  const criteria = [
    "Originality",
    "Melody and Lyrics",
    "Music Production and Arrangements",
    "Theme Interpretation",
    "Hymnal",
    "Appearance and Discipline",
    "Choreography and Audience Ovation",
    "Lead Vocalist Delivery",
  ];

  //Build data object for each criterion
  const data = {};
  criteria.forEach((criterion) => {
    data[criterion] = [
      Number(formData.get(`igeSings_${criterion}`)),
      Number(formData.get(`frettic_${criterion}`)),
      Number(formData.get(`bambam_${criterion}`)),
    ];
  });

  //Judge's comments
  const comments = {
    IgeSings: formData.get("comment_0"),
    Frettic: formData.get("comment_1"),
    Bambam: formData.get("comment_2"),
  };

  //Final object for database storage
  try {
    const finalData = {
      choirDetails: {
        choirName: formData.get("choirName"),
        duration: formData.get("duration"),
        choirTotalNumber: Number(formData.get("choirTotalNumber")),
        choirBallotNumber: Number(formData.get("choirBallotNumber")),
        choirArrivalTime: formData.get("choirArrivalTime"),
      },
      criteria: data, // scores for each criterion
      comments, // judges' comments
    };

    // Save data to the database
    const result = await saveToDatabase(finalData);

    //try and catch error here
    if (result) {
      console.log("FinalData", result);
      redirect("/choirs");
    } else {
      throw new Error("Failed to save Data");
    }
  } catch (error) {
    throw error;
  }
}
