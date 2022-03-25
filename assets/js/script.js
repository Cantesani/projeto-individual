var lojaCru = localStorage.getItem('loja')
if (lojaCru != null) {
    var loja = JSON.parse(lojaCru)
} else {
    var loja = [];
}

function cadastroTransacoes() {
    window.location.href = "./index.html"
}

function limpaDados() {
    var usuarioConfirmaLimpar = confirm('Tem certeza que deseja apagar os dados?')
    if (usuarioConfirmaLimpar) {
        localStorage.clear()
        window.location.href = "./index.html"
    }
}

if (loja.length === 0) {
} else {
    document.getElementById("nenhuma-transacao").style.display = "none";
}



// garante que o campo VALOR seja preenchido com caracteres diferente de NÚMEROS.
var numeroPadrao = /[^0-9.,]/

function testaCampoValor(e) {
    e.preventDefault();

    valor = e.target.value.toString();
    valor = valor.replace(/[\D]+/g, "");
    valor = valor.replace(/([0-9]{1})$/g, ",$1");

    if (valor.length >= 6) {
        while (/([0-9]{4})[,|\.]/g.test(valor)) {
            valor = valor.replace(/([0-9]{1})$/g, ",$1");
            valor = valor.replace(/([0-9]{3})[,|\.]/g, ".$1");
        }
    }

    e.target.value = valor;

    if ((/[0-9,.]+/g).test(e.key)) {
        e.target.value += e.key;
    }

    document.getElementById('valor').onpaste = function (e) {
        return false;
    }

}

// garante que nenhum campo seja preenchido de forma errada ou não seja preencido!
function testaFormulario(e) {
    e.preventDefault();

    if (numeroPadrao.test(e.target.elements['valor'].value)) {
        alert('Apenas números são permitidos no campo VALOR')
        return false
    }

    if (e.target.elements['mercadoria'].value == '') {
        alert('O campo MERCADORIA precisa ser preenchido!')
        return false
    }

    if (e.target.elements['valor'].value == '') {
        alert('O campo VALOR precisa ser preenchido!')
        return false
    }

    var lojaCru = localStorage.getItem('loja')

    if (lojaCru != null) {
        var loja = JSON.parse(lojaCru)
    } else {
        var loja = [];
    }

    var alteraTransacao = e.target.elements['transacao'].value

    if (alteraTransacao == 'Compra') {
        var alteraTransacao = '-';
    } else {
        var alteraTransacao = '+'
    }

    loja.push({
        tipoTransacao: alteraTransacao,
        mercadoria: e.target.elements['mercadoria'].value,
        valor: e.target.elements['valor'].value,
    })


    localStorage.setItem('loja', JSON.stringify(loja))
    window.location.href = "./index.html"
}


//retornar tabela preenchida
for (item in loja) {
    document.querySelector('table.tabela-extrato tbody').innerHTML +=

        `<tr>

            <td class="extrato-btn"> 
                ${loja[item].tipoTransacao}
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


// faz somatória dos extratos
let valorTotal = 0;

for (let i of loja) {

    valorLimpo = parseFloat(i.valor.replaceAll('.', '').replace(',', '.'));

    if (i.tipoTransacao == '-') {
        valorTotal -= valorLimpo
    }
    else {
        valorTotal += valorLimpo
    }
}


// converte valor final em moeda PT-BR REAL
valorTotalConvertido = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


// retornar como LUCRO ou PREJUIZO
if (valorTotal >= 0) {
    statusFinanceiro = 'Lucro';
} else {
    statusFinanceiro = 'Prejuizo';

}


//retorna resultados para os EXTRATO
for (item in loja) {
    document.querySelector('table.valor-total').innerHTML =

        `<tr>
        <tr class="saida-item tabela-linha-05">
            <td></td>
            <td> Total</td>
            <td class="extrato-valor" id="status"> ${(valorTotalConvertido)} </td>
        </tr>
        
        <tr class="tabela-linha-06">
            <td> </td>
            <td> </td>
            <td> <p id"statusFinanceiro">[${statusFinanceiro}] </p> </td>
        </tr>
    </tr>
    </tr>
    `
}




