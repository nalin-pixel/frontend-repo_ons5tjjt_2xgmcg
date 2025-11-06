import React from 'react'

function Row({ label, total, daily }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 text-gray-700">{label}</td>
      <td className="py-2 text-right text-gray-900 font-medium">{total}</td>
      <td className="py-2 text-right text-emerald-700">{daily}</td>
    </tr>
  )
}

export default function NutrientTable({ data }) {
  if (!data) return null
  const total = data.totalNutrients || {}
  const daily = data.totalDaily || {}

  const get = (key, digits = 1) => {
    const t = total[key]
    const d = daily[key]
    const tStr = t ? `${t.quantity.toFixed(digits)} ${t.unit}` : '-'
    const dStr = d ? `${d.quantity.toFixed(0)}%` : '-'
    return { tStr, dStr }
  }

  const lines = [
    ['ENERC_KCAL', 'Calories'],
    ['FAT', 'Total Fat'],
    ['FASAT', 'Saturated Fat'],
    ['CHOCDF', 'Carbohydrates'],
    ['FIBTG', 'Fiber'],
    ['SUGAR', 'Sugars'],
    ['PROCNT', 'Protein'],
    ['NA', 'Sodium'],
    ['CA', 'Calcium'],
    ['FE', 'Iron'],
    ['K', 'Potassium'],
    ['VITC', 'Vitamin C'],
  ]

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 backdrop-blur-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-2">Nutrient</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2 text-right">Daily</th>
            </tr>
          </thead>
          <tbody>
            {lines.map(([key, label]) => {
              const { tStr, dStr } = get(key)
              return <Row key={key} label={label} total={tStr} daily={dStr} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
