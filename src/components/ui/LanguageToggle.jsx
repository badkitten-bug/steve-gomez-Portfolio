import React from "react";

export default function LanguageToggle() {
  // Detectar idioma actual por el prefijo de la ruta
  const path = window.location.pathname;
  const isEs = path.startsWith("/es/");
  const isEn = path.startsWith("/en/");
  let newPath = path;

  if (isEs) {
    newPath = path.replace("/es/", "/en/");
  } else if (isEn) {
    newPath = path.replace("/en/", "/es/");
  } else {
    // Si no hay prefijo, ir a /en/ por defecto
    newPath = "/en/";
  }

  return (
    <a
      href={newPath + window.location.hash}
      aria-label="Cambiar idioma"
      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
    >
      {isEs ? "EN" : "ES"}
    </a>
  );
} 