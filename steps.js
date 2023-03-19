function writeSteps(){
  //setup
  steps = document.getElementById("steps");
  const delny = problem.differences[problem.differences.length-1][0];
  const n = problem.equation.degree;
  const coefficientVariables = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r'].slice(0, n+1).reverse();

  //writes a template polynomial to degree n
  steps.innerHTML += "\\[" + writeLaTexPolynomial(coefficientVariables, 'x', "f(x)") + "\\]";

  //writes the finite differences equation
  steps.innerHTML += "\\[\\Delta^{n}y=an!(\\Delta{x})^{n}\\]";

  //substitues values
  steps.innerHTML += "\\[" + delny + "= a \\cdot " + n + "!" + "\\cdot " + problem.delta_x + "^{" + n + "}\\]";

  //evaluates power and factorial
  steps.innerHTML += "\\[" + delny + "= a \\cdot " + factorial(n) + "\\cdot " + Math.pow(problem.delta_x, n) + "\\]";

  //evaluates multiplication
  steps.innerHTML += "\\[" + delny + "= a \\cdot " + (factorial(n) * Math.pow(problem.delta_x, n)) + "\\]";

  //algebra
  steps.innerHTML += "\\[ a = \\frac{"+delny+"}{"+(factorial(n) * Math.pow(problem.delta_x, n))+"}\\]";

  //evaluates a
  const a = delny/(factorial(n) * Math.pow(problem.delta_x, n));
  steps.innerHTML += "\\[a = " + a + "\\]"

  //f(0)
  const f0 = problem.y_values[problem.x_values.indexOf(0)];
  steps.innerHTML += "\\[" + coefficientVariables[0] + "=f(0) = " + f0 + "\\]";

  //writes polynomial with a and f(0) included
  steps.innerHTML += "\\[" +  writeLaTexPolynomial([f0].concat(coefficientVariables.slice(1, coefficientVariables.length-1).concat(a)), 'x', "f(x)") + "\\]";

  //////////////
  // for loop //
  //////////////

  //picks some x and y values
  var x = problem.x_values[problem.x_values.indexOf(0)+1];
  var y = problem.y_values[problem.x_values.indexOf(0)+1];

  //writes polynomial with x and y values
  steps.innerHTML += "\\[" +  writeLaTexPolynomial([f0].concat(coefficientVariables.slice(1, coefficientVariables.length-1).concat(a)), '(' + x + ')', y) + "\\]";

  //evaluates powers
  var firstTermValue = a*Math.pow(x,n);
  steps.innerHTML += "\\[" + y + "=" + firstTermValue;
  for(i = coefficientVariables.length-2; i >= 1; i--) steps.innerHTML += '+' + Math.pow(x,i) + coefficientVariables[i];
  if (f0 > 0) steps.innerHTML += '+' + f0;
  else if (f0 < 0) steps.innerHTML += '-' + Math.abs(f0);
  steps.innerHTML += "\\]";

  //algebra
  steps.innerHTML += "\\[" + y + (firstTermValue > 0? '-':'+') + Math.abs(firstTermValue) + (f0 > 0? '-':'+') + Math.abs(f0);
  for (i = coefficientVariables.length-2; i > 1; i--) steps.innerHTML += '-' + Math.pow(x,i) + coefficientVariables[i];
  steps.innerHTML += '=' + Math.pow(x,1) + coefficientVariables[1];
  steps.innerHTML += "\\]";

  //evaluates addition and writes fraction
  steps.innerHTML += "\\[" + coefficientVariables[1] + '='
  steps.innerHTML += "\\frac{"
  steps.innerHTML += String(y - firstTermValue - f0);
  for (i = coefficientVariables.length-2; i > 1; i--) steps.innerHTML += '-' + Math.pow(x,i) + coefficientVariables[i];
  steps.innerHTML += "}{" + Math.pow(x,1) + "}";
  steps.innerHTML += "\\]";

  //evaluates fraction
  steps.innerHTML += "\\[" + coefficientVariables[1] + '='
  steps.innerHTML += String((y - firstTermValue - f0)/Math.pow(x,1));
  for (i = coefficientVariables.length-2; i > 1; i--) steps.innerHTML += '-' + (Math.pow(x,i)/Math.pow(x,1)) + coefficientVariables[i];
  steps.innerHTML += "\\]";

  //typesets
  MathJax.Hub.Typeset();
}
