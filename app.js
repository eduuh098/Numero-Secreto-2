let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if ('speechSynthesis' in window)
    {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    }
    else
    {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMenu()
{
    exibirTextoNaTela("h1", "Jogo do Numero Secreto");
    exibirTextoNaTela("p", "Escolha um numero entre 1 a 10.");
}

exibirMenu();

function verificarChute()
{
    let chute = document.querySelector("input").value;

    if(chute == numeroSecreto)
    {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        if(chute > numeroSecreto)
        {
            exibirTextoNaTela("h1", "Errou mano...");
            exibirTextoNaTela("p", "O Número Secreto é menor...");
        }
        else
        {
            exibirTextoNaTela("h1", "Errou mano...");
            exibirTextoNaTela("p", "O Número Secreto é maior...");
        }
        tentativas = tentativas + 1;
        limparCampo();
    }
}

function gerarNumeroAleatorio()
{
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3)
    {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido))
    {
        return gerarNumeroAleatorio();
    }
    else
    {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo()
{
    chute = document.querySelector("input");
    chute.value = " ";
}

function reiniciarJogo()
{
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMenu();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}