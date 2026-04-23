function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if (isNaN(quantidade) || isNaN(de) || isNaN(ate)) {
        alert('Preencha todos os campos para realizar o sorteio.');
        return;
    }

    if (quantidade <= 0) {
        alert('A quantidade de números deve ser maior que zero.');
        return;
    }

    if (de >= ate) {
        alert('O campo "Do número" deve ser menor que o campo "Até o número".');
        return;
    }

    if (quantidade > (ate - de + 1)) {
        alert('A quantidade de números sorteados não pode ser maior que o intervalo informado.');
        return;
    }

    let sorteados = [];
    let numero;

    for (let i = 0; i < quantidade; i++) {
        numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(de, ate);
        }

        sorteados.push(numero);
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados.join(', ')}</label>`;

    alterarStatusBotao();
}

function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao() {
    let botao = document.getElementById('btn-reiniciar');

    if (botao.classList.contains('container__botao-desabilitado')) {
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    } else {
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';

    let botao = document.getElementById('btn-reiniciar');
    botao.classList.remove('container__botao');
    botao.classList.add('container__botao-desabilitado');
}