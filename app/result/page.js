import choirsDatabase from "../components/action/choirsDatabase";
import ResultClient from "../components/result/resultClient";

export default async function Result() {
  const choirsByTheme = await choirsDatabase();
  return <ResultClient choirsByTheme={choirsByTheme} />;
}
