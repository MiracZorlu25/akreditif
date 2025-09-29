// Public-safe fallback config for GitHub Pages
// This file is committed to the repo and loaded before config.js
// Do NOT put real secrets here.

const CONFIG = {
  DEFAULT_OPENAI_API_KEY: '', // leave empty; set via Admin Panel (localStorage)
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: '12345',
  SYSTEM_NAME: 'Akreditif Sistemi',
  SYSTEM_VERSION: '1.0.0',
  OPENAI_MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.1,
  AUTO_SAVE_INTERVAL: 30000,
  SESSION_TIMEOUT: 3600000,
  ENABLE_AI_CONTROL: true,
  ENABLE_PDF_EXPORT: true,
  ENABLE_SYNC: true,
  ENABLE_STATISTICS: true,
  DEFAULT_FIELD_RULES: (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_FIELD_RULES) ? CONFIG.DEFAULT_FIELD_RULES : {}
};

if (typeof window !== 'undefined') {
  window.CONFIG = window.CONFIG || CONFIG;
}


