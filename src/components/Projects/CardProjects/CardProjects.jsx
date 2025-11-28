import './cardProjects.css';

const CATEGORY_LABELS = {
  'landing': 'Landing',
  'tienda online': 'Tienda online',
  'web a medida': 'Web a medida',
};

const TYPE_CLASS_BY_CATEGORY = {
  'landing': 'landing',
  'tienda online': 'tienda-online',
  'web a medida': 'web-medida',
};

function getCategoryFromTags(tags = []) {
  // Devuelve la primera categoría que encuentre en los tags
  if (tags.includes('landing')) return 'landing';
  if (tags.includes('tienda online')) return 'tienda online';
  if (tags.includes('web a medida')) return 'web a medida';
  return null;
}

function CardProjects({
  title,
  image,
  description = '',
  tags = [],
  link,
  demo,
}) {
  const categoryKey = getCategoryFromTags(tags);
  const typeLabel = CATEGORY_LABELS[categoryKey] || '';
  const typeClass = TYPE_CLASS_BY_CATEGORY[categoryKey] || '';
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
              aria-label={`Ver proyecto de ${title}`}
            >
              Ver proyecto <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default CardProjects;