async function multiply(event) {
  event.preventDefault(); // el comportamiento por defecto de hacer click en en un boton del navegador sería refrescar la página. De esta manera lo evito.

  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  const response = await axios({
    method: "post",
    url: "/multiplicar",
    // data que envío al servidor
    data: {
      num1,
      num2,
    },
  });

  document.getElementById(
    "result"
  ).textContent = `El resultado es: ${response.data}`; // data que obtengo como respuesta del servidor
}
