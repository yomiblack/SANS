import Link from "next/link";

export default function Button({
  route,
  children,
  onClick,
  type = "button",
  disabled,
}) {
  const buttonContent = (
    <button
      className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105 disabled:opacity-50"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return route ? <Link href={route}>{buttonContent}</Link> : buttonContent;
}
