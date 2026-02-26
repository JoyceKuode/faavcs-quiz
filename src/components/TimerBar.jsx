export default function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100
  const isUrgent = timeLeft <= 5
  const isWarning = timeLeft <= 10

  const barColor = isUrgent
    ? '#ef4444'
    : isWarning
    ? '#f59e0b'
    : '#00857A'

  return (
    <div className="w-full flex items-center gap-3">
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: '8px', background: 'rgba(240,250,250,0.1)' }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: '9999px',
            transition: 'width 1s linear, background 0.3s ease',
            boxShadow: isUrgent ? `0 0 10px ${barColor}` : undefined,
          }}
        />
      </div>
      <span
        className="text-sm font-semibold tabular-nums w-7 text-right"
        style={{ color: isUrgent ? '#ef4444' : '#4DB8B0' }}
      >
        {timeLeft}
      </span>
    </div>
  )
}
