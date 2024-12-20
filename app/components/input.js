export default function Input({ children, name, type }) {
  const activeClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700";

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {children}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className={activeClass}
      />
    </div>
  );
}
