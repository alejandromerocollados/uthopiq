import "./hero.css";
import { useTranslation } from "react-i18next";

function Hero({ scrollToSection }) {
  const { t } = useTranslation();

  return (
    <div className="hero-wrapper" id="inicio">
      <div className="hero-container container mx-auto px-4 min-h-[calc(100svh-72px)] flex flex-col justify-center md:justify-center sm:justify-start pt-4 md:pt-8">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl mb-4">
            <span className="hero-title-white">
              {t("hero.titulo_blanco")}
            </span>
            <br />
            <span className="hero-title-red">
              {t("hero.titulo_rojo")}
            </span>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg md:text-lg max-w-1xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitulo")}
          </p>

          {/* Botón CTA */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button
              className="cta-button-outline px-6 py-3 rounded-md font-medium text-lg"
              onClick={() => scrollToSection("contacto")}
            >
              {t("hero.cta")}
            </button>
          </div>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 text-center px-4">
          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              {t("hero.beneficio1_titulo")}
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              {t("hero.beneficio1_texto")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              {t("hero.beneficio2_titulo")}
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              {t("hero.beneficio2_texto")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="benefit-title text-lg sm:text-xl mb-2">
              {t("hero.beneficio3_titulo")}
            </h3>
            <p className="benefit-text text-sm sm:text-base leading-relaxed max-w-md">
              {t("hero.beneficio3_texto")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;