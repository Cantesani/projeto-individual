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
    document.getElementById("status").style.display = "none";
} else {
    document.getElementById("nenhuma-transacao").style.display = "none";
}

var numeroPadrao = /[^0-9.,]/


function testaCampoValor(e) {
    e.preventDefault();

    if (numeroPadrao.test(e.key)) {
        console.log(e.key);
        e.preventDefault();
        return;
    }

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
}

function testaFormulario(e) {
    e.preventDefault();

    if (numeroPadrao.test(e.target.elements['valor'].value)) {
        alert('Apenas números são permitidos no campo VALOR')
        return false
    }

    // if ((/[0-9,.]+/g).test(e.key)) {
    //     e.target.value += e.key;
    // }

    // -------------------------------------
    // PAREI AQUI
    // ------------------------------------
    if (e.target.elements['valor'].value.replace(/[,.]+/g, "")) {
        console.log('oi')
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
        var alteraTransacao = '+';
    } else {
        var alteraTransacao = '-'
    }

    var valorCRU = e.target.elements['valor'].value
    var valorBRL = (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorCRU));

    // console.log(valorCRU)
    // console.log(valorBRL)
    // e.preventDefault()

    loja.push({
        tipoTransacao: alteraTransacao,
        mercadoria: e.target.elements['mercadoria'].value,
        valor: valorBRL
        // .replaceAll(".", "")
        // .replaceAll(",", "."),
    })

    localStorage.setItem('loja', JSON.stringify(loja))
    window.location.href = "./index.html"
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

