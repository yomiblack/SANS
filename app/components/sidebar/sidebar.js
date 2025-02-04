"use client";
import { motion } from "framer-motion";
import SideBarContent from "./sideBarContent";

export default function SideBar({
  choirsByTheme,
  toggleSidebar,
  isSidebarOpen,
}) {
  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: "0%",
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ x: "-100%", opacity: 0 }}
      className="p-2 md:p-4 bg-stone-800 text-stone-50 text-xs md:text-sm h-full"
    >
      <h2 className="font-heading font-semibold md:font-bold text-orange-500 text-sm md:text-lg mb-3">
        Choirs
      </h2>
      <SideBarContent
        choirsByTheme={choirsByTheme}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </motion.aside>
  );
}
