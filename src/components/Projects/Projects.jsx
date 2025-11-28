import "./projects.css";
import Slider from "./Slider/Slider";
import allProjects from "./projectsData";
import { Link } from "react-router-dom";

function isAutomation(p) {
  return p.tags?.some(t => t === "automatizacion" || t === "chatbot");
}

function Projects() {
  const webProjects = allProjects.filter(p => !isAutomation(p)).slice(0, 3); 
  const automationProjects = allProjects.filter(p => isAutomation(p));

  return (
    <>
      <div className="proyectos" id="proyectos">
        <h2 data-aos="fade-up">Proyectos Realizados</h2>
        <p className="proyectos-subtitulo" data-aos="fade-up">
          Aquí algunos ejemplos de soluciones que hemos desarrollado en diseño
          web y automatización.
        </p>

        <div className="proyectos-web" data-aos="fade-up">
          {webProjects.length > 0 ? (
            <Slider projects={webProjects} />
          ) : (
            <p className="proyectos-aviso">
              Pronto añadiremos proyectos de desarrollo web.
            </p>
          )}
        </div>

        <div className="proyectos-boton-ver-todos" data-aos="fade-up">
          <Link to="/proyectos" className="cta-button-outline ver-todos-btn">
            Ver todos
          </Link>
        </div>
      </div>
    </>
  );
}

export default Projects;