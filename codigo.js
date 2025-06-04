function validar() {
  var usuario = document.getElementById("usuario").value;
  var clave = document.getElementById("clave").value;

  if (usuario == "usuario" && clave == "1234") {
    alert("USUARIO Y CLAVE CORRECTOS...");
    window.location.href = "./panel.html";
  } else {
    alert("USUARIO Y CLAVE INCORRECTAS...");
  }
}

const precios = {
  electrica: {
    Fender: { Stratocaster: 300000, Telecaster: 320000, Jazzmaster: 310000, Jaguar: 305000 },
    Gibson: { "Les Paul": 350000, SG: 340000, "335": 360000 }
  },
  acustica: {
    Yamaha: { F310: 200000, FG800: 210000 },
    Taylor: { "214ce": 280000, GSmini: 300000 }
  },
  clasica: {
    Alhambra: { "3C": 180000, "4P": 200000 },
    Cordoba: { C5: 210000, C7: 230000 }
  }
};

const marcas = {
  electrica: ["Fender", "Gibson"],
  acustica: ["Yamaha", "Taylor"],
  clasica: ["Alhambra", "Cordoba"]
};

const modelos = {
  electrica: {
    Fender: ["Stratocaster", "Telecaster", "Jazzmaster", "Jaguar"],
    Gibson: ["Les Paul", "SG", "335"]
  },
  acustica: {
    Yamaha: ["F310", "FG800"],
    Taylor: ["214ce", "GSmini"]
  },
  clasica: {
    Alhambra: ["3C", "4P"],
    Cordoba: ["C5", "C7"]
  }
};

function actualizarMarcas() {
  const estilo = estiloSel.value;
  marcaSel.innerHTML = marcas[estilo].map(m => `<option value="${m}">${m}</option>`).join('');
  actualizarModelos();
}

function actualizarModelos() {
  const estilo = estiloSel.value, marca = marcaSel.value;
  modeloSel.innerHTML = (modelos[estilo][marca] || []).map(mo => `<option value="${mo}">${mo}</option>`).join('');
  mostrarPrecio();
}

function mostrarPrecio() {
  const estilo = estiloSel.value, marca = marcaSel.value, modelo = modeloSel.value;
  const cantidad = parseFloat(document.getElementById("n2").value);
  const inputPrecio = document.getElementById("n1");
  let precioUnitario = precios[estilo]?.[marca]?.[modelo] || 0;
  inputPrecio.value = precioUnitario;
  if (!isNaN(cantidad) && cantidad > 0 && precioUnitario > 0) {
    const total = precioUnitario * cantidad;
    resultado2.textContent = `El total a pagar es $${total.toLocaleString()} (${cantidad} x $${precioUnitario.toLocaleString()})`;
  } else {
    resultado2.textContent = "Ingresa una cantidad válida.";
  }
}

function afiliar() {
  const campos = ["nombre", "apellido", "dni", "edad", "telefono", "correo", "direccion", "fecha"];
  const completos = campos.every(id => document.getElementById(id).value.trim());
  document.getElementById("resultado1").textContent = completos ? "Usuario registrado!" : "Completa todos los campos.";
}

const estiloSel = document.getElementById("estilo");
const marcaSel = document.getElementById("marca");
const modeloSel = document.getElementById("modelo");
const resultado2 = document.getElementById("resultado2");

window.addEventListener("DOMContentLoaded", () => {
  estiloSel.innerHTML = Object.keys(marcas).map(e => `<option value="${e}">${e.charAt(0).toUpperCase() + e.slice(1)}</option>`).join('');
  actualizarMarcas();
  estiloSel.addEventListener("change", actualizarMarcas);
  marcaSel.addEventListener("change", actualizarModelos);
  modeloSel.addEventListener("change", mostrarPrecio);
});

