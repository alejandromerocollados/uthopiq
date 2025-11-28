import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import logo from "/images/logo/uthopon.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./footer.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = (i18n.resolvedLanguage || i18n.language || "es").slice(
    0,
    2
  );
  const basePath = currentLang === "en" ? "/en" : "/";

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

    if (location.pathname !== basePath) {
      navigate(basePath);
      setTimeout(goToSection, 200);
    } else {
      goToSection();
    }
  };

  const cookiesHref =
    currentLang === "en" ? "/en/cookie-policy" : "/politica-de-cookies";

  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div>
          <img src={logo} alt="UTHOPIQ Logo" className="mb-4 w-12 h-12" />
          <p className="footer-description">
            {t("footer.descripcion_parte1")}{" "}
            <strong>UTHOPIQ</strong> {t("footer.descripcion_parte2")}
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/uthopiq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/uthopiq-agencia-ia-desarrollo-web/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">{t("footer.servicios_titulo")}</h3>
          <ul className="footer-column">
            <li>{t("footer.servicios.landing")}</li>
            <li>{t("footer.servicios.tienda_online")}</li>
            <li>{t("footer.servicios.web_medida")}</li>
            <li>{t("footer.servicios.automatizaciones")}</li>
            <li>{t("footer.servicios.chatbots")}</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">{t("footer.empresa_titulo")}</h3>
          <ul className="footer-column footer-links">
            <li>
              <button onClick={() => scrollToSection("inicio")}>
                {t("footer.empresa_inicio")}
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("web")}>
                {t("footer.empresa_web")}
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("automatizaciones")}>
                {t("footer.empresa_automatizaciones")}
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quienes-somos")}>
                {t("footer.empresa_quienes_somos")}
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contacto")}>
                {t("footer.empresa_contacto")}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">{t("footer.contacto_titulo")}</h3>
          <div className="footer-column footer-contact">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="icon" />
              <span>{t("footer.contacto_ciudad")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="icon" />
              <a href="mailto:contacto@uthopiq.com">contacto@uthopiq.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-separator" />

      <div className="footer-bottom">
        <p>
          &copy;{year}{" "}
          <span style={{ color: "white", fontWeight: "bold" }}>Uthopiq</span>.{" "}
          {t("footer.bottom_derechos")}
        </p>
        <div className="links">
          <a href="#">{t("footer.link_privacidad")}</a>
          <a href="#">{t("footer.link_terminos")}</a>
          <a href={cookiesHref}>{t("footer.link_cookies")}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
