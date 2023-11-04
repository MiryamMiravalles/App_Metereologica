"use strict";

import { redirigir } from "./funciones.js";
const titulo = document.title;
if (titulo === "Mi Meteo") {
  document
    .getElementById("obtenerUbicacion")
    .addEventListener("click", function () {
      redirigir();
    });

  document.addEventListener("DOMContentLoaded", function () {
    var obtenerUbicacionButton = document.getElementById("obtenerUbicacion");
    var ubicacionParrafo = document.getElementById("ubicacion");
    var resultadoParrafo = document.getElementById("resultadoParrafo");

    obtenerUbicacionButton.addEventListener("click", obtenerUbicacion);

    function obtenerUbicacion() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
            resultadoParrafo.textContent =
              "Obteniendo ubicación. Realizando solicitud a la API...";

            obtenerPronosticoLluvia(latitude, longitude);
          },
          function (error) {
            ubicacionParrafo.textContent = `Error: ${error.message}`;
          }
        );
      } else {
        ubicacionParrafo.textContent =
          "La geolocalización no está disponible en este navegador.";
      }
    }
  });
} else {
  function obtenerPronosticoLluvia(latitude, longitude) {
    const apiKey = "80e51649ca0054038d08f10ffa6265c3";
    var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain&timezone=auto&forecast_days=1`;
    resultadoParrafo.textContent = "Realizando la solicitud a la API...";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        mostrarPronosticoLluviaPorHoras(data);
      })
      .catch((error) => {
        resultadoParrafo.textContent =
          "Error al obtener el pronóstico: " + error.message;
      });
  }

  //funcion para mostrar en tarjetas el pronostico de lluvia por hrs
  function mostrarPronosticoLluviaPorHoras(data) {
    const resultadoDiv = document.getElementById("resultado"); // Obtiene el elemento div con el ID "resultado."

    if (data.hourly && data.hourly.rain && data.hourly.rain.length > 0) {
      // Verifica si hay datos de pronóstico de lluvia.
      const tiempos = data.hourly.time;
      const cantidadesLluvia = data.hourly.rain;

      for (let i = 0; i < tiempos.length; i++) {
        const tiempo = tiempos[i];
        const lluvia = cantidadesLluvia[i];
        // Crea una tarjeta (div) para mostrar la información.
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";

        const contenidoTarjeta = document.createElement("p");
        contenidoTarjeta.textContent = `Día: ${tiempo}, Hora: ${tiempo}, Lluvia: ${lluvia} mm`;
        // Agrega el contenido a la tarjeta.
        tarjeta.appendChild(contenidoTarjeta);

        // Agrega la tarjeta al elemento "resultadoDiv."
        resultadoDiv.appendChild(tarjeta);
      }
    } else {
      resultadoDiv.textContent =
        "No se encontraron datos de lluvia en el pronóstico.";
    }
  }
}
