import React, { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

export default function ProjectsGalleryReact({ projects }) {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Imagen por defecto
  const defaultImg = "/project.png";

  // Configuración del slider
  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Función para obtener la imagen del proyecto o la default
  const getImg = (project) => project.data.img ? project.data.img : defaultImg;
  const getImgAlt = (project) => project.data.img_alt ? project.data.img_alt : "Imagen de proyecto";

  // Función para abrir el modal
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Función para navegar al siguiente grupo de proyectos
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    // Mantener el primer proyecto de la nueva página seleccionado
    const newSelected = (currentPage + 1) * projectsPerPage;
    setSelected(newSelected < projects.length ? newSelected : 0);
  };

  // Función para navegar al grupo anterior de proyectos
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    // Mantener el último proyecto de la nueva página seleccionado
    const newSelected = (currentPage - 1) * projectsPerPage + projectsPerPage - 1;
    setSelected(newSelected >= 0 ? newSelected : projects.length - 1);
  };

  // Función para cambiar de página desde los indicadores
  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    // Seleccionar el primer proyecto de la nueva página
    const newSelected = pageIndex * projectsPerPage;
    setSelected(newSelected < projects.length ? newSelected : 0);
  };

  // Obtener los proyectos de la página actual
  const getCurrentProjects = () => {
    const startIndex = currentPage * projectsPerPage;
    return projects.slice(startIndex, startIndex + projectsPerPage);
  };

  const currentProjects = getCurrentProjects();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Izquierda: Lista de proyectos */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 order-2 md:order-1">
          {/* Contenedor de proyectos con scroll */}
          <div className="relative min-h-[400px] px-8">
            {/* Botón anterior */}
            {totalPages > 1 && (
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 text-green"
                aria-label="Proyectos anteriores"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Proyectos */}
            <div className="flex flex-col gap-4">
              {currentProjects.map((project, idx) => {
                const globalIndex = currentPage * projectsPerPage + idx;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setSelected(globalIndex)}
                    onClick={() => openModal(project)}
                    className={`cursor-pointer transition-all duration-300 rounded-lg p-4 group overflow-hidden relative ${
                      selected === globalIndex
                        ? "bg-green/10 border-l-4 border-green scale-105 shadow-lg"
                        : "bg-white/30 dark:bg-white/10 hover:bg-green/5"
                    }`}
                    style={{ minHeight: selected === globalIndex ? "120px" : "70px" }}
                  >
                    <div className="font-bold text-lg truncate text-black dark:text-white">{project.data.title}</div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-6xl pointer-events-none select-none">
                      {selected !== globalIndex ? "→" : ""}
                    </div>
                    {selected === globalIndex && (
                      <div className="text-sm mt-3 transition-all duration-300 line-clamp-3 text-black dark:text-white">
                        {project.data.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Botón siguiente */}
            {totalPages > 1 && (
              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 text-green"
                aria-label="Siguientes proyectos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Indicadores de página */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Página {currentPage + 1} de {totalPages}</span>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    currentPage === i
                      ? "bg-green scale-125 shadow-lg"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110"
                  }`}
                  aria-label={`Ir a página ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Derecha: Imagen grande */}
        <div className="md:w-1/2 w-full flex justify-end mb-6 md:mb-0 order-1 md:order-2">
          <div className="relative group">
            <img
              src={getImg(projects[selected])}
              alt={getImgAlt(projects[selected])}
              className="rounded-xl shadow-lg max-h-96 object-contain transition-all duration-300 bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-600 hover:shadow-xl"
            />
            <div className="absolute inset-0 bg-green/0 hover:bg-green/10 rounded-xl transition-all duration-300"></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </>
  );
} 