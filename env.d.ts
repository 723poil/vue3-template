interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}