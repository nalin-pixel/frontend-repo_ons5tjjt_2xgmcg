import { useState } from 'react'
import Header from './components/Header'
import IngredientForm from './components/IngredientForm'
import NutritionSummary from './components/NutritionSummary'
import NutrientTable from './components/NutrientTable'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [cache, setCache] = useState('')

  const analyze = async (ingredients) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/nutrition/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
        throw new Error(typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail))
      }

      const data = await res.json()
      setResult(data.data)
      setCache(data.cache)
    } catch (e) {
      setError(e.message || 'Failed to analyze ingredients')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <IngredientForm onAnalyze={analyze} loading={loading} />
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}
            {cache && (
              <div className="text-xs text-gray-500">Cache: {cache}</div>
            )}
          </div>
          <div className="space-y-4">
            <NutritionSummary data={result} />
            <NutrientTable data={result} />
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-xs text-gray-500">
        Built with Edamam Nutrition API
      </footer>
    </div>
  )
}

export default App
