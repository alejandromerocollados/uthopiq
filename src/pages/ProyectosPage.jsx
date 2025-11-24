import { useState, useEffect, useMemo, useRef } from 'react';
import CardProjects from '../components/Projects/CardProjects/CardProjects';
import projectsData from '../components/Projects/projectsData';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './proyectosPage.css';

const CATEGORIES = [
  { key: 'todos', label: 'Todos' },
  { key: 'landing', label: 'Landing' },
  { key: 'tienda online', label: 'Tienda online' },
  { key: 'web a medida', label: 'Web a medida' }
];

function ProyectosPage() {
  const [active, setActive] = useState('todos');
  const tabsRef = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Conteo por categoría (y visibilidad de tabs)
  const counts = useMemo(() => {
    const map = { todos: projectsData.length };
    for (const { key } of CATEGORIES) {
      if (key === 'todos') continue;
      map[key] = projectsData.filter(p => p.tags?.includes(key)).length;
    }
    return map;
  }, []);

  const visibleTabs = useMemo(
    () => CATEGORIES.filter(c => c.key === 'todos' || counts[c.key] > 0),
    [counts]
  );

  const proyectosFiltrados = useMemo(() => {
    if (active === 'todos') return projectsData;
    return projectsData.filter(p => p.tags?.includes(active));
  }, [active]);

  // Navegación con flechas
  const handleKeyDown = (e, idx) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + dir + visibleTabs.length) % visibleTabs.length;
    setActive(visibleTabs[next].key);
    tabsRef.current[next]?.focus();
  };

  return (
    <>
      <div className="proyectos-page">
        <div className="pp-header">
          <h2>Todos los proyectos</h2>
          <span className="pp-underline" aria-hidden="true"></span>
        </div>

        {/* Tabs */}
        <div className="pp-tabs" role="tablist" aria-label="Filtrar proyectos">
          {visibleTabs.map((tab, i) => {
            const isActive = active === tab.key;
            return (
                <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.key}`}
                id={`tab-${tab.key}`}
                className={`pp-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActive(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={el => (tabsRef.current[i] = el)}
                >
                <span className="pp-tab-label">
                    {tab.label}
                    {isActive && <span className="pp-tab-underline" aria-hidden="true" />}
                </span>
                <span className="pp-count">{counts[tab.key]}</span> 
                </button>
            );
            })}
        </div>

        {/* Grid */}
        <div
          className="grid-proyectos"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          {proyectosFiltrados.map((p, index) => (
            <CardProjects
              key={index}
              title={p.title}
              description={p.description}
              image={p.image}
              tags={p.tags}
              link={p.link}
              demo={p.demo}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProyectosPage;