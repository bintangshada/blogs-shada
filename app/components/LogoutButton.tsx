"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}