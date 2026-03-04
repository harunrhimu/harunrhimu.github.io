export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-xl">
        <div className="mb-14">
          <p className="label mb-3">Who I Am</p>
          <h2 className="heading-md">
            Turning Raw Data Into
            <span className="text-gradient"> Business Intelligence</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {/* Bio - large card spanning 2 cols */}
          <div className="col-span-2 row-span-2 glass p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-4">About Me</h3>
              <p className="text-surface-400 leading-relaxed mb-4">
                I'm a passionate <span className="text-white font-medium">Microsoft Fabric</span> enthusiast,{' '}
                <span className="text-white font-medium">Power BI Developer</span>, and{' '}
                <span className="text-white font-medium">Data Analyst</span> with expertise in building
                end-to-end analytics solutions — from Lakehouse architecture to interactive dashboards that drive business decisions.
              </p>
              <p className="text-surface-400 leading-relaxed">
                With a strong foundation in SQL, Python, DAX, and the Microsoft Fabric ecosystem, I build
                complete data platforms — spanning data ingestion, transformation, modeling, and
                compelling reports. Currently preparing for DP-600 & DP-700 certifications.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-surface-700/40">
              <img src="/harunrhimu.jpg" alt="Harun" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-white">Md Harun Or Roshid</p>
                <p className="text-xs text-surface-500">Fabric & BI Professional</p>
              </div>
            </div>
          </div>

          {/* Stats - top right */}
          <div className="glass p-6 flex flex-col justify-center items-center text-center group hover:bg-surface-800/40 transition-all">
            <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-1 group-hover:scale-110 transition-transform">50+</p>
            <p className="text-xs text-surface-400 font-medium">Dashboards Built</p>
          </div>
          <div className="glass p-6 flex flex-col justify-center items-center text-center group hover:bg-surface-800/40 transition-all">
            <p className="text-3xl md:text-4xl font-extrabold text-gradient-warm mb-1 group-hover:scale-110 transition-transform">20+</p>
            <p className="text-xs text-surface-400 font-medium">Happy Clients</p>
          </div>

          {/* Quick Info cards */}
          <div className="glass p-5">
            <p className="text-[10px] text-surface-500 uppercase tracking-widest mb-2 font-semibold">Location</p>
            <p className="text-sm text-white font-medium">Dhaka, Bangladesh</p>
          </div>
          <div className="glass p-5">
            <p className="text-[10px] text-surface-500 uppercase tracking-widest mb-2 font-semibold">Education</p>
            <p className="text-sm text-white font-medium">B.Sc. in CSE</p>
          </div>

          {/* Data pipeline visual - wide card */}
          <div className="col-span-2 md:col-span-4 glass p-6">
            <p className="text-[10px] text-surface-500 uppercase tracking-widest mb-5 font-semibold">My Approach</p>
            <div className="flex items-center justify-between gap-2 overflow-x-auto">
              {[
                { step: '01', label: 'Discover', desc: 'Understand business needs', color: 'brand' },
                { step: '02', label: 'Extract', desc: 'Gather & connect data', color: 'brand' },
                { step: '03', label: 'Transform', desc: 'Clean & model data', color: 'warm' },
                { step: '04', label: 'Visualize', desc: 'Build dashboards', color: 'warm' },
                { step: '05', label: 'Deliver', desc: 'Insights & training', color: 'brand' },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl ${item.color === 'brand' ? 'bg-brand-500/10 border-brand-500/20' : 'bg-warm-500/10 border-warm-500/20'} border flex items-center justify-center mb-2 mx-auto`}>
                      <span className={`text-sm font-bold font-mono ${item.color === 'brand' ? 'text-brand-400' : 'text-warm-400'}`}>{item.step}</span>
                    </div>
                    <p className="text-xs font-semibold text-white">{item.label}</p>
                    <p className="text-[10px] text-surface-500 hidden sm:block">{item.desc}</p>
                  </div>
                  {i < 4 && (
                    <svg className="w-6 h-4 text-surface-700 shrink-0" fill="none" viewBox="0 0 24 16" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" d="M0 8h20m0 0l-5-5m5 5l-5 5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
