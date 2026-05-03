document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================================
     SECCION HEADER: Tema DIA / NOCHE
     ========================================================================= */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("moon-icon");
  const sunIcon = document.getElementById("sun-icon");

  // Revisar si el usuario ya tenía una preferencia guardada (por defecto oscuro)
  const currentTheme = localStorage.getItem("theme") || "dark";

  // Aplicar el tema guardado al cargar la página
  if (currentTheme === "light") {
    document.body.setAttribute("data-theme", "light");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }

  // Lógica para alternar el tema al hacer clic
  themeToggleBtn.addEventListener("click", () => {
    let theme = document.body.getAttribute("data-theme");

    if (theme === "light") {
      // Cambiar a modo oscuro
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
    } else {
      // Cambiar a modo claro
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      moonIcon.classList.add("hidden");
      sunIcon.classList.remove("hidden");
    }
  });

  /* =========================================================================
     SECCION HEADER: Menu plegable
     ========================================================================= */
  // --- LÓGICA DEL MENÚ HAMBURGUESA ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a");

  // Alternar menú al hacer clic en la hamburguesa
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Cerrar el menú al hacer clic en cualquier enlace (ideal para páginas de una sola vista)
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  /* =========================================================================
     SECCION Servicios: Menu Acordeon tarjetas
     ========================================================================= */

  // --- LÓGICA DE LAS TARJETAS DE SERVICIOS (ACORDEÓN) ---
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      // OPCIONAL: Descomenta las siguientes 3 líneas si quieres que
      // al abrir una tarjeta, se cierren automáticamente las demás.
      /*
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('expanded');
            });
            */

      // Alterna la clase 'expanded' en la tarjeta clickeada
      card.classList.toggle("expanded");
    });

    // Accesibilidad: Permitir expandir con la tecla Enter si se navega con teclado
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        card.classList.toggle("expanded");
      }
    });
  });
});
