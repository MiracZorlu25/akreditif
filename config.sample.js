// Public-safe fallback config for GitHub Pages
// This file is committed to the repo and loaded before config.js
// Do NOT put real secrets here.

const CONFIG = {
  DEFAULT_OPENAI_API_KEY: '', // Boş - localStorage'dan veya admin panelden ayarlanacak
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
  // Default AI field rules - sabit kurallar
  DEFAULT_FIELD_RULES: {
    'f27': {
      rule: '27 alanı 1/N formatında olmalı ve N-1 adet dosya yüklenmiş olmalıdır.',
      examples: '1/1, 1/2, 1/3',
      isDefault: true
    },
    'f40A': {
      rule: '40A alanı sadece IRREVOCABLE veya REVOCABLE değerlerini kabul eder.',
      examples: 'IRREVOCABLE, REVOCABLE',
      isDefault: true
    },
    'f20': {
      rule: '20 alanı akreditif numarası olmalı ve LC ile başlamalıdır.',
      examples: 'LC2025001, LC2025002',
      isDefault: true
    },
    'f50': {
      rule: '50 alanı amir/alıcı şirket bilgisi olmalıdır. SWIFT kodu zorunlu değildir.',
      examples: 'ABC IMPORT LTD., 123 Main St, City, Country',
      isDefault: true
    },
    'f59': {
      rule: '59 alanı lehtar/satıcı şirket bilgisi olmalıdır. SWIFT kodu zorunlu değildir.',
      examples: 'XYZ EXPORT LLC, 456 Business Ave, City, Country',
      isDefault: true
    },
    'f44A': {
      rule: '44A alanı teslim alma yeri olmalıdır. Şehir ismi yeterlidir.',
      examples: 'ISTANBUL, ANKARA, IZMIR',
      isDefault: true
    },
    'f44B': {
      rule: '44B alanı teslim yeri olmalıdır. Şehir ismi yeterlidir.',
      examples: 'HAMBURG CITY, NEW YORK, LONDON',
      isDefault: true
    }
  }
};

if (typeof window !== 'undefined') {
  window.CONFIG = window.CONFIG || CONFIG;
}


