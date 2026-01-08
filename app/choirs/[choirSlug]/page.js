import { notFound } from "next/navigation";
import ChoirSummaryClient from "@/app/components/slug/choirSummaryClient";
import choirsDatabase from "@/app/components/action/choirsDatabase";

export async function generateMetadata({ params, searchParams }) {
  const currentPage =  params?.choirSlug;
  const cluster =  searchParams?.cluster;
  try {
    const data = await choirsDatabase();
    const themeIndex = data.findIndex((choir) => choir.theme === cluster);
    const foundCluster = data[themeIndex];
    const foundChoir = foundCluster.data.find(
      (choir) => choir._id === currentPage
    );

    const choirData = foundChoir?.choirDetails?.choirName || "Choir";

    return {
      title: `${choirData}'s Summary`,
      description: `${choirData}'s SANS Score Sheet Summary`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Choir Summary",
      description: "SANS Score Sheet Summary",
    };
  }
}

export default async function ChoirSummary({ params, searchParams }) {
  const currentPage = params?.choirSlug;
  const cluster = searchParams?.cluster;

  if (!cluster || !currentPage) notFound();

  return <ChoirSummaryClient currentPage={currentPage} cluster={cluster} />;
}
