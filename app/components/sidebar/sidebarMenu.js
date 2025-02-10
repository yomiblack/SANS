"use client";

export default function SidebarMenu({ toggleSidebar }) {
  return (
    <div className="md:hidden" onClick={toggleSidebar}>
      <button className="text-stone-500 p-2">
        <span className="block w-6 h-1 bg-stone-900 mb-1"></span>
        <span className="block w-5 h-1 bg-stone-900 mb-1"></span>
        <span className="block w-4 h-1 bg-stone-900"></span>
      </button>
    </div>
  );
}
