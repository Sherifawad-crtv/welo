export const summary = { deficit: '−2,256', resting: '2,308', eaten: '675', active: '623' };

// Six categories. Each entry only names its category; icon, tint and label come from here.
// Placeholder duotone icons until the custom set is ready.
export const CATEGORIES = {
  baseline: { label: 'Baseline', icon: 'moon-bold-duotone', tint: '#e8e5d3', color: '#5c5f52' },
  food: { label: 'Food', icon: 'plate-bold-duotone', tint: '#dfebe2', color: '#1f724b' },
  drink: { label: 'Drink', icon: 'bottle-bold-duotone', tint: '#dfebe2', color: '#1f724b' },
  water: { label: 'Water', icon: 'waterdrop-bold-duotone', tint: '#dbeaf3', color: '#2a6f97' },
  workout: { label: 'Workout', icon: 'dumbbell-large-minimalistic-bold-duotone', tint: '#fbe3e8', color: '#a3213f' },
  steps: { label: 'Steps', icon: 'walking-round-bold-duotone', tint: '#fbe3e8', color: '#a3213f' },
};

export const entries = [
  { id: 'baseline', cat: 'baseline', title: 'Baseline', sub: 'Just being you', value: '−2,308', time: 'All day', muted: true },
  { id: 'steps', cat: 'steps', title: '8,432 steps', value: '−312', time: 'Synced', tone: 'out' },
  { id: 'water', cat: 'water', title: 'Water', value: '500 ml', time: '4:30 PM', tone: 'water' },
  { id: 'charco', cat: 'food', title: 'Charco Chicken Smoked/Grilled', value: '+667', time: '3:48 PM', tone: 'in', ellipsis: true },
  { id: 'workout', cat: 'workout', title: 'تمارين جسم قوة, جري', value: '−623', time: '2:24 PM', tone: 'out', rtl: true },
  { id: 'coffee', cat: 'drink', title: 'Coffee', value: '+8', time: '2:24 PM', tone: 'in' },
];


export const macros = [
  { id: 'protein', label: 'Protein', value: 62, goal: 150, unit: 'g', color: '#a3213f' },
  { id: 'carbs', label: 'Carbs', value: 140, goal: 250, unit: 'g', color: '#1f724b' },
  { id: 'fat', label: 'Fat', value: 38, goal: 70, unit: 'g', color: '#c49a2c' },
  { id: 'water', label: 'Water', value: 1.2, goal: 2.5, unit: ' L', color: '#2a6f97' },
];

export const weekDays = [
  { n: 'THU', full: 'Thursday', date: '22 Oct', l: 'T', v: -640, s: 'logged' },
  { n: 'FRI', full: 'Friday', date: '23 Oct', l: 'F', v: null },
  { n: 'SAT', full: 'Saturday', date: '24 Oct', l: 'S', v: -520, s: 'streak' },
  { n: 'SUN', full: 'Sunday', date: '25 Oct', l: 'S', v: 192, s: 'streak' },
  { n: 'MON', full: 'Monday', date: '26 Oct', l: 'M', v: -410, s: 'streak' },
  { n: 'TUE', full: 'Tuesday', date: '27 Oct', l: 'T', v: -380, s: 'streak' },
  { n: 'WED', full: 'Wednesday', date: '28 Oct', l: 'W', v: null, today: true, s: 'streak' },
];

export const dayRows = [
  { d: '28', m: 'Oct', name: 'Wednesday', sub: 'Today · in progress', value: '−1,848', note: 'so far', tint: '#e8e5d3', muted: true },
  { d: '27', m: 'Oct', name: 'Tuesday', sub: 'Ate 2,100', value: '−380', tint: '#dfebe2' },
  { d: '26', m: 'Oct', name: 'Monday', sub: 'Ate 2,050', value: '−410', tint: '#dfebe2' },
  { d: '25', m: 'Oct', name: 'Sunday', sub: 'Ate 2,512', value: '+192', tint: '#dfebe2' },
  { d: '24', m: 'Oct', name: 'Saturday', sub: 'Ate 1,990', value: '−520', tint: '#dfebe2' },
  { d: '23', m: 'Oct', name: 'Friday', sub: 'Nothing logged', note: 'Not counted', tint: '#e8e5d3' },
  { d: '22', m: 'Oct', name: 'Thursday', sub: 'Ate 1,740', value: '−640', tint: '#dfebe2' },
];

export const weighGrid = ['97', '96.5', '96', '95.5', '95'];
export const weighAxis = [{ l: '3w', x: 131 }, { l: '2w', x: 220 }, { l: '1w', x: 310 }];
export const weekByWeek = [
  { title: 'This week', range: '22 Oct – 28 Oct', value: '96 kg' },
  { title: 'Last week', range: '15 Oct – 21 Oct', none: true },
  { title: '2 weeks ago', range: '8 Oct – 14 Oct', none: true },
  { title: '3 weeks ago', range: '1 Oct – 7 Oct', none: true },
];

// Items store per-unit values so the stepper can rescale kcal and macros.
const item = (id, name, qty, unit, step, kcal, p, c, f, extra = {}) => ({
  id, name, qty, unit, step, min: step,
  per: { kcal: kcal / qty, p: p / qty, c: c / qty, f: f / qty }, ...extra,
});
const option = (name, kcal, p, c, f) => ({ name, kcal, p, c, f });

export const entryDetails = {
  charco: {
    time: '3:48 PM', category: 'Food',
    items: [
      item('a', 'Charco Chicken Smoked/Grilled Chicken', 225, 'g', 25, 371, 61, 0, 12),
      item('b', 'Roasted potato wedges', 4, 'pieces', 1, 156, 2, 25, 5, {
        estimate: true,
        options: [option('Baked potato wedges', 140, 2, 24, 4), option('French fries', 190, 3, 26, 9), option('Sweet potato wedges', 130, 2, 26, 3)],
      }),
      item('c', 'Corn', 2, 'pieces', 1, 96, 3, 21, 2),
    ],
  },
  coffee: {
    time: '2:24 PM', category: 'Food',
    items: [item('a', 'Coffee', 1, 'cup', 1, 8, 0, 1, 0)],
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

// Days with something logged, and the days that make up the running streak, by month.
export const streak = {
  days: 5,
  logged: { '2026-10': [22, 24, 25, 26, 27, 28] },
  current: { '2026-10': [24, 25, 26, 27, 28] },
};
