import SideBarContent from "./sideBarContent";
import getFromDatabase from "./action/getFromDatabase";

export default async function SideBar({ currentPage }) {
  const choirs = await getFromDatabase(null, "gratitude");

  return (
    <aside className=" px-4 md:px-8 py-4 md:py-6 bg-stone-800 text-stone-50 text-xs md:text-sm rounded-br-lg sticky top-24 left-0 h-full">
      <h2 className="mb-4 md:mb-6 font-semibold md:font-bold uppercase text-sm md:text-lg text-orange-500 shadow-sm">
        Choirs
      </h2>
      {/* Pass data to client-side component */}
      <SideBarContent choirs={choirs} currentPage={currentPage} />
    </aside>
  );
}
