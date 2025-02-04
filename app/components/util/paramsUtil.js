import choirsDatabase from "../action/choirsDatabase";
import getFromDatabase from "../action/getFromDatabase";

export default async function paramsUtil({ params }) {
  const currentPage = (await params?.choirSlug) || null; // Extract current page
  const themes = await choirsDatabase();

  const choirs = await getFromDatabase(currentPage, `${themes}`); // Fetch data
  return { choirs, currentPage };
}
