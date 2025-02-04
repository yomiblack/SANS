export default function HeaderMenu({ toggleMenu }) {
  return (
    <div className="md:hidden " onClick={toggleMenu}>
      <button className="text-stone-500 p-2">
        <span className="block w-6 h-1 bg-stone-900 mb-1"></span>
        <span className="block w-6 h-1 bg-stone-900 mb-1"></span>
        <span className="block w-6 h-1 bg-stone-900"></span>
      </button>
    </div>
  );
}
