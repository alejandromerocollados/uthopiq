// components/Navbar/DesktopNavbarLinks.jsx
import { useTranslation } from "react-i18next";

function DesktopNavbarLinks({ scrollToSection }) {
  const { t } = useTranslation();

  return (
    <ul className="navbar-links-desktop">
      <li className="dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => scrollToSection("web")}
        >
          {t("navbar.web")}
        </button>
      </li>

      <li>
        <button onClick={() => scrollToSection("automatizaciones")}>
          {t("navbar.automatizaciones")}
        </button>
      </li>

      <li>
        <button onClick={() => scrollToSection("quienes-somos")}>
          {t("navbar.quienes_somos")}
        </button>
      </li>

      <li>
        <a href="https://blog.uthopiq.com/" target="_blank" rel="noreferrer">
          <button>{t("navbar.blog")}</button>
        </a>
      </li>
    </ul>
  );
}

export default DesktopNavbarLinks;