const stroke = { fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21v-1.5A4.5 4.5 0 019 15h6a4.5 4.5 0 014.5 4.5V21z" />
  </svg>
);

export const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 11v6" />
    <circle cx="12" cy="7.5" r=".6" fill="#fff" />
  </svg>
);

export const Chevron = ({ dir, dim }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" {...stroke} opacity={dim ? 0.5 : 1}>
    <path d={dir === 'left' ? 'M7.5 2L3.5 6l4 4' : 'M4.5 2l4 4-4 4'} />
  </svg>
);

export const HomeIcon = () => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="currentColor">
    <path d="M13 1.5L1.5 11.5h3V22h6.5v-6.5h4V22H21.5V11.5h3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const ProgressIcon = () => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="currentColor">
    <rect x="3" y="9" width="5.5" height="14" rx="2.7" />
    <rect x="10.3" y="1" width="5.5" height="22" rx="2.7" />
    <rect x="17.6" y="14" width="5.5" height="9" rx="2.7" />
  </svg>
);

export const PlusIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
    <path d="M13 3v20M3 13h20" />
  </svg>
);

export const FakeStatusBar = () => (
  <>
    <div className="fake-status clock">5:55</div>
    <div className="fake-status sys">
      <svg width="20" height="14" viewBox="0 0 20 14" fill="#fff">
        <rect x="0" y="9" width="4" height="5" rx="1" /><rect x="5.3" y="6" width="4" height="8" rx="1" />
        <rect x="10.6" y="3" width="4" height="11" rx="1" /><rect x="16" y="0" width="4" height="14" rx="1" opacity=".35" />
      </svg>
      <svg width="19" height="14" viewBox="0 0 19 14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <path d="M1.5 5a11 11 0 0116 0M4.5 8.2a6.6 6.6 0 0110 0" /><circle cx="9.5" cy="11.5" r="1.3" fill="#fff" stroke="none" />
      </svg>
      <span className="battery"><i /></span>
    </div>
  </>
);

const ink = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const BackArrow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...ink}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" {...ink} strokeWidth="1.8"><path d="M4.5 2l4 4-4 4" /></svg>
);
export const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" {...ink} strokeWidth="1.8"><path d="M2 4.5l4 4 4-4" /></svg>
);
export const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...ink} strokeWidth="1.6"><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const PencilIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...ink} strokeWidth="2"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1zM14 7l3 3" /></svg>
);
export const InfoSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...ink} strokeWidth="1.8"><circle cx="12" cy="12" r="9.5" /><path d="M12 11v6" /><circle cx="12" cy="7.5" r=".6" fill="currentColor" /></svg>
);
export const TrashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...ink} strokeWidth="1.8"><path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v6M14 11v6" /></svg>
);
export const DescribeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...ink} strokeWidth="1.8"><path d="M4 6h12M4 11h8M4 16h6M15 19l1-3.5 5-5a1.6 1.6 0 012.2 2.2l-5 5L15 19z" /></svg>
);

export const Mascot = () => (
  <svg width="88" height="81" viewBox="0 0 100 92" aria-hidden="true">
    <g fill="#17603c">
      <circle cx="26" cy="34" r="17" /><circle cx="46" cy="22" r="19" /><circle cx="68" cy="26" r="19" />
      <circle cx="82" cy="46" r="15" /><circle cx="70" cy="62" r="18" /><circle cx="22" cy="52" r="13" /><circle cx="52" cy="46" r="24" />
    </g>
    <ellipse cx="38" cy="56" rx="26" ry="24" fill="#f6efe0" />
    <circle cx="30" cy="50" r="3" fill="#145a39" /><circle cx="46" cy="53" r="3" fill="#145a39" />
    <path d="M32 63q7 6 14 0" fill="none" stroke="#145a39" strokeWidth="2.4" strokeLinecap="round" />
    <g fill="#f6efe0" stroke="#145a39" strokeWidth="2">
      <path d="M12 90c-2-9 2-14 9-14 6 0 12 4 10 14z" /><path d="M54 90c-2-9 2-14 9-14 6 0 12 4 10 14z" />
    </g>
    <path d="M18 90v-8M25 90v-9M60 90v-8M67 90v-9" stroke="#145a39" strokeWidth="1.6" />
  </svg>
);
