import { useState } from 'react'
import { Leaf, Loader2 } from 'lucide-react'

export default function IngredientForm({ onAnalyze, loading }) {
  const [input, setInput] = useState('1 cup rice\n2 eggs\n1 tbsp olive oil')

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = input
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
    if (lines.length === 0) return
    onAnalyze(lines)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <label className="block text-sm font-medium text-gray-700">Ingredients</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="One ingredient per line, e.g. '1 cup rice'"
        rows={6}
        className="w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm p-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-emerald-100"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Leaf className="h-4 w-4" /> Analyze Nutrition
          </>
        )}
      </button>
    </form>
  )
}
