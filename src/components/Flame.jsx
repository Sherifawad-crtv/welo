// Streak flame in three greens: body, inner lobe, highlight.
export const Flame = ({ size = 130 }) => (
  <svg width={size} height={size * 1.08} viewBox="0 0 120 130" aria-hidden="true">
    <path d="M62 4C80 18 92 34 86 54c4-2 12-5 17-7 5 13 5 31-5 45-10 16-28 26-46 26C28 118 8 100 8 76c0-26 22-46 40-60 6-5 10-9 14-12z" fill="#5fbf8c" />
    <path d="M62 4C80 18 92 34 86 54c-6-6-14-9-22-10 2-14-2-26-10-36 3-2 6-3 8-4z" fill="#86d3a8" opacity=".55" />
    <path d="M26 92c4-12 20-14 32-6 12-8 28-6 38 6-4 14-20 24-36 24-16-1-32-10-34-24z" fill="#1f724b" />
    <path d="M40 98c6-5 14-5 20 0" fill="none" stroke="#2f8f62" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
