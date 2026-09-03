import type { Metadata } from "next";
import { getSql, type Enquiry } from "@/lib/db";
import { isAuthed, logout } from "./actions";
import { LoginForm } from "./LoginForm";
import { programs } from "@/data/site";

export const metadata: Metadata = { title: "Lead inbox", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  if (!(await isAuthed())) return <LoginForm />;

  const sql = getSql();
  let rows: Enquiry[] = [];
  let error: string | null = null;

  if (!sql) {
    error = "DATABASE_URL is not configured, so no enquiries can be read.";
  } else {
    try {
      rows = (await sql`
        select id, name, phone, program, goal, message, created_at
        from enquiries order by created_at desc limit 200
      `) as Enquiry[];
    } catch (e) {
      error = e instanceof Error ? e.message : "Could not read enquiries.";
    }
  }

  const label = (slug: string | null) =>
    slug ? (programs.find((p) => p.slug === slug)?.name ?? slug) : "—";

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="display text-4xl text-steel">Lead inbox</h1>
          <p className="mt-1.5 text-sm text-smoke">
            {rows.length} {rows.length === 1 ? "enquiry" : "enquiries"}, newest first.
          </p>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-ink-line px-5 py-2.5 text-sm font-medium text-steel hover:border-smoke/50">
            Sign out
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-8 rounded-lg border border-flame-red/40 bg-flame-red/10 p-4 text-sm text-steel">{error}</p>
      )}

      {!error && rows.length === 0 && (
        <p className="mt-8 rounded-lg border border-ink-line bg-ink-raised p-6 text-sm text-smoke">
          No enquiries yet.
        </p>
      )}

      {rows.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-xl border border-ink-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-ink-raised text-xs uppercase tracking-[0.15em] text-smoke">
              <tr>
                {["When", "Name", "Phone", "Program", "Goal", "Message"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {rows.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3.5 text-smoke">
                    {new Date(r.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-steel">{r.name}</td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <a href={`tel:${r.phone}`} className="text-signal-yellow hover:underline">
                      {r.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-steel/80">{label(r.program)}</td>
                  <td className="px-4 py-3.5 text-steel/80">{r.goal ?? "—"}</td>
                  <td className="max-w-xs px-4 py-3.5 text-smoke">{r.message ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
