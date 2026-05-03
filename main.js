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

  /* =========================================================================
     SECCION Agendar:Paso 1
     ========================================================================= */

  // Referencias a los pasos
  const paso1 = document.getElementById("paso-1");
  const paso2 = document.getElementById("paso-2");

  // Botones de navegación
  const btnEmpezar = document.getElementById("btn-empezar");

  // Lógica para ir del Paso 1 al Paso 2
  if (btnEmpezar) {
    btnEmpezar.addEventListener("click", () => {
      // Ocultamos el paso 1
      paso1.classList.remove("active");

      // Mostramos el paso 2
      paso2.classList.add("active");

      // Opcional: Subir el scroll suavemente al inicio del contenedor
      document
        .querySelector(".wizard-section")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  /* =========================================================================
     SECCION Agendar:Paso 2
     ========================================================================= */

  // --- DATOS DE LOS PROFESIONALES SEGÚN TEMA ---
  const profesionales = {
    finanzas: {
      initials: "FM",
      badge: "Finanzas e inversiones",
      name: "Mgtr. Fabian Murillo",
      role: "Socio Director - Especialista en Finanzas Corporativas",
      cost: "20",
      bullets: [
        "Gestión de portafolios",
        "Análisis de mercados",
        "Planificación patrimonial",
        "Fondos de inversión",
      ],
    },
    contabilidad: {
      initials: "MA",
      badge: "Contabilidad y auditoría",
      name: "Lic. Adm. Maria Alvarado",
      role: "COO - Especialista en Contabilidad y Auditoría",
      cost: "20",
      bullets: [
        "Contabilidad general",
        "Consultas tributarias",
        "Declaración de Impuestos",
        "Balances y auditorias",
      ],
    },
    legal: {
      initials: "FM",
      badge: "Derecho Societario",
      name: "Abg. Fernando Murillo",
      role: "COO - Especialista en Derecho Societario",
      cost: "25",
      bullets: [
        "Constitución de empresas",
        "Trámite Visas USA",
        "Contratos y documentos",
        "Cumplimiento normativo",
      ],
    },
  };

  // --- LÓGICA DEL SELECTOR DE TEMA ---
  const selectTema = document.getElementById("tema");
  const profContainer = document.getElementById("profesional-card");

  // Elementos de la tarjeta a modificar
  const pInitials = document.getElementById("prof-initials");
  const pBadge = document.getElementById("prof-badge");
  const pName = document.getElementById("prof-name");
  const pRole = document.getElementById("prof-role");
  const pBullets = document.getElementById("prof-bullets");
  const pCost = document.getElementById("prof-cost");

  if (selectTema) {
    selectTema.addEventListener("change", (e) => {
      const temaSeleccionado = e.target.value;
      const data = profesionales[temaSeleccionado];

      if (data) {
        // Inyectar los datos en el HTML
        pInitials.textContent = data.initials;
        pBadge.textContent = data.badge;
        pName.textContent = data.name;
        pRole.textContent = data.role;
        pCost.textContent = `$${data.cost}`;

        // Limpiar y crear los bullets de la lista
        pBullets.innerHTML = "";
        data.bullets.forEach((bullet) => {
          const li = document.createElement("li");
          li.textContent = bullet;
          pBullets.appendChild(li);
        });

        // Mostrar la tarjeta con animación
        profContainer.classList.add("show");
      }
    });
  }

  // --- LÓGICA DE VALIDACIÓN DEL FORMULARIO (PASO 2) ---
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const inputTelefono = document.getElementById("telefono");
  const inputMensaje = document.getElementById("mensaje");
  const btnPaso2 = document.getElementById("btn-paso-2");
  const paso3 = document.getElementById("paso-3");

  // Expresión regular básica para validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validarFormulario() {
    // Criterios de validación
    const nombreValido = inputNombre.value.trim().length > 2;
    const emailValido = emailRegex.test(inputEmail.value.trim());
    const telefonoValido = inputTelefono.value.trim().length >= 7; // Mínimo de dígitos razonable
    const temaValido = selectTema.value !== "";
    const mensajeValido = inputMensaje.value.trim().length > 5;

    // Si todos los campos cumplen los criterios, se habilita el botón
    if (
      nombreValido &&
      emailValido &&
      telefonoValido &&
      temaValido &&
      mensajeValido
    ) {
      btnPaso2.disabled = false;
    } else {
      btnPaso2.disabled = true;
    }
  }

  // Escuchar eventos de teclado o cambio en todos los campos
  inputNombre.addEventListener("input", validarFormulario);
  inputEmail.addEventListener("input", validarFormulario);
  inputTelefono.addEventListener("input", validarFormulario);
  selectTema.addEventListener("change", validarFormulario); // También valida cuando eligen un tema
  inputMensaje.addEventListener("input", validarFormulario);

  // --- NAVEGACIÓN DEL PASO 2 AL PASO 3 ---
  if (btnPaso2) {
    btnPaso2.addEventListener("click", () => {
      // Ya sabemos que es válido si pudo hacer clic, así que avanzamos
      document.getElementById("paso-2").classList.remove("active");
      paso3.classList.add("active");
      document
        .querySelector(".wizard-section")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});
