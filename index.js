"use strict";

const boton = document.querySelector("#obtenerUbicacion");

boton.addEventListener("click", function () {
  if ("geolocation" in navigator) {
    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // La latitud y longitud están disponibles en position.coords.latitude y position.coords.longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
      },
      function (error) {
        // Manejar errores si no se puede obtener la ubicación
        console.error("Error al obtener la ubicación:", error);
      }
    );
  } else {
    // El navegador no admite la geolocalización
    console.error("La geolocalización no está disponible en este navegador");
  }

  window.location.href = "pronostico.html";
});

// Para que recuerde la configuración de los efectos del botón
// Obtener el botón y el cursor del elemento del DOM
const obtenerUbicacion = document.getElementById("obtenerUbicacion");
const cursorSetting = localStorage.getItem("cursorSetting");

// Función para cambiar el cursor y guardar la configuración
function changeCursorSetting() {
  if (cursorSetting === "pointer") {
    obtenerUbicacion.style.cursor = "pointer";
  } else {
    obtenerUbicacion.style.cursor = "default"; // Valor predeterminado si no se ha guardado nada
  }
}

// Evento para cambiar el cursor cuando el mouse se coloca sobre el botón
obtenerUbicacion.addEventListener("mouseover", () => {
  if (cursorSetting !== "pointer") {
    obtenerUbicacion.style.cursor = "pointer";
  }
});

// Evento para guardar la configuración del cursor en el localStorage cuando el mouse se aleja del botón
obtenerUbicacion.addEventListener("mouseout", () => {
  localStorage.setItem("cursorSetting", obtenerUbicacion.style.cursor);
});

// Cambiar el cursor en función de la configuración guardada
changeCursorSetting();
