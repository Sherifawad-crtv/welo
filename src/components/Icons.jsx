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
