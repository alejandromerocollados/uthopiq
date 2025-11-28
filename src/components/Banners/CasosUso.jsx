// components/Banners/CasosUso.jsx
import "./banners.css";
import { useTranslation } from "react-i18next";

function CasosUso() {
  const { t } = useTranslation();

  return (
    <section className="casos-uso-fondo">
      <div className="casos-uso-container" data-aos="fade-up">
        <h2 className="casos-uso-title">
          {t("casos_uso.titulo")}
        </h2>
        <ul className="casos-uso-lista">
          <li>
            <span>✔</span> {t("casos_uso.l1")}
          </li>
          <li>
            <span>✔</span> {t("casos_uso.l2")}
          </li>
          <li>
            <span>✔</span> {t("casos_uso.l3")}
          </li>
          <li>
            <span>✔</span> {t("casos_uso.l4")}
          </li>
          <li>
            <span>✔</span> {t("casos_uso.l5")}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CasosUso;