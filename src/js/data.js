export const data = [
  {
    name: 'backblaze.com',
    min: 7,
    storage: 0.005,
    transfer: 0.01,
  },
  {
    // має бути можливість переключатись між опціями HDD та SSD.
    name: 'bunny.net',
    max: 10,
    storage: {
      HDD: 0.01,
      SSD: 0.02,
    },
    transfer: 0.01,
  },
  {
    // має бути можливість переключатись між опціями Multi та Single.
    name: 'scaleway.com',
    storage: {
      multi: 0.06,
      single: 0.03, //Multi - 75 GB безкоштовно, потім $0.06.	Single - 75 GB безкоштовно, потім $0.03.
    },
    transfer: 0.02, // будь-яка опція - 75 GB безкоштовно, потім $0.02.
  },
  {
    name: 'vultr.com',
    min: 5,
    storage: 0.01,
    transfer: 0.01,
  },
];
