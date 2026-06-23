const industries = [
  {
    name: 'Healthcare',
    iconPath: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  },
  {
    name: 'Finance',
    iconPath: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    name: 'Retail & E-commerce',
    iconPath: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  },
  {
    name: 'Manufacturing',
    iconPath: 'M11.42 15.17l-5.1-3.94a.75.75 0 01-.18-.85l2.1-4.2a.75.75 0 01.67-.42h6.18a.75.75 0 01.67.42l2.1 4.2a.75.75 0 01-.18.85l-5.1 3.94a.75.75 0 01-.92 0zM12 2.25v3M4.5 9.75H3m18 0h-1.5M6.75 6.75L5.636 5.636M17.25 6.75l1.114-1.114',
  },
  {
    name: 'Logistics',
    iconPath: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375m11.25-4.5V6.375a1.125 1.125 0 00-1.125-1.125H3.375a1.125 1.125 0 00-1.125 1.125v11.25m18-6.75h-1.5m0 0h-5.625a1.125 1.125 0 00-1.125 1.125v5.625m6.75-6.75V8.25m0 0h1.5a1.125 1.125 0 011.125 1.125v1.5',
  },
  {
    name: 'Education',
    iconPath: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
]

export default function TrustedBy() {
  return (
    <section className="py-12 border-y border-surface-800/30">
      <div className="container-xl">
        <p className="text-center text-xs text-surface-500 uppercase tracking-widest font-semibold mb-8">
          Trusted by businesses across industries
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {industries.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5 text-surface-500 hover:text-surface-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
              </svg>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
