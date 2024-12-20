import SideBarContent from "./sideBarContent";
import getFromDatabase from "./action/getFromDatabase";

export default async function SideBar({ currentPage }) {
  const choirs = await getFromDatabase(null, "gratitude");

  return (
    <aside className="flex flex-col px-4 md:px-8 py-4 md:py-6 bg-stone-800 text-stone-50 text-xs md:text-sm rounded-br-lg sticky top-24 left-0 h-full z-40">
      {/* Sidebar Header for mobile */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="font-semibold md:font-bold text-orange-500 text-sm md:text-lg">
          Choirs
        </h2>
        {/* You can add a button here for mobile to open/close sidebar */}
        {/* <button className="text-white">Menu</button> */}
      </div>

      {/* Sidebar Content */}
      <div className="md:block">
        <SideBarContent choirs={choirs} currentPage={currentPage} />
      </div>
    </aside>
  );
}
