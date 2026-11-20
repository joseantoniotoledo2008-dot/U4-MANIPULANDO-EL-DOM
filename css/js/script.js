// ==========================================================================
// 1. CAMBIAR CONTENIDO (textContent, innerHTML)
// ==========================================================================
function cambiarDescripcion() {
  const pDesc = document.getElementById("descripcion-perfil");
  if (!pDesc) return;

  if (pDesc.dataset.estado === "detallado") {
    pDesc.innerHTML = `Ingeniero de Sistemas enfocado en arquitectura de software, bases de datos y desarrollo web moderno. Apasionado por la resolución algorítmica y la optimización de procesos.`;
    pDesc.dataset.estado = "resumido";
  } else {
    pDesc.innerHTML = `<strong>Perfil Ampliado:</strong> Profesional con sólida formación en algoritmia competitiva (C++, Python) y arquitectura de sistemas distribuidos. Experiencia práctica en prototipado de microcontroladores y despliegue de soluciones full-stack escalables.`;
    pDesc.dataset.estado = "detallado";
  }
}

// ==========================================================================
// 2. MODIFICAR ESTILOS CSS MEDIANTE EL DOM
// ==========================================================================
function aplicarEstiloDinamico() {
  const caja = document.getElementById("caja-habilidades");
  if (!caja) return;

  if (caja.style.backgroundColor === "rgb(231, 241, 255)" || caja.style.backgroundColor === "#e7f1ff") {
    caja.style.backgroundColor = "transparent";
    caja.style.borderLeft = "1px solid #dee2e6";
    caja.style.padding = "1rem";
  } else {
    caja.style.backgroundColor = "#e7f1ff";
    caja.style.borderLeft = "6px solid #0d6efd";
    caja.style.padding = "1.5rem";
    caja.style.borderRadius = "8px";
  }
}

// ==========================================================================
// 3. AGREGAR / QUITAR CLASES (classList: add, remove, toggle)
// ==========================================================================
function toggleModoOscuro() {
  document.body.classList.toggle("dark-theme");
  const btn = document.getElementById("btn-tema");
  if (btn) {
    if (document.body.classList.contains("dark-theme")) {
      btn.innerHTML = `<i class="bi bi-sun"></i> Modo Claro`;
      btn.className = "btn btn-outline-warning btn-sm";
    } else {
      btn.innerHTML = `<i class="bi bi-moon"></i> Modo Oscuro`;
      btn.className = "btn btn-outline-light btn-sm";
    }
  }
}

function destacarProyecto(idCard) {
  const card = document.getElementById(idCard);
  if (card) {
    card.classList.toggle("destacado");
  }
}

// ==========================================================================
// 4. CONSULTAR Y MODIFICAR ATRIBUTOS (getAttribute, setAttribute)
// ==========================================================================
function cambiarFotoPerfil() {
  const img = document.getElementById("img-avatar");
  if (!img) return;

  const ruta1 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
  const ruta2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";

  const srcActual = img.getAttribute("src");
  if (srcActual === ruta1) {
    img.setAttribute("src", ruta2);
    img.setAttribute("alt", "Foto Profesional Variante B");
  } else {
    img.setAttribute("src", ruta1);
    img.setAttribute("alt", "Foto Profesional Variante A");
  }
}

// ==========================================================================
// 5. ESCUCHAR EVENTOS (3 formas demostradas)
// ==========================================================================
// Forma 1: Inline en HTML -> Ver botón en index.html onclick="cambiarFotoPerfil()"
// Forma 2: Propiedad de evento del objeto DOM
document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.onsubmit = function (e) {
      e.preventDefault();
      const respuesta = document.getElementById("mensaje-envio");
      const nombre = document.getElementById("nombre").value;
      if (respuesta) {
        respuesta.className = "alert alert-success mt-3";
        respuesta.textContent = `¡Gracias ${nombre}! Tu mensaje ha sido registrado correctamente vía DOM event property.`;
      }
      formContacto.reset();
    };
  }

  // Forma 3: addEventListener() estándar
  const btnAlerta = document.getElementById("btn-alerta");
  if (btnAlerta) {
    btnAlerta.addEventListener("click", () => {
      alert("Demostración de evento escuchado con addEventListener() estándar de W3C.");
    });
  }

  const itemsExp = document.querySelectorAll(".experiencia-item");
  itemsExp.forEach((item) => {
    item.addEventListener("mouseenter", () => item.classList.add("item-resaltado"));
    item.addEventListener("mouseleave", () => item.classList.remove("item-resaltado"));
  });
});

// ==========================================================================
// 6. CREAR, INSERTAR Y ELIMINAR ELEMENTOS
// ==========================================================================
function agregarReferencia() {
  const nombre = document.getElementById("ref-nombre").value.trim();
  const cargo = document.getElementById("ref-cargo").value.trim();
  const empresa = document.getElementById("ref-empresa").value.trim();
  const telefono = document.getElementById("ref-telefono").value.trim();

  if (!nombre || !cargo) {
    alert("Por favor completa al menos el nombre y el cargo.");
    return;
  }

  const contenedor = document.getElementById("lista-referencias");

  // Crear elemento
  const col = document.createElement("div");
  col.className = "col-md-6 mb-3";

  // Insertar contenido
  col.innerHTML = `
    <div class="card h-100 shadow-sm border-primary">
      <div class="card-body">
        <h5 class="card-title text-primary">${nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${cargo} - ${empresa || "Independiente"}</h6>
        <p class="card-text mb-2"><i class="bi bi-telephone"></i> ${telefono || "No especificado"}</p>
        <button class="btn btn-outline-danger btn-sm" onclick="eliminarReferencia(this)">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `;

  // Insertar en el árbol DOM
  contenedor.appendChild(col);

  // Limpiar campos
  document.getElementById("ref-nombre").value = "";
  document.getElementById("ref-cargo").value = "";
  document.getElementById("ref-empresa").value = "";
  document.getElementById("ref-telefono").value = "";
}

function eliminarReferencia(boton) {
  // Elimina la columna contenedora correspondiente del DOM
  const tarjeta = boton.closest(".col-md-6");
  if (tarjeta) {
    tarjeta.remove();
  }
}

