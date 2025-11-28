import CoverflowCarousel from "./CoverflowCarousel";
import "./agents.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const agents = [
  {
    id: 3,
    clave: "axel",
    image: "/images/agentes/consultor-negocio.png",
    accent: "#d38a0bff",
    backA: "rgba(66, 47, 19, 0.55)",
    backB: "rgba(30, 24, 12, 0.6)",
    backC: "rgba(22, 18, 8, 0.7)",
  },
  {
    id: 1,
    clave: "ena",
    image: "/images/agentes/gestor-reservas.png",
    accent: "#1e15c7ff",
    backA: "rgba(40, 32, 70, 0.55)",
    backB: "rgba(20, 16, 35, 0.6)",
    backC: "rgba(15, 12, 25, 0.7)",
  },
  {
    id: 2,
    clave: "milo",
    image: "/images/agentes/gestor-recordatorios.png",
    accent: "#ff86cdff",
    backA: "rgba(66, 22, 22, 0.55)",
    backB: "rgba(30, 12, 12, 0.6)",
    backC: "rgba(22, 8, 8, 0.7)",
  },
  {
    id: 5,
    clave: "lynk",
    image: "/images/agentes/chatbot.png",
    accent: "#047a00ff",
    backA: "rgba(10, 40, 50, 0.55)",
    backB: "rgba(8, 22, 28, 0.6)",
    backC: "rgba(6, 18, 24, 0.7)",
  },
  {
    id: 7,
    clave: "vex",
    image: "/images/agentes/gestor-rrss.png",
    accent: "#cdd8ebff",
    backA: "rgba(18, 34, 66, 0.55)",
    backB: "rgba(12, 18, 30, 0.6)",
    backC: "rgba(8, 12, 22, 0.7)",
  },
  {
    id: 4,
    clave: "nero",
    image: "/images/agentes/asistente-voz.png",
    accent: "#492a9cff",
    backA: "rgba(19, 35, 32, 0.55)",
    backB: "rgba(10, 16, 16, 0.6)",
    backC: "rgba(9, 14, 14, 0.7)",
  },
  {
    id: 6,
    clave: "aron",
    image: "/images/agentes/gestor-facturas.png",
    accent: "#cc0404ff",
    backA: "rgba(56, 20, 30, 0.55)",
    backB: "rgba(28, 12, 16, 0.6)",
    backC: "rgba(20, 9, 12, 0.7)",
  },
];

export default function CoverflowSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(goToSection, 200);
    } else {
      goToSection();
    }
  };

  const translatedAgents = agents.map((agent) => ({
    ...agent,
    name: t(`agentes.cards.${agent.clave}.nombre`),
    role: t(`agentes.cards.${agent.clave}.rol`),
    description: t(`agentes.cards.${agent.clave}.descripcion`),
  }));

  return (
    <section className="agents" id="team">
      <div className="agents-header" data-aos="fade-up">
        <h2>{t("agentes.titulo")}</h2>
        <p className="agents-descripcion">
          {t("agentes.descripcion")}
        </p>
      </div>

      <div data-aos="fade-up">
        <CoverflowCarousel items={translatedAgents} initialIndex={3} />
      </div>

      <div className="agents-boton-container" data-aos="fade-up">
        <button
          onClick={() => scrollToSection("contacto")}
          className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
        >
          {t("agentes.cta")}
        </button>
      </div>
    </section>
  );
}