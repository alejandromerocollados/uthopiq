// components/Banners/BeneficiosWeb.jsx
import "./banners.css";
import { useTranslation } from "react-i18next";

function BeneficiosWeb() {
  const { t } = useTranslation();

  return (
    <section className="banner-beneficios-fondo">
      <div className="banner-beneficios-container" data-aos="fade-up">
        <h2 className="banner-beneficios-title">
          {t("beneficios_web.titulo")}
        </h2>
        <ul className="banner-beneficios-lista">
          <li>
            <span>✔</span> {t("beneficios_web.b1")}
          </li>
          <li>
            <span>✔</span> {t("beneficios_web.b2")}
          </li>
          <li>
            <span>✔</span> {t("beneficios_web.b3")}
          </li>
          <li>
            <span>✔</span> {t("beneficios_web.b4")}
          </li>
          <li>
            <span>✔</span> {t("beneficios_web.b5")}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BeneficiosWeb;
