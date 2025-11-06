import { useMemo, useState } from "react";
import Header from "./components/Header";
import ApiForm from "./components/ApiForm";
import ApiList from "./components/ApiList";
import ActiveApi from "./components/ActiveApi";

// Utility to make ids
const uid = () => Math.random().toString(36).slice(2, 10);

export default function App() {
  const [apis, setApis] = useState(() => {
    try {
      const raw = localStorage.getItem("apis");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [activeId, setActiveId] = useState(() => {
    try {
      return localStorage.getItem("activeApiId") || "";
    } catch {
      return "";
    }
  });

  const activeApi = useMemo(() => apis.find((a) => a.id === activeId), [apis, activeId]);

  const persist = (nextApis, nextActiveId = activeId) => {
    setApis(nextApis);
    setActiveId(nextActiveId);
    try {
      localStorage.setItem("apis", JSON.stringify(nextApis));
      if (nextActiveId) localStorage.setItem("activeApiId", nextActiveId);
      else localStorage.removeItem("activeApiId");
    } catch {}
  };

  const handleAdd = ({ name, baseUrl }) => {
    // Enforce: remove before add. If an API is active, block addition.
    if (activeApi) return;
    const api = { id: uid(), name, baseUrl };
    const next = [api, ...apis];
    persist(next, api.id);
  };

  const handleRemove = (id) => {
    const next = apis.filter((a) => a.id !== id);
    const nextActive = activeId === id ? "" : activeId;
    persist(next, nextActive);
  };

  const handleSelect = (api) => {
    // Selecting sets it active only if none is active; if active exists, block.
    if (activeApi) return;
    persist(apis, api.id);
  };

  const clearActive = () => {
    persist(apis, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-6">
        <ActiveApi api={activeApi} onClear={clearActive} />

        <section className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Add API</h2>
            <ApiForm onAdd={handleAdd} disabled={!!activeApi} />
            {activeApi && (
              <p className="text-xs text-amber-400">You currently have an active API. Clear it before adding a new one.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your APIs</h2>
            <ApiList apis={apis} onRemove={handleRemove} onSelect={handleSelect} />
          </div>
        </section>
      </main>
    </div>
  );
}
