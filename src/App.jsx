import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Hero from "./components/Hero/Hero.jsx";
import PlanesWeb from "./components/Planes/Planes.jsx";
import Automatizaciones from "./components/Planes/PlanesAutomatizacion.jsx";
import Contacto from "./components/Contacto/Contacto.jsx";
import QuienesSomos from "./components/QuienesSomos/QuienesSomos.jsx";
import Proyectos from "./components/Projects/Projects.jsx";
import ChatWidget from "./components/Chatbot/ChatWidget";
import PaginaProyectos from "./pages/ProyectosPage.jsx";
import AOS from "aos";
import { useEffect } from "react";
import CasosUso from "./components/Banners/CasosUso";
import BeneficiosWeb from "./components/Banners/BeneficiosWeb.jsx";
import CoverflowSection from "./components/Agents/CoverflowSection";
import GlobalBackground from "./components/GlobalBackground.jsx";
import { HelmetProvider, Helmet } from "@vuer-ai/react-helmet-async";
import CookieConsent from "react-cookie-consent";
import PoliticaCookies from "./pages/PoliticaCookies.jsx";

function App() {
  // Scroll suave reutilizable
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <GlobalBackground />

      <HelmetProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Helmet>
                    <title>Uthopiq | Agencia IA y Desarrollo Web</title>
                    <meta
                      name="description"
                      content="Uthopiq crea sitios web modernos y automatiza procesos con inteligencia artificial. Potencia tu negocio con soluciones digitales inteligentes 24/7."
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://uthopiq.com" />
                    <meta
                      property="og:title"
                      content="Uthopiq | Agencia IA y Desarrollo Web"
                    />
                    <meta
                      property="og:description"
                      content="Uthopiq desarrolla sitios web y automatizaciones con IA para impulsar la eficiencia de tu empresa."
                    />
                    <meta
                      property="og:image"
                      content="https://uthopiq.com/images/uthopon.png"
                    />
                    <meta property="og:site_name" content="Uthopiq" />
                    <meta property="og:locale" content="es_ES" />

                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "Uthopiq",
                        url: "https://uthopiq.com",
                        logo: "https://uthopiq.com/images/uthopon.png",
                        sameAs: [
                          "https://www.instagram.com/uthopiq",
                          "https://www.linkedin.com/company/uthopiq",
                        ],
                        description:
                          "Uthopiq es una agencia de desarrollo web y automatización con inteligencia artificial.",
                      })}
                    </script>

                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        url: "https://uthopiq.com",
                        name: "Uthopiq",
                        potentialAction: {
                          "@type": "SearchAction",
                          target:
                            "https://uthopiq.com/?s={search_term_string}",
                          "query-input": "required name=search_term_string",
                        },
                      })}
                    </script>
                  </Helmet>

                  <Navbar />
                  <Hero scrollToSection={scrollToSection} />
                  <PlanesWeb />
                  <BeneficiosWeb />
                  <Proyectos />
                  <Automatizaciones />
                  <CasosUso />
                  <CoverflowSection />
                  <QuienesSomos />
                  <Contacto />
                  <ChatWidget />
                  <Footer />
                </>
              }
            />

            <Route
              path="/proyectos"
              element={
                <>
                  <Helmet>
                    <title>
                      Proyectos | Uthopiq – Desarrollo Web & Automatización IA
                    </title>
                    <meta
                      name="description"
                      content="Descubre los proyectos de Uthopiq: sitios web profesionales, automatizaciones con inteligencia artificial y soluciones tecnológicas a medida."
                    />

                    <meta property="og:type" content="website" />
                    <meta
                      property="og:url"
                      content="https://uthopiq.com/proyectos"
                    />
                    <meta property="og:title" content="Proyectos | Uthopiq" />
                    <meta
                      property="og:description"
                      content="Conoce cómo Uthopiq ayuda a empresas a digitalizarse con desarrollo web y automatización inteligente."
                    />
                    <meta
                      property="og:image"
                      content="https://uthopiq.com/images/uthopon.png"
                    />
                  </Helmet>

                  <Navbar />
                  <PaginaProyectos />
                  <Footer />
                </>
              }
            />
            <Route
              path="/politica-de-cookies"
              element={
                <>
                  <Helmet>
                    <title>Política de Cookies | Uthopiq</title>
                    <meta
                      name="description"
                      content="Consulta la Política de Cookies de Uthopiq, agencia de desarrollo web y automatización con inteligencia artificial."
                    />
                    <meta property="og:type" content="website" />
                    <meta
                      property="og:url"
                      content="https://uthopiq.com/politica-de-cookies"
                    />
                    <meta
                      property="og:title"
                      content="Política de Cookies | Uthopiq"
                    />
                    <meta
                      property="og:description"
                      content="Información sobre el uso de cookies en el sitio web de Uthopiq."
                    />
                    <meta
                      property="og:image"
                      content="https://uthopiq.com/images/uthopon.png"
                    />
                  </Helmet>
                  <Navbar />
                  <PoliticaCookies />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </HelmetProvider>

      <CookieConsent debug={false}
        location="bottom"
        buttonText="Aceptar"
        declineButtonText="Rechazar"
        enableDeclineButton
        cookieName="uthopiqCookies"
        style={{
          background: "var(--negro)",
          color: "var(--blanco)",
          fontFamily: "Inter-regular",
          borderTop: "1px solid var(--gris-oscuro)",
          zIndex: "12000",
          padding: "18px 20px",
        }}
        contentStyle={{
          margin: "0 auto",
          maxWidth: "1400px",
          fontFamily: "Inter-regular",
          fontSize: "15px",
          lineHeight: "1.5",
        }}
        buttonStyle={{
          background: "var(--rojo-primario)",
          color: "var(--blanco)",
          borderRadius: "8px",
          padding: "8px 20px",
          fontFamily: "Inter-regular",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
        declineButtonStyle={{
          background: "transparent",
          color: "var(--blanco)",
          borderRadius: "8px",
          padding: "8px 20px",
          fontFamily: "Inter-regular",
          border: "1px solid var(--blanco)",
          cursor: "pointer",
        }}
        expires={365}
      >
        Usamos cookies propias y de terceros para analizar el tráfico y mejorar tu
        experiencia.{" "}
        <a
          href="/politica-de-cookies"
          style={{
            color: "var(--rojo-primario)",
            textDecoration: "underline",
            fontFamily: "Inter-regular",
          }}
        >
          Más información
        </a>
      </CookieConsent>
    </>
  );
}

export default App;