// components/Planes/CardPlan/CardPlan.jsx
import "./cardPlan.css";
import { useTranslation } from "react-i18next";

function CardPlan({ clave, grupo = "planes_data", className = "" }) {
  const { t } = useTranslation();

  return (
    <div className={`card-plan ${className}`}>
      <div className="card-plan-body">
        <h3>{t(`${grupo}.${clave}.titulo`)}</h3>

        <p className="card-plan-description">
          {t(`${grupo}.${clave}.descripcion`)}
        </p>

        <ul className="card-plan-list">
          <li>✔ {t(`${grupo}.${clave}.f1`)}</li>
          <li>✔ {t(`${grupo}.${clave}.f2`)}</li>
          <li>✔ {t(`${grupo}.${clave}.f3`)}</li>
        </ul>
      </div>
    </div>
  );
}

export default CardPlan;
