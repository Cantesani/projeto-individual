function testaFormulario(e) {
    e.preventDefault();

    var mercadoria = document.getElementById('mercadoria').value;
    var valor = document.getElementById('valor').value;

    var numeroPattern = /[^0-9R$,. ]+/g

    if (numeroPattern.test(e.target.elements['valor'].value)) {

        alert('Apenas números são permitidos no campo VALOR')
        return false
    }
}

function testaCampoValor(e) {
    e.preventDefault();
    console.log(e)

    if (e.target.value.length == 0) {
        e.target.value += 'R$ '
    }


    if (e.target.value.length == 5) {
        e.target.value += ','
    }


    if ((/[0-9]+/g).test(e.key)) {
        e.target.value += e.key;
    }
}
