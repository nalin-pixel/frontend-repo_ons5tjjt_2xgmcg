import React from 'react'

export default function NutritionSummary({ data }) {
  if (!data) return null

  const total = data.totalNutrients || {}
  const calories = Math.round(data.calories || 0)

  const items = [
    { key: 'FAT', label: 'Fat', unit: 'g' },
    { key: 'CHOCDF', label: 'Carbs', unit: 'g' },
    { key: 'PROCNT', label: 'Protein', unit: 'g' },
    { key: 'FIBTG', label: 'Fiber', unit: 'g' },
    { key: 'SUGAR', label: 'Sugar', unit: 'g' },
    { key: 'NA', label: 'Sodium', unit: 'mg' },
  ]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 backdrop-blur-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
        <div className="text-emerald-700 font-semibold">{calories} kcal</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map(({ key, label, unit }) => {
          const v = total[key]?.quantity || 0
          const u = total[key]?.unit || unit
          return (
            <div key={key} className="rounded-xl bg-white p-3 shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-lg font-semibold text-gray-800">
                {Math.round(v)} {u}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
