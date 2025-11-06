import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function ApiForm({ onAdd, disabled }) {
  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const valid = name.trim() && /^https?:\/\//i.test(baseUrl.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || disabled || loading) return;

    setMessage(null);
    setLoading(true);
    try {
      const backend = import.meta.env.VITE_BACKEND_URL || "";
      if (!backend) {
        setMessage({ type: "error", text: "Backend URL is not configured (VITE_BACKEND_URL)." });
        setLoading(false);
        return;
      }

      const res = await fetch(`${backend}/api/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseUrl: baseUrl.trim(), path: "/api/hello", method: "GET" }),
      });

      if (!res.ok) {
        const t = await res.text();
        setMessage({ type: "error", text: `Validation request failed: ${t.slice(0, 200)}` });
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.ok) {
        onAdd({ name: name.trim(), baseUrl: baseUrl.trim() });
        setMessage({ type: "success", text: `Validated in ${data.time_ms ?? "-"}ms (status ${data.status}).` });
        setName("");
        setBaseUrl("");
      } else {
        setMessage({ type: "error", text: data.error || `API is not reachable (status ${data.status ?? "-"}).` });
      }
    } catch (err) {
      setMessage({ type: "error", text: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border bg-card text-card-foreground shadow p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">API Name</label>
        <input
          className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="My Service"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Base URL</label>
        <input
          className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://api.example.com"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          disabled={loading}
        />
      </div>

      {message && (
        <div
          className={`text-sm ${
            message.type === "error" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={!valid || disabled || loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="h-5 w-5" /> {loading ? "Validating..." : "Add API"}
      </button>
    </form>
  );
}
