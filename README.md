# React + TypeScript + Vite

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root.

You can copy the example file:

```bash
cp .env.example .env
```

> If you are running the backend locally, change it to:
>
> ```env
> VITE_API_URL=http://127.0.0.1:[YOUR_PORT]
> ```

3. Start the development server:

```bash
npm run dev
```

---

## Notes

- Do **not** commit your `.env` file.
- Only commit changes to `.env.example` when a new environment variable is added.
- Each developer can use their own `VITE_API_URL` without modifying the source code.