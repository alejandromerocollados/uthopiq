import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import logo from "/images/logo/uthopon.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./footer.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div>
          <img src={logo} alt="UTHOPIQ Logo" className="mb-4 w-12 h-12" />
          <p className="footer-description">
            En <strong>UTHOPIQ</strong> somos especialistas en desarrollo web,
            automatización con inteligencia artificial y mentoría tecnológica.
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
          <h3 className="footer-title">Nuestros Servicios</h3>
          <ul className="footer-column">
            <li>Landing</li>
            <li>Tienda Online</li>
            <li>Web a Medida</li>
            <li>Automatizaciones</li>
            <li>Chatbots inteligentes</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Empresa</h3>
          <ul className="footer-column footer-links">
            <li>
              <button onClick={() => scrollToSection("inicio")}>Inicio</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("web")}>Web</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("automatizaciones")}>
                Automatizaciones
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("quienes-somos")}>
                Quiénes Somos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contacto")}>
                Contáctanos
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Contacto</h3>
          <div className="footer-column footer-contact">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="icon" />
              <span>Elda/Petrer, Alicante – España</span>
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
          &copy;{new Date().getFullYear()}{" "}
          <span style={{ color: "white", fontWeight: "bold" }}>Uthopiq</span>.
          Todos los derechos reservados.
        </p>
        <div className="links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
          <a href="/politica-de-cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
