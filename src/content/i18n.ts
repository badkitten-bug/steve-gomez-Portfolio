import es from './i18n-es.json';
import en from './i18n-en.json';

const translations = { es, en };

export function getI18n(lang = 'es') {
  const dict = translations[lang] || translations['es'];
  function t(key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : ''), dict) || '';
  }
  return { t };
} 