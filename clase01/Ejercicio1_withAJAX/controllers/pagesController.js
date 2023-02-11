const { format: dateFormat } = require("date-fns");
const { es } = require("date-fns/locale");

module.exports = {
  home: (req, res) => {
    res.sendFile("home.html", { root: "./views" });
  },
  date: (req, res) => {
    res.send(
      dateFormat(
        new Date(),
        "'Hoy es' dd 'de' MMMM 'de' yyyy 'y son las' HH:mm:ss (EEEE)",
        { locale: es }
      )
    );
  },
  multiplyForm: (req, res) => {
    res.sendFile("multiply.html", { root: "./views" });
  },
  // multiply: en este caso se hace via AJAX >> ver archivo public/app.js
  multiply: (req, res) => {
    const { num1, num2 } = req.body;
    res.send(String(num1 * num2)); // Notar que no es posible retornar un número. Sólo se puede retornar strings, objetos o arrays.
  },
};
