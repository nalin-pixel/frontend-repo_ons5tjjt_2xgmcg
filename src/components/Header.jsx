import React from 'react'
import { Apple, Salad } from 'lucide-react'

export default function Header() {
  return (
    <header className="py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
            <Salad className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nutrition Analyzer</h1>
            <p className="text-sm text-gray-500">Instant nutrition facts from your ingredients</p>
          </div>
        </div>
      </div>
    </header>
  )
}
