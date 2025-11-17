// src/app/admin/enquiries/page.tsx
import type { Metadata } from "next";
import EnquiriesAdminClient from "./EnquiriesAdminClient";

export const metadata: Metadata = {
  title: "Enquiries Admin | Element Tree",
  description: "View website contact enquiries submitted via Element Tree.",
};

export default function EnquiriesAdminPage() {
  return (
    <div className="section">
      <div className="container">
        <EnquiriesAdminClient />
      </div>
    </div>
  );
}
