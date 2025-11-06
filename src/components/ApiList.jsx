import { Trash2, Plus } from "lucide-react";

export default function ApiList({ apis, onRemove, onSelect }) {
  if (!apis.length) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
        <p className="text-sm text-muted-foreground">No APIs added yet. Add your first one to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {apis.map((api) => (
        <div
          key={api.id}
          className="rounded-xl border bg-card text-card-foreground shadow p-4 flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="font-medium">{api.name}</span>
            <span className="text-xs text-muted-foreground">{api.baseUrl}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(api)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              <Plus className="h-4 w-4" /> Use
            </button>
            <button
              onClick={() => onRemove(api.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-sm hover:opacity-90 transition"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
