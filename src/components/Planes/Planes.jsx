// components/Planes/Planes.jsx
import "./planes.css";
import CardPlan from "./CardPlan/CardPlan";
import planesData from "./planesData";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function Planes() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const goToSection = () => {
      const interval = setInterval(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 100);
    };

    if (!location.pathname.startsWith("/en") && location.pathname !== "/") {
      navigate("/");
      setTimeout(goToSection, 200);
    } else if (location.pathname.startsWith("/en") && location.pathname !== "/en") {
      navigate("/en");
      setTimeout(goToSection, 200);
    } else {
      goToSection();
    }
  };

  return (
    <section className="planes" id="web">
      <div className="planes-header" data-aos="fade-up">
        <span className="planes-subtitle">
          {t("planes_web.subtitulo")}
        </span>
        <h2>{t("planes_web.titulo")}</h2>
        <p className="planes-descripcion">
          {t("planes_web.descripcion")}
        </p>
      </div>

      <div className="planes-grid" data-aos="fade-up">
        {planesData.map((plan) => (
          <CardPlan key={plan.clave} clave={plan.clave} />
        ))}
      </div>

      <div className="planes-boton-container" data-aos="fade-up">
        <button
          className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
          onClick={() => scrollToSection("contacto")}
        >
          {t("planes_web.cta")}
        </button>
      </div>
    </section>
  );
}

export default Planes;
