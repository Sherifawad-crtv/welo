export const summary = { deficit: '−2,256', resting: '2,308', eaten: '675', active: '623' };

export const entries = [
  { id: 'baseline', icon: 'moon-linear', tint: '#e8e5d3', color: '#5c5f52', title: 'Baseline', sub: 'Just being you', value: '−2,308', time: 'All day', muted: true },
  { id: 'charco', icon: 'plate-linear', tint: '#dfebe2', color: '#1f724b', title: 'Charco Chicken Smoked/Grilled', sub: 'Food', value: '+667', time: '3:48 PM', tone: 'in', ellipsis: true },
  { id: 'workout', icon: 'dumbbell-large-minimalistic-linear', tint: '#fbe3e8', color: '#a3213f', title: 'تمارين جسم قوة, جري', sub: 'Movement', value: '−623', time: '2:24 PM', tone: 'out', rtl: true },
  { id: 'coffee', icon: 'cup-hot-linear', tint: '#dfebe2', color: '#1f724b', title: 'Coffee', sub: 'Food', value: '+8', time: '2:24 PM', tone: 'in' },
];

export const macros = [
  { id: 'protein', label: 'Protein', value: 62, goal: 150, unit: 'g', color: '#a3213f' },
  { id: 'carbs', label: 'Carbs', value: 140, goal: 250, unit: 'g', color: '#1f724b' },
  { id: 'fat', label: 'Fat', value: 38, goal: 70, unit: 'g', color: '#c49a2c' },
  { id: 'water', label: 'Water', value: 1.2, goal: 2.5, unit: ' L', color: '#2a6f97' },
];

export const weekDays = [
  { l: 'T', v: null }, { l: 'F', v: null }, { l: 'S', v: null },
  { l: 'S', v: 192 }, { l: 'M', v: null }, { l: 'T', v: null }, { l: 'W', v: null, today: true },
];

export const dayRows = [
  { d: '28', m: 'Oct', name: 'Wednesday', sub: 'Today · in progress', value: '−1,848', note: 'so far', tint: '#e8e5d3', muted: true },
  { d: '27', m: 'Oct', name: 'Tuesday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
  { d: '26', m: 'Oct', name: 'Monday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
  { d: '25', m: 'Oct', name: 'Sunday', sub: 'Ate 2,512', value: '+192', tint: '#dfebe2' },
  { d: '24', m: 'Oct', name: 'Saturday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
  { d: '23', m: 'Oct', name: 'Friday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
  { d: '22', m: 'Oct', name: 'Thursday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
];

export const weighGrid = ['97', '96.5', '96', '95.5', '95'];
export const weighAxis = [{ l: '3w', x: 131 }, { l: '2w', x: 220 }, { l: '1w', x: 310 }];
export const weekByWeek = [
  { title: 'This week', range: '22 Oct – 28 Oct', value: '96 kg' },
  { title: 'Last week', range: '15 Oct – 21 Oct', none: true },
  { title: '2 weeks ago', range: '8 Oct – 14 Oct', none: true },
  { title: '3 weeks ago', range: '1 Oct – 7 Oct', none: true },
];

export const entryDetails = {
  charco: {
    time: '3:48 PM', kcal: 667, macros: 'Protein 68g · Carbs 54g · Fat 20g',
    items: [
      { id: 'a', name: 'Charco Chicken Smoked/Grilled Chicken', qty: '225 g', kcal: 371, macros: 'Protein 61g · Carbs 0g · Fat 12g' },
      { id: 'b', name: 'Roasted potato wedges', qty: '4 pieces', kcal: 156, macros: 'Protein 2g · Carbs 25g · Fat 5g', estimate: true, options: 3 },
      { id: 'c', name: 'Corn', qty: '2 pieces', kcal: 96, macros: 'Protein 3g · Carbs 21g · Fat 2g' },
    ],
  },
  coffee: {
    time: '2:24 PM', kcal: 8, macros: 'Protein 0g · Carbs 1g · Fat 0g',
    items: [{ id: 'a', name: 'Coffee', qty: '1 cup', kcal: 8, macros: 'Protein 0g · Carbs 1g · Fat 0g' }],
  },
};

export const settingsGroups = [
  { title: 'Your body', hint: 'Your goal: lose weight. It follows from your weight and target, and your daily numbers update when you change any of these.', rows: [
    { icon: 'scale-bold-duotone', tint: '#dfebe2', label: 'Weight', value: '96 kg' },
    { icon: 'target-bold-duotone', tint: '#dfebe2', label: 'Target weight', value: '87 kg' },
    { icon: 'ruler-bold-duotone', tint: '#e8e5d3', label: 'Height', value: '178 cm' },
    { icon: 'calendar-bold-duotone', tint: '#e8e5d3', label: 'Age', value: '29 years' },
    { icon: 'user-circle-bold-duotone', tint: '#e8e5d3', label: 'Gender', value: 'Male' },
  ] },
  { title: 'Logging', rows: [{ icon: 'camera-bold-duotone', tint: '#dfebe2', label: 'Preferred way to log', value: 'Photo' }] },
  { title: 'Account', rows: [
    { icon: 'bell-bold-duotone', tint: '#dfebe2', label: 'Notifications', value: 'On' },
    { icon: 'lock-bold-duotone', tint: '#e8e5d3', label: 'Privacy & security' },
  ] },
  { title: 'About', rows: [
    { icon: 'document-text-bold-duotone', tint: '#e8e5d3', label: 'Terms of service' },
    { icon: 'shield-check-bold-duotone', tint: '#e8e5d3', label: 'Privacy policy' },
    { icon: 'heart-bold-duotone', tint: '#e8e5d3', label: 'Credits' },
    { icon: 'letter-bold-duotone', tint: '#e8e5d3', label: 'Contact us' },
  ] },
];
export const profile = { name: 'Sherif Awad', email: 'sherif.awaadd@gmail.com' };
