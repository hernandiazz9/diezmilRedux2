//no usado no usado

const CalculoPuntaje = ({ arrayDados }) => {
 console.log(arrayDados);
  var filtrados;
  var puntos = 0;
  var repetidos = {};
  const numOrdenado = arrayDados.sort(function (a, b) {
    return a - b;
  });
  if (
    numOrdenado[0] === numOrdenado[1] - 1 &&
    numOrdenado[1] === numOrdenado[2] - 1 &&
    numOrdenado[2] === numOrdenado[3] - 1 &&
    numOrdenado[3] === numOrdenado[4] - 1 &&
    numOrdenado[4] === numOrdenado[0] + 4
  ) {
    console.log("escalera");
    return;
  } else if (
    numOrdenado[0] === 1 &&
    numOrdenado[1] === 3 &&
    numOrdenado[2] === 4 &&
    numOrdenado[3] === 5 &&
    numOrdenado[4] === 6
  ) {
    console.log("escalera");
    return;
  }
  arrayDados.forEach((x) => {
    repetidos[x] = (repetidos[x] || 0) + 1;
  });
  for (let i = 0; i < Object.values(repetidos).length; i++) {
    if (Number(Object.values(repetidos)[i]) === 5) {
      console.log("gano");
    } else if (Number(Object.values(repetidos)[i]) >= 3) {
      if (Object.keys(repetidos)[i] === "1") {
        puntos = Number(Object.keys(repetidos)[i]) * 1000;
      } else {
        puntos = Number(Object.keys(repetidos)[i]) * 100;
      }
      if (Number(Object.values(repetidos)[i]) === 3) {
        filtrados = arrayDados.filter(
          (num) => num !== Number(Object.keys(repetidos)[i])
        );
      } else {
        filtrados = arrayDados.filter(
          (num) => num !== Number(Object.keys(repetidos)[i])
        );
        filtrados.push(Number(Object.keys(repetidos)[i]));
      }
      filtrados.forEach((x) => {
        if (x === 1) {
          puntos += 100;
        } else if (x === 5) {
          puntos += 50;
        }
      });
      return puntos;

    }
    arrayDados.forEach((x) => {
      if (x === 1) {
        puntos += 100;
      } else if (x === 5) {
        puntos += 50;
      } else return;
    });

    console.log(puntos);
  }
  return puntos;
};

export default CalculoPuntaje;
