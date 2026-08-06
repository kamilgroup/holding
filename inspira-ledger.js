// Connector: Inspira Ledger (accounting app)
//
// Job of every connector: return a small, read-only SUMMARY object.
// The dashboard never touches the source app's database or logic directly —
// it only asks the connector for numbers already computed by that app.
//
// Replace the mock block below with a real call once Inspira Ledger exposes
// a summary endpoint or a scheduled export (e.g. a small JSON file it writes
// to its own repo, or a lightweight API route). Nothing else in the
// dashboard needs to change when you do this swap — the shape of the
// returned object is the contract.

async function fetchInspiraLedgerSummary(company) {
  // --- MOCK DATA (remove when a real endpoint exists) ---
  return {
    status: "ok", // "ok" | "stale" | "error"
    lastSynced: new Date().toISOString(),
    metrics: {
      pendapatan: 42500000,
      beban: 18750000,
      labaRugi: 23750000,
      kas: 61200000
    }
  };

  // --- REAL VERSION (example) ---
  // const res = await fetch(`${company.baseUrl}/export/summary.json`);
  // if (!res.ok) return { status: "error", lastSynced: null, metrics: null };
  // const data = await res.json();
  // return { status: "ok", lastSynced: data.generatedAt, metrics: data.metrics };
}
