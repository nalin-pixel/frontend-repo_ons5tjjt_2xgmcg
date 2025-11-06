import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Rocket className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">API Manager</h1>
          <p className="text-sm text-muted-foreground">Remove the old API before adding a new one — clean, controlled, and simple.</p>
        </div>
      </div>
    </header>
  );
}
