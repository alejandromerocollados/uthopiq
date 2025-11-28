// components/Projects/Projects.jsx
import "./projects.css";
import Slider from "./Slider/Slider";
import allProjects from "./projectsData";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function isAutomation(p) {
  return p.tags?.some((t) => t === "automatizacion" || t === "chatbot");
}

function Projects() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "es").slice(
    0,
    2
  );

  const webProjects = allProjects.filter((p) => !isAutomation(p)).slice(0, 3);
  const automationProjects = allProjects.filter((p) => isAutomation(p));

  const allProjectsPath =
    currentLang === "en" ? "/en/projects" : "/proyectos";

  // Mapeamos data + textos traducidos
  const webProjectsWithTexts = webProjects.map((p) => ({
    ...p,
    title: t(`proyectos.cards.${p.id}.titulo`),
    description: t(`proyectos.cards.${p.id}.descripcion`),
  }));

  return (
    <div className="proyectos" id="proyectos">
      <h2 data-aos="fade-up">{t("proyectos.titulo")}</h2>

      <p className="proyectos-subtitulo" data-aos="fade-up">
        {t("proyectos.subtitulo")}
      </p>

      <div className="proyectos-web" data-aos="fade-up">
        {webProjectsWithTexts.length > 0 ? (
          <Slider projects={webProjectsWithTexts} />
        ) : (
          <p className="proyectos-aviso">{t("proyectos.aviso_sin_webs")}</p>
        )}
      </div>

      <div className="proyectos-boton-ver-todos" data-aos="fade-up">
        <Link
          to={allProjectsPath}
          className="cta-button-outline ver-todos-btn"
        >
          {t("proyectos.cta_ver_todos")}
        </Link>
      </div>
    </div>
  );
}

export default Projects;