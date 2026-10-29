import { useEffect, useRef, useState } from 'react';

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.6; // px per ms

// Generic iOS-style bottom sheet: grabber, drag to dismiss, tap outside or Esc to close.
// Children may be a function receiving `dismiss` so content can close the sheet with the same animation.
export default function Sheet({ label, onClose, children }) {
  const [dy, setDy] = useState(0);
  const [closing, setClosing] = useState(false);
  const drag = useRef(null);
  const ref = useRef(null);

  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 260);
  };

  useEffect(() => {
    const opener = document.activeElement;
    ref.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && dismiss();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      opener?.focus?.({ preventScroll: true });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const down = (e) => {
    drag.current = { y: e.clientY, last: e.clientY, lastT: e.timeStamp };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    setDy(Math.max(0, e.clientY - d.y));
    d.last = e.clientY; d.lastT = e.timeStamp;
  };
  const up = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dist = Math.max(0, e.clientY - d.y);
    const v = (e.clientY - d.last) / Math.max(1, e.timeStamp - d.lastT);
    if (dist > DISMISS_DISTANCE || v > DISMISS_VELOCITY) dismiss(); else setDy(0);
  };

  const progress = Math.min(1, dy / 300);
  const style = closing ? { transform: 'translateY(100%)', transition: 'transform .26s ease' }
    : dy ? { transform: `translateY(${dy}px)`, transition: drag.current ? 'none' : 'transform .25s ease' } : undefined;

  return (
    <div className="overlay" style={{ background: `rgba(0,20,10,${closing ? 0 : 0.28 * (1 - progress)})`, transition: closing ? 'background .26s ease' : undefined }} onClick={dismiss}>
      <div className="esheet" ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label} style={style} onClick={(e) => e.stopPropagation()}>
        <div className="e-grab" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}><i /><div className="grab-gap" /></div>
        {typeof children === 'function' ? children(dismiss) : children}
      </div>
    </div>
  );
}
