import { SCARCITY_TEXT } from '../data/scarcity'
import { getUrgencyText } from '../utils/urgency'

export default function ScarcityBadge({ className = '' }) {
  return (
    <div className={`inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-warm-500/10 border border-warm-500/30 ${className}`}>
      <svg className="w-4 h-4 text-accent-warm shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <span className="text-xs md:text-sm font-bold text-accent-warm">{SCARCITY_TEXT}</span>
      <span className="hidden sm:inline text-accent-warm/50">•</span>
      <span className="text-xs md:text-sm text-accent-warm/90 font-medium">{getUrgencyText()}</span>
    </div>
  )
}
