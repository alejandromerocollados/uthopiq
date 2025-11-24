import "./politicacookies.css";

const PoliticaCookies = () => {
  return (
    <main className="legal-page">

        <h1>Política de Cookies</h1>

        {/* INTRODUCCIÓN */}
        <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica
        3/2018 (LOPDGDD) y la Ley 34/2002 de Servicios de la Sociedad de la
        Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios
        de que el sitio web <strong>https://uthopiq.com</strong> utiliza cookies
        propias y de terceros con fines técnicos, analíticos y de personalización.
        </p>

        <p>
        Las cookies permiten mejorar tu experiencia de navegación, analizar el
        tráfico y adaptar los contenidos mostrados en el sitio web.
        </p>

        {/* 1. QUÉ SON */}
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
        Una cookie es un pequeño archivo de texto que se almacena en tu navegador
        cuando visitas una página web. Sirve para recordar cierta información
        sobre tu visita, como tus preferencias de navegación, si has iniciado sesión
        o si has aceptado el uso de cookies.
        </p>
        <p>
        El uso de cookies <strong>no proporciona datos personales identificativos</strong>
        por sí mismo, ya que el usuario navega de forma anónima salvo que proporcione
        datos voluntarios.
        </p>

        {/* 2. TIPOS DE COOKIES */}
        <h2>2. ¿Qué tipos de cookies utilizamos?</h2>

        <h3>Cookies técnicas (propias)</h3>
        <p>
        Son imprescindibles para el funcionamiento básico del sitio web: navegación,
        carga de elementos, seguridad y recordar el consentimiento de cookies.
        No requieren el consentimiento del usuario.
        </p>

        <h3>Cookies de análisis (terceros)</h3>
        <p>
        Permiten obtener información anónima sobre el comportamiento del usuario
        en la web: páginas más visitadas, tiempo de permanencia, dispositivo de acceso,
        origen del tráfico, etc. Ayudan a mejorar el rendimiento del sitio.
        </p>

        <h3>Cookies de terceros</h3>
        <p>
        Son cookies gestionadas por proveedores externos —por ejemplo sistemas de chat,
        herramientas de analítica o integraciones adicionales—. No contienen datos
        personales asociados al usuario.
        </p>

        {/* 3. LISTADO DE COOKIES */}
        <h2>3. Cookies utilizadas en este sitio web</h2>
        <p>A continuación se detalla la cookie utilizada actualmente por Uthopiq:</p>

        <div className="legal-table-wrapper">
        <table className="legal-table">
            <thead>
            <tr>
                <th>Cookie</th>
                <th>Proveedor</th>
                <th>Finalidad</th>
                <th>Duración</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>uthopiqCookies</td>
                <td>Uthopiq</td>
                <td>Guardar el estado del consentimiento de cookies.</td>
                <td>180 días</td>
            </tr>
            </tbody>
        </table>
        </div>

        {/* 4. GESTIÓN */}
        <h2>4. ¿Cómo puedo gestionar o desactivar las cookies?</h2>
        <p>
        Puedes aceptar o rechazar las cookies no necesarias mediante el banner
        mostrado al acceder a la web. También puedes configurar tu navegador
        para bloquear o eliminar cookies ya instaladas.
        </p>
        <p>
        Ten en cuenta que desactivar ciertas cookies puede afectar al
        funcionamiento de la web o a tu experiencia de usuario.
        </p>

        {/* 5. NAVEGADORES */}
        <h2>5. ¿Cómo borrar las cookies en los principales navegadores?</h2>
        <p>Puedes administrar las cookies desde la configuración de tu navegador mediante los siguientes enlaces oficiales:</p>

        <ul>
            <li>
                <a
                href="https://support.google.com/chrome/answer/95647?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                >
                Google Chrome – Cómo administrar cookies
                </a>
            </li>

            <li>
                <a
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                target="_blank"
                rel="noopener noreferrer"
                >
                Mozilla Firefox – Configuración de cookies
                </a>
            </li>

            <li>
                <a
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                >
                Microsoft Edge – Administración de cookies
                </a>
            </li>

            <li>
                <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                >
                Apple Safari – Eliminar y administrar cookies
                </a>
            </li>
        </ul>

        {/* 6. ACTUALIZACIONES */}
        <h2>6. Actualización de la política de cookies</h2>
        <p>
        Esta Política de Cookies puede actualizarse para adaptarse a cambios
        legislativos o técnicos. Recomendamos revisarla periódicamente.
        </p>

        {/* 7. RESPONSABLE */}
        <h2>7. Datos del responsable</h2>
        <p>
        <strong>Responsable:</strong> Uthopiq<br />
        <strong>Web: </strong>
        <a href="https://uthopiq.com">uthopiq.com</a><br />
        <strong>Correo electrónico:</strong> contacto@uthopiq.com<br />
        </p>
    </main>
  );
};

export default PoliticaCookies;