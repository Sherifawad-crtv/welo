export const fmtSigned = (n) => `${n > 0 ? '+' : '−'}${Math.abs(n).toLocaleString('en-US')}`;
