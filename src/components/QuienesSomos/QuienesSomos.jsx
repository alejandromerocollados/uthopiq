import "./quienesSomos.css";
import alejandro from "/images/alejandro.jpg";
import tomas from "/images/tomas.jpg";
import { useTranslation } from "react-i18next";

function QuienesSomos() {
  const { t } = useTranslation();

  return (
    <section className="quienes" id="quienes-somos">
      <h2 data-aos="fade-up">{t("quienes.titulo")}</h2>

      <p className="quienes-intro" data-aos="fade-up">
        En <strong>Uthopiq</strong> {t("quienes.intro")}
      </p>

      <div className="socio" data-aos="fade-up">
        <img
          src={alejandro}
          alt="Imagen de Alejandro Romero"
          data-aos="fade-up"
        />
        <div className="socio-texto">
          <h3>
            <a
              href="https://www.linkedin.com/in/alejandro-romero-collados-73667923b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alejandro Romero
            </a>
          </h3>
          <p>{t("quienes.alejandro_parrafo")}</p>
        </div>
      </div>

      <div className="socio tomas" data-aos="fade-up">
        <div className="socio-texto">
          <h3>
            <a
              href="https://www.linkedin.com/in/tom%C3%A1s-primo-rico-801498231/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tomás Primo
            </a>
          </h3>
          <p>{t("quienes.tomas_parrafo")}</p>
        </div>
        <img
          src={tomas}
          alt="Imagen de Tomás Primo"
          data-aos="fade-up"
        />
      </div>
    </section>
  );
}

export default QuienesSomos;
