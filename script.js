"use strict";
const latitude = localStorage.getItem("latitude");
const longitude = localStorage.getItem("longitude");
// URL de la API que deseas consultar
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`;

// Realiza una solicitud GET a la API utilizando fetch
fetch(apiUrl)
  .then((response) => {
    // Verifica si la respuesta es exitosa (código de estado HTTP 200)
    if (!response.ok) {
      throw new Error("No se pudo obtener la información de la API");
    }
    // Convierte la respuesta a formato JSON
    return response.json();
  })
  .then((data) => {
    // Trabaja con los datos recibidos de la API
    const fechaActual = new Date();
    console.log(data);
    const hora = fechaActual.getHours();
    const temp = document.querySelector(".temperatura");
    temp.textContent = `${parseInt(data.hourly.temperature_2m[hora])}ºc`;
    function mañTar(hora) {
      if (hora === 0 || hora < 12) {
        return "AM";
      } else {
        return "PM";
      }
    }
    const codigos = data.hourly.weather_code;
    const siguientesCodigos = [];
    const horas = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    const cantidad = 9;
    var siguientesHoras = [];
    for (var i = 0; i < cantidad; i++) {
      let indice = (hora + i) % horas.length;
      siguientesHoras.push(horas[indice]);
      let code = codigos.length;
      siguientesCodigos.push(codigos[indice]);
    }
    const estaHora = document.querySelector(".time1");
    const estaHora1 = document.querySelector(".time2");
    const estaHora2 = document.querySelector(".time3");
    const estaHora3 = document.querySelector(".time4");
    const estaHora4 = document.querySelector(".time5");
    const estaHora5 = document.querySelector(".time6");
    const estaHora6 = document.querySelector(".time7");
    const estaHora7 = document.querySelector(".time8");

    estaHora.textContent = `${siguientesHoras[1]}:00 ${mañTar(
      siguientesHoras[1]
    )}`;
    estaHora1.textContent = `${siguientesHoras[2]}:00 ${mañTar(
      siguientesHoras[2]
    )}`;
    estaHora2.textContent = `${siguientesHoras[3]}:00 ${mañTar(
      siguientesHoras[3]
    )}`;
    estaHora3.textContent = `${siguientesHoras[4]}:00 ${mañTar(
      siguientesHoras[4]
    )}`;
    estaHora4.textContent = `${siguientesHoras[5]}:00 ${mañTar(
      siguientesHoras[5]
    )}`;
    estaHora5.textContent = `${siguientesHoras[6]}:00 ${mañTar(
      siguientesHoras[6]
    )}`;
    estaHora6.textContent = `${siguientesHoras[7]}:00 ${mañTar(
      siguientesHoras[7]
    )}`;
    estaHora7.textContent = `${siguientesHoras[8]}:00 ${mañTar(
      siguientesHoras[8]
    )}`;

    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    const img3 = document.querySelector(".img3");
    const img4 = document.querySelector(".img4");
    const img5 = document.querySelector(".img5");
    const img6 = document.querySelector(".img6");
    const img7 = document.querySelector(".img7");
    const img8 = document.querySelector(".img8");

    switch (siguientesCodigos[0]) {
      case 0:
        img1.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img1.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[0] > 48) {
      img1.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[1]) {
      case 0:
        img2.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img2.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[1] > 48) {
      img2.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[2]) {
      case 0:
        img3.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img3.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[2] > 48) {
      img3.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[3]) {
      case 0:
        img4.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img4.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[3] > 48) {
      img4.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[4]) {
      case 0:
        img5.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 45:
      case 48:
        img5.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[4] > 48) {
      img5.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[5]) {
      case 0:
        img6.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img6.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[5] > 48) {
      img6.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[6]) {
      case 0:
        img7.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 3:
      case 45:
      case 48:
        img7.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[6] > 48) {
      img7.src = "/img/lluvia.png";
    }
    switch (siguientesCodigos[7]) {
      case 0:
        img8.src = "/img/sol.png";
        break;
      case 1:
      case 2:
      case 45:
      case 48:
        img8.src = "/img/cloud.png";
        break;
    }
    if (siguientesCodigos[7] > 48) {
      img8.src = "/img/lluvia.png";
    }
  })
  .catch((error) => {
    // Manejo de errores
    console.error("Ocurrió un error al consultar la API:", error);
  });
