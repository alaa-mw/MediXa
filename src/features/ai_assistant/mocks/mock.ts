export const messages = [
  {
    id: "1",
    role: "USER",
    content: "ما هي جرعة Azithromycin ؟",
    createdAt: "04:16",
  },
  {
    id: "2",
    role: "ASSISTANT",
    content: `
جرعة Azithromycin:

- 500mg أول يوم.
- 250mg لمدة أربعة أيام.
`,
    createdAt: "04:16",
    sources: [
      {
        id: "1",
        title: "BNF 83",
        page: 452,
      },
    ],
  },
];
