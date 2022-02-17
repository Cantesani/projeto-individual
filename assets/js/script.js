var lojaCru = localStorage.getItem('loja')
if (lojaCru != null) {
    var loja = JSON.parse(lojaCru)
} else {
    var loja = [];
}

function cadastroTransacoes() {
    var usuarioConfirmaLimpar = confirm('Tem certeza que deseja apagar os dados?')
    if (usuarioConfirmaLimpar) {
        localStorage.clear()
        window.location.href = "./index.html"
    }
}


function limpaDados() {
    var usuarioConfirmaLimpar = confirm('Tem certeza que deseja apagar os dados?')
    if (usuarioConfirmaLimpar) {
        localStorage.clear()
        window.location.href = "./index.html"
    }
}

if (loja.length === 0) {
    document.getElementById("status").style.display = "none";
} else {
    document.getElementById("nenhuma-transacao").style.display = "none";
}

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

    var lojaCru = localStorage.getItem('loja')

    if (lojaCru != null) {
        var loja = JSON.parse(lojaCru)
    } else {
        var loja = [];
    }

    if (lojaCru == []) {
        console.log('vazio')
    }



    var alteraTransacao = e.target.elements['transacao'].value

    if (alteraTransacao == 'Compra') {
        var alteraTransacao = '+';
    } else {
        var alteraTransacao = '-'
    }

    loja.push({
        tipoTransacao: alteraTransacao,
        mercadoria: e.target.elements['mercadoria'].value,
        valor: e.target.elements['valor'].value,
    })

    localStorage.setItem('loja', JSON.stringify(loja))
    window.location.href = "./index.html"
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


// JS DO FORMULÁRIO

