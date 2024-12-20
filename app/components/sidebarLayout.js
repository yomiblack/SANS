import SideBar from "./sidebar";
import HamburgerMenu from "./hamburgerMenu";

export default function SidebarLayout({ choirs, currentPage, children }) {
  return (
    <div className="flex relative">
      <HamburgerMenu>
        <SideBar choirs={choirs} currentPage={currentPage} />
      </HamburgerMenu>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
