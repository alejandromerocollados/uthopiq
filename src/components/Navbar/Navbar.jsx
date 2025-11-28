// components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imagenUthopon from "/images/logo/LOGO_CORPORATIVO_OSCURO_NO_BG(1).png";
import DesktopNavbarLinks from "./DesktopNavbarLinks";
import MobileNavbarLinks from "./MobileNavbarLinks";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  // Idioma actual (es / en)
  const currentLang = (i18n.resolvedLanguage || i18n.language || "es").slice(
    0,
    2
  );

  // Home según idioma
  const homePath = currentLang === "en" ? "/en" : "/";

  // estás en la página de proyectos (español o inglés)
  const enFormulario =
    location.pathname === "/proyectos" ||
    location.pathname === "/en/projects";

  const cerrarMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    const goTop = () => {
      setTimeout(scrollToTop, 0);
    };

    if (location.pathname !== homePath) {
      navigate(homePath);
      setTimeout(goTop, 200);
    } else {
      goTop();
    }

    cerrarMenu();
  };

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

    if (location.pathname !== homePath) {
      navigate(homePath);
      setTimeout(goToSection, 200);
    } else {
      goToSection();
    }

    cerrarMenu();
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      html.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
      html.style.height = "";
    }
  }, [menuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);

    if (lng === "en") {
      if (location.pathname !== "/en") navigate("/en");
    } else {
      if (location.pathname !== "/") navigate("/");
    }
  };

  return (
    <>
      <nav
        className={`navbar ${
          scrolled ? "navbar-solid" : "navbar-transparent"
        }`}
      >
        <div className="navbar-left">
          <Link to={homePath} aria-label="Ir al inicio" onClick={handleLogoClick}>
            <div className="logo-container">
              <img src={imagenUthopon} alt="Logo Uthopiq" className="logo" />
            </div>
          </Link>
        </div>

        <div className="navbar-center">
          <DesktopNavbarLinks
            scrollToSection={scrollToSection}
            cerrarMenu={cerrarMenu}
          />
        </div>

        <div className="navbar-right">
          {/* Selector de idioma con banderas - SOLO DESKTOP */}
          <div className="navbar-lang-switcher navbar-lang-desktop">
            <button
              type="button"
              className="lang-toggle"
              onClick={() => setLangOpen((prev) => !prev)}
            >
              <img
                src={
                  currentLang === "es"
                    ? "/images/banderas/espana.png"
                    : "/images/banderas/reino-unido.png"
                }
                alt={currentLang === "es" ? "Español" : "English"}
                className="lang-flag-img"
              />
              <span className="lang-code">
                {currentLang === "es" ? "ES" : "EN"}
              </span>
              <span className="lang-chevron">▾</span>
            </button>

            {langOpen && (
              <ul className="lang-menu">
                <li>
                  <button type="button" onClick={() => changeLanguage("es")}>
                    <img
                      src="/images/banderas/espana.png"
                      alt="Español"
                      className="lang-flag-img"
                    />
                    <span>Español</span>
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => changeLanguage("en")}>
                    <img
                      src="/images/banderas/reino-unido.png"
                      alt="English"
                      className="lang-flag-img"
                    />
                    <span>English</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="navbar-cta-desktop">
            <button
              className="cta-button-outline px-8 py-4 rounded-lg font-medium text-lg border-2"
              onClick={() => scrollToSection("contacto")}
            >
              {t("navbar.cta")}
            </button>
          </div>
        </div>

        <button
          className={`navbar-hamburguesa ${menuOpen ? "cerrar" : "abrir"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="icon">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <MobileNavbarLinks
          open={menuOpen}
          cerrarMenu={cerrarMenu}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
          scrollToSection={scrollToSection}
          enFormulario={enFormulario}
          changeLanguage={changeLanguage}
          currentLang={currentLang}
        />
      </nav>

      {menuOpen && <div className="overlay" onClick={cerrarMenu}></div>}
    </>
  );
}

export default Navbar;