// Connector: Generic export
//
// Fallback for any company/division that doesn't have a dedicated
// connector yet. Same contract as inspira-ledger.js — swap the mock
// for a real fetch (an API call, a static JSON export, a CSV parse)
// whenever that company's system is ready to report numbers.

async function fetchGenericExportSummary(company) {
  return {
    status: "stale",
    lastSynced: null,
    metrics: {
      pendapatan: 0,
      beban: 0,
      labaRugi: 0,
      kas: 0
    }
  };
}
