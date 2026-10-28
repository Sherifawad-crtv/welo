import { ChevronDown, CloseIcon, DescribeIcon, InfoSmall, Mascot, PencilIcon, TrashIcon } from './Icons.jsx';

export default function EntrySheet({ detail, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="esheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Entry details">
        <button className="handle" onClick={onClose} aria-label="Close"><i /></button>
        <div className="e-time">{detail.time}</div>
        <div className="e-mascot"><Mascot /></div>
        <div className="e-total">
          <div className="e-kcal"><b>{detail.kcal}</b><span>kcal</span></div>
          <div className="e-macros">{detail.macros}</div>
        </div>
        {detail.items.map((it) => (
          <div className="e-item" key={it.id}>
            <div className="e-head">
              <div className="e-name">{it.name}</div>
              <div className="e-right"><span className="e-ikcal">{it.kcal} <small>kcal</small></span><button aria-label="Remove"><CloseIcon /></button></div>
            </div>
            <button className="e-qty">{it.qty} <PencilIcon /></button>
            <div className="e-imacros">{it.macros}</div>
            {it.estimate && <div className="e-est"><InfoSmall />Estimate – please check</div>}
            {it.options && <button className="e-opts">Not right? {it.options} other options <ChevronDown /></button>}
          </div>
        ))}
        <button className="save" disabled>Save changes</button>
        <div className="e-foot">
          <button><DescribeIcon />Describe it again</button><i />
          <button className="del"><TrashIcon />Delete entry</button>
        </div>
      </div>
    </div>
  );
}
