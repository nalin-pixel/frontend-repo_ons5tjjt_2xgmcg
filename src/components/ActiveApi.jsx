import { Database, XCircle } from "lucide-react";

export default function ActiveApi({ api, onClear }) {
  if (!api) return null;
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex items-start gap-3">
      <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
        <Database className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Active API</h3>
            <p className="text-sm text-muted-foreground">{api.name} — {api.baseUrl}</p>
          </div>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/70"
          >
            <XCircle className="h-4 w-4" /> Clear
          </button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">You must clear the active API before adding a new one. This ensures you remove the old configuration first.</p>
      </div>
    </div>
  );
}
