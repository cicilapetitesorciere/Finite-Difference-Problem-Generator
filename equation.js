function Term(coefficient, variable, exponent){
  this.coefficient = coefficient;
  this.variable = variable;
  this.exponent = exponent;
  this.toLatex = function(){
    return writeLaTexTerm(this.coefficient, this.variable, this.exponent)
  }
}

function Expression(terms){
  this.terms = terms;
  this.toLatex = function(){
    var result = "";
    for(n = 0; n < terms.length; n++) result += terms[n].toLatex;
    if (result[0] == "+") result = result.substr(1);
    return result;
  }
}
