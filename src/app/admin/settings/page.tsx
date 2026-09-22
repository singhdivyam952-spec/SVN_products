import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/store";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-serif text-3xl text-navy">Site settings</h1>
      <p className="mt-2 text-sm text-muted">
        Update company details shown on About, Contact, and footer.
      </p>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
