"use strict";

const titulo = document.title;

if (titulo === "Mi Meteo") {
  const obtenerUbicacionButton = document.getElementById("obtenerUbicacion");

  obtenerUbicacionButton.addEventListener("click", () => {
    window.location.href = "pronostico.html";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const ubicacionParrafo = document.getElementById("ubicacion");
    const resultadoParrafo = document.getElementById("resultadoParrafo");

    obtenerUbicacionButton.addEventListener("click", () => obtenerUbicacion());

    function obtenerUbicacion() {
      const geoErrorMsg = "La geolocalización no está disponible en este navegador.";
      ubicacionParrafo.textContent = "Obteniendo ubicación...";
      resultadoParrafo.textContent = "Realizando solicitud a la API...";

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
            obtenerPronosticoLluvia(latitude, longitude);
          },
          (error) => {
            ubicacionParrafo.textContent = `Error: ${error.message}`;
          }
        );
      } else {
        ubicacionParrafo.textContent = geoErrorMsg;
      }
    }
  });
} else {
  function obtenerPronosticoLluvia(latitude, longitude) {
    const apiKey = "80e51649ca0054038d08f10ffa6265c3";
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain&timezone=auto&forecast_days=1`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => mostrarPronosticoLluviaPorHoras(data))
      .catch((error) => {
        document.getElementById("resultadoParrafo").textContent = "Error al obtener el pronóstico: " + error.message;
      });
  }
}

function mostrarPronosticoLluviaPorHoras(data) {
  const resultadoDiv = document.getElementById("resultado");

  if (data.hourly && data.hourly.rain && data.hourly.rain.length > 0) {
    const tiempos = data.hourly.time;
    const cantidadesLluvia = data.hourly.rain;

    tiempos.forEach((tiempo, i) => {
      const lluvia = cantidadesLluvia[i];
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";

      const contenidoTarjeta = document.createElement("p");
      contenidoTarjeta.textContent = `Día: ${tiempo}, Hora: ${tiempo}, Lluvia: ${lluvia} mm`;
      tarjeta.appendChild(contenidoTarjeta);

      resultadoDiv.appendChild(tarjeta);
    });
  } else {
    resultadoDiv.textContent = "No se encontraron datos de lluvia en el pronóstico.";
  }
}

