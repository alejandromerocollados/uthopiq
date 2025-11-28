// components/Navbar/MobileNavbarLinks.jsx
import { useTranslation } from "react-i18next";

function MobileNavbarLinks({
  open,
  cerrarMenu,
  scrollToSection,
  changeLanguage,
  currentLang,
}) {
  const { t } = useTranslation();
  const lang = (currentLang || "es").slice(0, 2);

  const toggleLanguage = () => {
    const next = lang === "es" ? "en" : "es";
    changeLanguage(next);
  };

  return (
    <div className={`navbar-links-container ${open ? "open" : ""}`}>
      <ul className="navbar-links">
        {/* LINKS DE NAVEGACIÓN */}
        <li>
          <button
            onClick={() => {
              scrollToSection("web");
              cerrarMenu();
            }}
          >
            {t("navbar.web")}
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              scrollToSection("automatizaciones");
              cerrarMenu();
            }}
          >
            {t("navbar.automatizaciones")}
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              scrollToSection("quienes-somos");
              cerrarMenu();
            }}
          >
            {t("navbar.quienes_somos")}
          </button>
        </li>

        <li>
          <a href="https://blog.uthopiq.com/" target="_blank" rel="noreferrer">
            <button>{t("navbar.blog")}</button>
          </a>
        </li>

        {/* SELECTOR IDIOMA TIPO TRANSFER2RIDE */}
        <li className="navbar-lang-mobile">
          <button
            type="button"
            className="lang-flag-toggle"
            onClick={toggleLanguage}
            aria-label={lang === "es" ? "Cambiar a English" : "Cambiar a Español"}
          >
            <img
              src={
                lang === "es"
                  ? "/images/banderas/espana.png"
                  : "/images/banderas/reino-unido.png"
              }
              alt={lang === "es" ? "Español" : "English"}
            />
          </button>
        </li>

        {/* CTA */}
        <li className="navbar-cta-mobile">
          <button
            className="cta-button-outline px-8 py-4 rounded-lg text-lg border-2 text-center w-full"
            onClick={() => {
              scrollToSection("contacto");
              cerrarMenu();
            }}
          >
            {t("navbar.cta")}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default MobileNavbarLinks;