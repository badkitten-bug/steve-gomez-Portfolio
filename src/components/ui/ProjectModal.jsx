import React from "react";

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const defaultImg = "/project.png";
  const getImg = (project) => project.data.img ? project.data.img : defaultImg;
  const getImgAlt = (project) => project.data.img_alt ? project.data.img_alt : "Imagen de proyecto";

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green/5 to-green/10">
            <h2 className="text-2xl font-bold text-black dark:text-green">{project.data.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            <div className="mb-8">
              <img
                src={getImg(project)}
                alt={getImgAlt(project)}
                className="w-full h-80 object-cover rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-black dark:text-orange-500 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Descripción
              </h3>
              <p className="text-black dark:text-gray-300 leading-relaxed text-lg font-medium">
                {project.data.description}
              </p>
            </div>

            {/* Technologies */}
            {project.data.tags && project.data.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-black dark:text-orange-500">Tecnologías</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green/10 text-black dark:text-green rounded-full text-sm font-bold border border-green/20 hover:bg-green/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {project.data.link && (
                <a
                  href={project.data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-green/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver proyecto
                </a>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 