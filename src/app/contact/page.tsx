import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Element Tree",
  description:
    "Get in touch with Element Tree for maritime training, HRMS, LMS, and safety solutions.",
};

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container">
        <ContactPageClient />
      </div>
    </div>
  );
}
