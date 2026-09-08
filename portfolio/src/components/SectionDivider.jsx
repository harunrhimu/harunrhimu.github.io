export default function SectionDivider() {
  return (
    <div className="container-xl">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-inset/50 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-inset/50 to-transparent" />
      </div>
    </div>
  )
}
