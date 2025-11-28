import "./cardProjects.css";
import { useTranslation } from "react-i18next";

const TYPE_CLASS_BY_CATEGORY = {
  landing: "landing",
  tienda_online: "tienda-online",
  web_a_medida: "web-medida",
};

function getCategoryKeyFromTags(tags = []) {
  if (tags.includes("landing")) return "landing";
  if (tags.includes("tienda online")) return "tienda_online";
  if (tags.includes("web a medida")) return "web_a_medida";
  return null;
}

function CardProjects({
  title,
  image,
  description = "",
  tags = [],
  link,
  demo,
}) {
  const { t } = useTranslation();

  const categoryKey = getCategoryKeyFromTags(tags);
  const typeLabel = categoryKey
    ? t(`proyectos.categorias.${categoryKey}`)
    : "";
  const typeClass = categoryKey ? TYPE_CLASS_BY_CATEGORY[categoryKey] : "";
  const showVisit = !!link;

  return (
    <article className="card-project" tabIndex={0}>
      <div className="card-project-media">
        <img src={image} alt={title} loading="lazy" />
        {demo && <div className="demo-label">DEMO</div>}
      </div>

      <div className="card-project-content">
        <div className="card-project-header">
          <h4 className="card-project-title">{title}</h4>

          {typeLabel && (
            <span className={`card-project-type ${typeClass}`}>
              {typeLabel}
            </span>
          )}
        </div>

        {description && (
          <p className="card-project-description">{description}</p>
        )}

        <div className="card-project-footer">
          {showVisit && (
            <a
              className="card-project-link"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("proyectos.boton_ver_proyecto")} ${title}`}
            >
              {t("proyectos.boton_ver_proyecto")} <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default CardProjects;