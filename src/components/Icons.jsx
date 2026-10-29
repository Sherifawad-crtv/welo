import solar from '../solarIcons.js';

export const Sol = ({ name, size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: solar[name] }} {...rest} />
);

export const ProfileIcon = () => <Sol name="user-linear" size={20} />;
export const InfoIcon = () => <Sol name="info-circle-linear" size={20} />;
export const Chevron = ({ dir, dim }) => <Sol name={`alt-arrow-${dir}-linear`} size={18} opacity={dim ? 0.5 : 1} />;
export const HomeIcon = () => <Sol name="home-2-bold" size={28} />;
export const ProgressIcon = () => <Sol name="chart-2-bold" size={28} />;
export const PlusIcon = () => <Sol name="add-linear" size={30} />;
export const BackArrow = () => <Sol name="arrow-left-linear" size={22} />;
export const ChevronRight = () => <Sol name="alt-arrow-right-linear" size={18} />;
export const ChevronDown = () => <Sol name="alt-arrow-down-linear" size={18} />;
export const CloseIcon = () => <Sol name="close-linear" size={20} />;
export const PencilIcon = ({ size = 16 }) => <Sol name="pen-linear" size={size} />;
export const InfoSmall = () => <Sol name="info-circle-linear" size={16} />;
export const TrashIcon = () => <Sol name="trash-bin-trash-linear" size={22} />;
export const DescribeIcon = () => <Sol name="notes-linear" size={22} />;

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
