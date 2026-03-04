const items = [
  { value: '50+', label: 'Dashboards Built' },
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Happy Clients' },
  { value: '10M+', label: 'Data Rows Processed' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '40%', label: 'Avg. Reporting Time Saved' },
]

export default function MarqueeBanner() {
  const doubled = [...items, ...items]

  return (
    <div className="relative border-y border-surface-800/50 bg-surface-900/30 py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center mx-8 md:mx-12">
            <span className="text-lg md:text-xl font-bold text-gradient mr-2">{item.value}</span>
            <span className="text-sm text-surface-400 font-medium">{item.label}</span>
            <span className="ml-8 md:ml-12 text-surface-700">/</span>
          </div>
        ))}
      </div>
    </div>
  )
}
