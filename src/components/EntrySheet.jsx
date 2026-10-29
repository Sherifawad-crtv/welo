import { useEffect, useRef, useState } from 'react';
import Mascot from './Mascot.jsx';
import { Sol } from './Icons.jsx';

const MACRO = [
  { k: 'p', label: 'Protein', color: '#a3213f' },
  { k: 'c', label: 'Carbs', color: '#1f724b' },
  { k: 'f', label: 'Fat', color: '#c49a2c' },
];
const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.6; // px per ms

const calc = (it) => ({
  kcal: Math.round(it.per.kcal * it.qty),
  p: Math.round(it.per.p * it.qty),
  c: Math.round(it.per.c * it.qty),
  f: Math.round(it.per.f * it.qty),
});
const unitLabel = (it) => (it.unit === 'g' ? ' g' : ` ${it.unit}`);

export default function EntrySheet({ detail, onClose, onDelete }) {
  const initial = useRef(detail.items);
  const [items, setItems] = useState(detail.items);
  const [removed, setRemoved] = useState([]); // ids
  const [openOpts, setOpenOpts] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [undo, setUndo] = useState(null); // { id, name }
  const [dy, setDy] = useState(0);
  const [closing, setClosing] = useState(false);
  const drag = useRef(null);
  const sheetRef = useRef(null);
  const undoTimer = useRef(null);

  const visible = items.filter((it) => !removed.includes(it.id));
  const totals = visible.reduce((t, it) => {
    const c = calc(it);
    return { kcal: t.kcal + c.kcal, p: t.p + c.p, c: t.c + c.c, f: t.f + c.f };
  }, { kcal: 0, p: 0, c: 0, f: 0 });
  const dirty = removed.length > 0 || items.some((it, i) => it !== initial.current[i]);

  const dismiss = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 260);
  };

  // Focus management, Escape, scroll lock
  useEffect(() => {
    const opener = document.activeElement;
    sheetRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (confirmDelete) setConfirmDelete(false); else dismiss();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(undoTimer.current);
      opener?.focus?.({ preventScroll: true });
    };
  }, [confirmDelete]); // eslint-disable-line react-hooks/exhaustive-deps

  // Drag the grabber/header down to dismiss
  const onPointerDown = (e) => {
    drag.current = { y: e.clientY, t: e.timeStamp, last: e.clientY, lastT: e.timeStamp };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    setDy(Math.max(0, e.clientY - d.y));
    d.last = e.clientY; d.lastT = e.timeStamp;
  };
  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dist = Math.max(0, e.clientY - d.y);
    const v = (e.clientY - d.last) / Math.max(1, e.timeStamp - d.lastT);
    if (dist > DISMISS_DISTANCE || v > DISMISS_VELOCITY) dismiss(); else setDy(0);
  };

  const step = (id, dir) => setItems((xs) => xs.map((it) => (it.id === id
    ? { ...it, qty: Math.max(it.min, +(it.qty + dir * it.step).toFixed(2)) } : it)));
  const choose = (id, opt) => setItems((xs) => xs.map((it) => (it.id === id
    ? { ...it, name: opt.name, estimate: false, options: undefined,
        per: { kcal: opt.kcal / it.qty, p: opt.p / it.qty, c: opt.c / it.qty, f: opt.f / it.qty } } : it)));
  const remove = (it) => {
    setRemoved((r) => [...r, it.id]);
    setUndo({ id: it.id, name: it.name });
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setUndo(null), 4000);
  };
  const restore = () => { setRemoved((r) => r.filter((x) => x !== undo.id)); setUndo(null); };

  const progress = Math.min(1, dy / 300);
  const sheetStyle = closing ? { transform: 'translateY(100%)', transition: 'transform .26s ease' }
    : dy ? { transform: `translateY(${dy}px)`, transition: drag.current ? 'none' : 'transform .25s ease' } : undefined;

  return (
    <div className="overlay" style={{ background: `rgba(0,20,10,${closing ? 0 : 0.28 * (1 - progress)})`, transition: closing ? 'background .26s ease' : undefined }} onClick={dismiss}>
      <div className="esheet" ref={sheetRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Entry details" style={sheetStyle} onClick={(e) => e.stopPropagation()}>
        <div className="e-grab" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          <i />
          <div className="e-bar">
            <span className="e-bar-title">{detail.time}</span>
          </div>
        </div>

        <div className="e-body">
          <Mascot className="e-mascot" mood="happy" size={92} />
          <div className="e-total" aria-live="polite">
            <div className="e-kcal"><b>{totals.kcal}</b><span>kcal</span></div>
            <div className="e-mrow">
              {MACRO.map((m) => (
                <div key={m.k}><i style={{ background: m.color }} />{m.label}<b>{totals[m.k]}g</b></div>
              ))}
            </div>
          </div>

          <div className="e-head2"><span>Items</span><span>{visible.length} {visible.length === 1 ? 'item' : 'items'}</span></div>
          <div className="e-list">
            {visible.map((it) => {
              const c = calc(it);
              return (
                <div className="e-row" key={it.id}>
                  <div className="e-rtop">
                    <div className="e-name">{it.name}</div>
                    <div className="e-rkcal">{c.kcal}<small> kcal</small></div>
                  </div>
                  <div className="e-ctrl">
                    <button className="e-pill e-trash" aria-label={`Remove ${it.name}`} onClick={() => remove(it)}><Sol name="trash-bin-trash-linear" size={20} /></button>
                    <div className="e-step" role="group" aria-label={`Quantity of ${it.name}`}>
                      <button aria-label="Decrease" disabled={it.qty <= it.min} onClick={() => step(it.id, -1)}><Sol name="minus-linear" size={20} /></button>
                      <span>{it.qty}{unitLabel(it)}</span>
                      <button aria-label="Increase" onClick={() => step(it.id, 1)}><Sol name="add-linear" size={20} /></button>
                    </div>
                  </div>
                  <div className="e-imacros">Protein {c.p}g · Carbs {c.c}g · Fat {c.f}g</div>
                  {it.estimate && <div className="e-est"><Sol name="info-circle-linear" size={16} />Estimate, please check</div>}
                  {it.options && (
                    <>
                      <button className="e-opts" aria-expanded={openOpts === it.id} onClick={() => setOpenOpts(openOpts === it.id ? null : it.id)}>
                        Not right? {it.options.length} other options
                        <Sol name="alt-arrow-down-linear" size={16} style={{ transform: openOpts === it.id ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                      </button>
                      {openOpts === it.id && (
                        <div className="e-optlist" role="listbox">
                          {it.options.map((o) => (
                            <button key={o.name} role="option" onClick={() => { choose(it.id, o); setOpenOpts(null); }}>
                              <span>{o.name}</span><em>{o.kcal} kcal</em>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            {!visible.length && <div className="e-empty">All items removed</div>}
          </div>

          <div className="e-foot">
            <button><Sol name="notes-linear" size={22} />Describe it again</button>
            <button className="del" onClick={() => setConfirmDelete(true)}><Sol name="trash-bin-trash-linear" size={22} />Delete entry</button>
          </div>
        </div>

        <div className="e-dock">
          {undo && <div className="e-toast" role="status"><span>Removed {undo.name}</span><button onClick={restore}><Sol name="undo-left-linear" size={16} />Undo</button></div>}
          <button className="save" disabled={!dirty} onClick={dismiss}>Save changes</button>
        </div>

        {confirmDelete && (
          <div className="e-confirm" onClick={() => setConfirmDelete(false)}>
            <div className="e-actions" role="alertdialog" aria-label="Delete entry" onClick={(e) => e.stopPropagation()}>
              <div className="e-agroup">
                <div className="e-atext"><b>Delete this entry?</b><span>This removes {totals.kcal} kcal from today.</span></div>
                <button className="e-adel" onClick={() => { setConfirmDelete(false); setClosing(true); setTimeout(onDelete, 260); }}>Delete entry</button>
              </div>
              <button className="e-acancel" autoFocus onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
