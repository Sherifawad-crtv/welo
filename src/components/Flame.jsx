import { Sol } from './Icons.jsx';

// Streak flame: Solar "fire" in bold duotone, tinted with the app green.
export const Flame = ({ size = 128, style, className }) => (
  <Sol name="fire-bold-duotone" size={size} className={className} style={{ color: 'var(--green)', ...style }} />
);
