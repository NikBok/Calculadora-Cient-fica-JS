function Calculadora() {
  this.resultado = 0;
  this.expresion = "0";
  this.operadoresSimples = ["+", "-", "*", "/"];
  this.operadoresComplejos = ["Math.sin(", "Math.cos(", "Math.tan(", "(", ")","Math.sqrt(","Math.log(","N!","Math.PI"];
}

Calculadora.prototype.addListener = function () {
  var buttons = document.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", this.buttonClicked.bind(this));
  }
};

Calculadora.prototype.reset = function () {
  this.expresion = "0";
  this.setResult("0");
};
Calculadora.prototype.setResult = function (value) {
  document.getElementById("result").innerHTML = value;
};
Calculadora.prototype.getResult = function () {
  return document.getElementById("result").innerHTML;
};
Calculadora.prototype.addNumbers = function (number) {
  if (this.expresion === "0") {
    this.expresion = number.toString();
  } else {
    if (number === ".") {
      // Si el número actual es un punto decimal, se agrega directamente a la expresión actual
      this.expresion += ".";
    } else {
      this.expresion += number.toString();
    }
  }
  this.setResult(this.expresion);
};

Calculadora.prototype.addOperators = function (operator) {
  if (/^0/.test(this.expresion) && (operator === 'Math.sin(' || operator === 'Math.cos(' || operator === 'Math.tan('
  || operator === 'Math.sqrt(' || operator === 'Math.log('|| operator === 'N!'|| operator === 'Math.PI'|| operator === '('
  || operator === ')')
  ) { 
      this.expresion = operator; 
  } else if (/[+\-*\/]$/.test(this.expresion)) {
    if (this.operadoresComplejos.includes(operator)) {
      this.expresion += operator;
    } else if(operator === "."){
      this.expresion += operator;
    }
  } else {
    this.expresion += operator;
  }
  this.setResult(this.expresion);
};
Calculadora.prototype.square = function () {
  var number = document.getElementById("result").innerHTML;
  var resultado = Math.pow(number,2);
  this.expresion = resultado;
  this.setResult(this.expresion);
  
};
Calculadora.prototype.cube = function () {
  var number = document.getElementById("result").innerHTML;
  var resultado = Math.pow(number,3);
  this.expresion = resultado;
  this.setResult(this.expresion);
};

Calculadora.prototype.factorial =  function(number) {
  if (number === 0 || number === 1) {
    return 1;
  }
  return number * this.factorial(number - 1);
};

Calculadora.prototype.getFactorial = function () {
    var res = this.getResult();
    var n = this.factorial(res);
    this.expresion = n;
    this.setResult(this.expresion);
};
Calculadora.prototype.eraseOne = function () {
  var res = this.getResult();
  var erased = res.slice(0,-1);
  this.expresion = erased;
  this.setResult(this.expresion);
}
Calculadora.prototype.resolver = function () {
  try{
    var result = new Function("return " + this.expresion);
    this.setResult(result());
    this.expresion = result();
  }catch(e){
    this.setResult("Syntax Error");
  }
};
Calculadora.prototype.buttonClicked = function (event) {
  var valor = event.target.innerText;

  if (!isNaN(valor)) {
    this.addNumbers(parseInt(valor));
  } else if (
    valor === "+" ||
    valor === "-" ||
    valor === "*" ||
    valor === "/" ||
    valor === "("    ||
    valor === ")" ||
    valor === "." 
  ) {
    this.addOperators(valor);
  }else if( valor === "^2") {
    this.square();
  }else if( valor === "^3") {
    this.cube();
  }else if( valor === "⌫") {
    this.eraseOne();
  }else if( valor === "π") {
    this.addOperators("Math.PI");
  }else if( valor === "N!") {
    this.getFactorial();
  }else if(valor === "√") {
    this.addOperators("Math.sqrt(")
  }else if(
  valor === "sin" ||
  valor === "cos" ||
  valor === "tan" ||
  valor === "log"){
    this.addOperators("Math."+valor+"(");
  }else if (valor === "=") {
    this.resolver();
  } else if (valor === "Reset") {
    this.reset();
  }
};
var calc = new Calculadora();
calc.addListener();
