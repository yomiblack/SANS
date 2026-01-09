'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function UnauthorizedPage() {
  useEffect(() => {
    localStorage.removeItem("formdata");
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="mb-6 text-gray-600">
        You do not have permission to access this page.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-orange-500 text-white rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}
