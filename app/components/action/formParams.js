"use server";

export default async function handleFormParams(
  formData,
  totalJudges,
  harvestTheme,
  sansEpisode
) {
  const data = {};

  // Loop to dynamically populate judge names
  Array.from(
    { length: totalJudges },
    (_, i) => (data[`judge${i + 1}`] = formData.get(`judge${i + 1}`))
  );

  // Add harvestTheme to the data object
  data.harvestTheme = harvestTheme;
  data.sansEpisode = sansEpisode;

  return data;
}
