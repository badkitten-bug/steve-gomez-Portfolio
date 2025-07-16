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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-green">{project.data.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            <div className="mb-6">
              <img
                src={getImg(project)}
                alt={getImgAlt(project)}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Descripción</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.data.description}
              </p>
            </div>

            {/* Technologies */}
            {project.data.tags && project.data.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {project.data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green/10 text-green rounded-full text-sm font-medium border border-green/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4">
              {project.data.link && (
                <a
                  href={project.data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ver proyecto
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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