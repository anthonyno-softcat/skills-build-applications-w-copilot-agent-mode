# OctoFit Tracker Frontend

The frontend builds API URLs from Vite environment variables. Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000`.
