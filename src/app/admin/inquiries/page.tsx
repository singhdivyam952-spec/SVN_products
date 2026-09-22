import { InquiriesClient } from "@/components/admin/InquiriesClient";
import { listInquiries } from "@/lib/store";

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiries();
  return (
    <div>
      <h1 className="font-serif text-3xl text-navy">Inquiries</h1>
      <p className="mt-2 text-sm text-muted">
        Wholesale requests from the contact form. Emails also go to the company
        inbox when Resend is configured.
      </p>
      <div className="mt-8">
        <InquiriesClient initial={inquiries} />
      </div>
    </div>
  );
}
