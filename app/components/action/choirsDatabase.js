import getFromDatabase from "./getFromDatabase";

export default async function choirsDatabase() {
  const themes = ["New Glory", "gratitude"];

  // Use Promise.all to await all database calls concurrently
  const allData = await Promise.all(
    themes.map((choir) => getFromDatabase(null, choir))
  );

  // Map themes to their respective data
  const dataWithThemes = themes.map((theme, index) => ({
    theme,
    data: allData[index],
  }));

  return dataWithThemes; // Returns an array of objects { theme, data }
}
