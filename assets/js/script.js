var loja = [
    {
        tipoTransacao: true, //venda
        mercadoria: 'Arroz',
        valor: 'R$ 3,90',
    },
    {
        tipoTransacao: true, //venda
        mercadoria: 'Feijão',
        valor: 'R$ 5,90',
    },
    {
        tipoTransacao: false, //compra
        mercadoria: 'Cerveja',
        valor: 'R$ 2,49',
    },
]

for (item in loja) {
    document.querySelector('table.tabela-extrato tbody').innerHTML +=
        `<tr>

            <td class="extrato-btn"> 
                ${loja[item].tipoTransacao ? '+' : '-'}
            </td>

            <td class="extrato-mercadoria">
                ${loja[item].mercadoria}

            </td>

            <td class="extrato-valor"> 
                ${loja[item].valor}
            </td>
        </tr>
        `
}

function testaFormulario(e) {
    e.preventDefault();

    var numeroPattern = /[^0-9R$,. ]+/g
    if (numeroPattern.test(e.target.elements['valor'].value)) {

        alert('Apenas números são permitidos no campo VALOR')
        return false
    }

    if (e.target.elements['valor'].value.replace(/[R$,. ]/g, '').length < 4) {
        alert('O campo VALOR precisa ser preenchido CORRETAMENTE! \n Exemplo: 10,90')
        return false;

    }

    if (e.target.elements['mercadoria'].value == '') {

        alert('O campo MERCADORIA precisa ser preenchido!')
        return false
    }

    if (e.target.elements['valor'].value == '') {

        alert('O campo VALOR precisa ser preenchido!')
        return false
    }
}

function testaCampoValor(e) {
    e.preventDefault();

    if (e.target.value.length == 0) {
        e.target.value += 'R$ '
    }

    if (e.target.value.length == 5) {
        e.target.value += ','
    }


    if ((/[0-9]+/g).test(e.key) && e.target.value.length < 8) {
        e.target.value += e.key;
    }
}
