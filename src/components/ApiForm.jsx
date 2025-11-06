import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function ApiForm({ onAdd, disabled }) {
  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const valid = name.trim() && /^https?:\/\//i.test(baseUrl.trim());

  const submit = (e) => {
    e.preventDefault();
    if (!valid || disabled) return;
    onAdd({ name: name.trim(), baseUrl: baseUrl.trim() });
    setName("");
    setBaseUrl("");
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
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Base URL</label>
        <input
          className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://api.example.com"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!valid || disabled}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="h-5 w-5" /> Add API
      </button>
    </form>
  );
}
