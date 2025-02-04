// "use client";
// import { motion } from "framer-motion";

// export default function SidebarWrapper({ children, isSidebarOpen }) {
//   return (
//     <motion.aside
//       initial={{ x: "-100%", opacity: 0 }}
//       animate={{
//         x: isSidebarOpen ? "0%" : "0%",
//         opacity: isSidebarOpen ? 1 : "",
//         transition: { duration: 0.5, ease: "easeInOut" },
//       }}
//       exit={{ x: "-100%", opacity: 0 }}
//       className={`${
//         isSidebarOpen ? "block" : "hidden"
//         // isSidebarOpen ? "hidden" : "block"
//       } md:block  w-3/4 md:w-1/3 flex-col px-4 md:px-8 py-4 md:py-6 bg-stone-800 text-stone-50 text-xs md:text-sm sticky top-20 h-full md:h-screen z-40`}
//     >
//       {children}
//     </motion.aside>
//   );
// }

"use client";
import { motion } from "framer-motion";

export default function SidebarWrapper({ children, isSidebarOpen }) {
  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{
        x: isSidebarOpen ? "0%" : "-100%",
        opacity: isSidebarOpen ? 1 : 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ x: "-100%", opacity: 0 }}
      className={`fixed top-0 left-0 h-full w-3/4 md:w-1/3 bg-stone-800 text-stone-50 text-xs md:text-sm z-40 transform transition-transform duration-500 ease-in-out 
        ${isSidebarOpen ? "translate-x-0 " : "-translate-x-full"}`}
    >
      {children}
    </motion.aside>
  );
}
