// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSession() {
      const res = await fetch("/api/admin/check-session");
      const data = await res.json();
      setAuthorized(data.active);
    }
    checkSession();
  }, []);

  if (authorized === null) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 font-semibold">Not authorized.</p>
        <a
          href="/admin/login"
          className="text-blue-600 underline text-sm mt-4 inline-block"
        >
          Go to Login
        </a>
      </div>
    );
  }

  // If authorized = true → load actual admin UI
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Element Tree Admin</h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-700 mb-4">Welcome to your admin dashboard.</p>

        <div className="flex gap-4 mt-4">
          <a
            href="/admin/enquiries"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            View Enquiries
          </a>

          <a
            href="/admin/login"
            onClick={async (e) => {
              e.preventDefault();
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
