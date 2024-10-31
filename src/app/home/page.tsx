import styles from "./home.module.css";

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>Torneos</div>
        <nav className={styles.nav}>
          <a href="#about">Sobre Nosotros</a>
          <a href="#features">Características</a>
          <a href="#tournaments">Torneos</a>
          <a href="#contact">Contacto</a>
          <a href="/login" className={styles.btnLogin}>Iniciar Sesión</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>¡Bienvenido a la Plataforma de Torneos!</h1>
          <p>Gestiona tus torneos de forma fácil y efectiva.</p>
          <a href="#tournaments" className={styles.btnPrimary}>Ver Torneos</a>
        </section>

        <section id="about" className={styles.about}>
          <h2>Sobre Nosotros</h2>
          <p>Somos un equipo dedicado a facilitar la organización de torneos de todo tipo, desde deportes hasta juegos en línea.</p>
        </section>

        <section id="features" className={styles.features}>
          <h2>Características</h2>
          <ul>
            <li>Creación de torneos personalizados</li>
            <li>Gestión de participantes</li>
            <li>Seguimiento de resultados en tiempo real</li>
            <li>Soporte para múltiples formatos de torneo</li>
          </ul>
        </section>

        <section id="tournaments" className={styles.tournaments}>
          <h2>Torneos Actuales</h2>
          <div className={styles.tournamentList}>
            <div className={styles.tournament}>
              <h3>Torneo de Fútbol 2024</h3>
              <p>Fecha: 15 de Noviembre 2024</p>
              <a href="#" className={styles.btnSecondary}>Detalles</a>
            </div>
            <div className={styles.tournament}>
              <h3>Torneo de Ajedrez 2024</h3>
              <p>Fecha: 20 de Diciembre 2024</p>
              <a href="#" className={styles.btnSecondary}>Detalles</a>
            </div>
            {/* Agrega más torneos según sea necesario */}
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <h2>Contacto</h2>
          <p>¿Tienes preguntas? Contáctanos a través de nuestro <a href="mailto:info@torneos.com">correo electrónico</a>.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Torneos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
