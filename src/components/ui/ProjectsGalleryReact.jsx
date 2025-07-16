import React, { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

export default function ProjectsGalleryReact({ projects }) {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Imagen por defecto
  const defaultImg = "/project.png";

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

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Izquierda: Lista de proyectos */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 order-2 md:order-1">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setSelected(idx)}
              onClick={() => openModal(project)}
              className={`cursor-pointer transition-all duration-300 rounded-lg p-4 group overflow-hidden relative ${
                selected === idx
                  ? "bg-green/10 border-l-4 border-green scale-105 shadow-lg"
                  : "bg-white/30 dark:bg-white/10 hover:bg-green/5"
              }`}
              style={{ minHeight: selected === idx ? "120px" : "70px" }}
            >
              <div className="font-bold text-lg truncate text-black dark:text-white">{project.data.title}</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-6xl pointer-events-none select-none">
                {selected !== idx ? "→" : ""}
              </div>
              {selected === idx && (
                <div className="text-sm mt-3 transition-all duration-300 line-clamp-3 text-black dark:text-white">
                  {project.data.description}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Derecha: Imagen grande */}
        <div className="md:w-1/2 w-full flex justify-end mb-6 md:mb-0 order-1 md:order-2">
          <img
            src={getImg(projects[selected])}
            alt={getImgAlt(projects[selected])}
            className="rounded-xl shadow-lg max-h-96 object-contain transition-all duration-300 bg-white/80 dark:bg-white/10"
          />
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