// components/Planes/PlanesAutomatizacion.jsx
import "./planes.css";
import CardPlan from "./CardPlan/CardPlan";
import automatizacionData from "./automatizacionData";
import { useTranslation } from "react-i18next";

function PlanesAutomatizacion() {
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="planes automatizacion-central" id="automatizaciones">
      <div className="planes-header" data-aos="fade-up">
        <span className="planes-subtitle">
          {t("planes_automatizacion.subtitulo")}
        </span>
        <h2>{t("planes_automatizacion.titulo")}</h2>
        <p className="planes-descripcion">
          {t("planes_automatizacion.descripcion")}
        </p>
      </div>

      <div className="planes-grid" data-aos="fade-up">
        {automatizacionData.map((plan) => (
          <CardPlan
            key={plan.clave}
            clave={plan.clave}
            grupo="automatizacion_data"
          />
        ))}
      </div>

      <div className="planes-boton-container" data-aos="zoom-in">
        <button
          className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
          onClick={() => scrollToSection("contacto")}
        >
          {t("planes_automatizacion.cta")}
        </button>
      </div>
    </section>
  );
}

export default PlanesAutomatizacion;