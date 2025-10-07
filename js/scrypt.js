const startDiv = document.querySelector('.start');
const startButton = startDiv.querySelector('button');
const todasPerguntas = document.querySelectorAll('.perguntas');
const divErrou = document.querySelector('.errou');
const divPerdeu = document.querySelector('.perdeu');
const divGanhou = document.querySelector('.ganhou');
const divUltimaChance = document.querySelector('.ultimaChance');

const aceitarBtn = divErrou.querySelector('button:nth-child(3)');
const recusarBtn = divErrou.querySelector('button:nth-child(4)');
const luisBtn = divUltimaChance.querySelector('button:nth-child(2)');
const juliaBtn = divUltimaChance.querySelector('button:nth-child(3)');

const respostasCorretas = [
    'Brasília',         
    'Mercúrio',         
    '4',                
    'Europa',           
    'Leão',             
    'Pacífico',         
    'Verde',            
    '60',               
    'Rússia',           
    'Albert Einstein'   
];

let usouUltimaChance = false;
let perguntaAtual = 0;

// Início do quiz
startButton.addEventListener('click', () => {
    startDiv.classList.add('hidden');
    setTimeout(() => {
        todasPerguntas[0].classList.add('active');
    }, 600);
});

// Lógica das perguntas
todasPerguntas.forEach((pergunta, index) => {
    const botoes = pergunta.querySelectorAll('button');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const respostaUsuario = botao.textContent.trim();

            if (respostaUsuario === respostasCorretas[index]) {
                // Resposta correta
                pergunta.classList.remove('active');
                pergunta.classList.add('exit-up');
                perguntaAtual++;

                const proxima = todasPerguntas[index + 1];
                if (proxima) {
                    setTimeout(() => {
                        proxima.classList.add('active');
                    }, 600);
                } else {
                    // Terminou todas as perguntas
                    setTimeout(() => {
                        divGanhou.style.display = 'block';
                        gerarFogos();
                    }, 600);
                }
            } else {
                // Resposta errada
                pergunta.classList.remove('active');
                pergunta.classList.add('exit-up');

                setTimeout(() => {
                    if (!usouUltimaChance) {
                        divErrou.style.display = 'block';
                    } else {
                        divPerdeu.style.display = 'block';
                    }
                }, 600);
            }
        });
    });
});

// Botão Recusar → fim de jogo
recusarBtn.addEventListener('click', () => {
    divErrou.style.display = 'none';
    divPerdeu.style.display = 'block';
});

// Botão Aceitar → mostra "última chance"
aceitarBtn.addEventListener('click', () => {
    usouUltimaChance = true;
    divErrou.style.display = 'none';
    divUltimaChance.style.display = 'block';
});

// Mouseover em "Luis Filipe" → move o botão
luisBtn.addEventListener('mouseover', () => {
    const maxWidth = window.innerWidth - luisBtn.offsetWidth;
    const maxHeight = window.innerHeight - luisBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    luisBtn.style.position = 'fixed';
    luisBtn.style.left = `${randomX}px`;
    luisBtn.style.top = `${randomY}px`;
});

// Clique em "Julia" → volta para pergunta onde parou
juliaBtn.addEventListener('click', () => {
    divUltimaChance.style.display = 'none';

    if (perguntaAtual < todasPerguntas.length) {
        todasPerguntas[perguntaAtual].classList.remove('exit-up');
        todasPerguntas[perguntaAtual].classList.add('active');
    }
});

function gerarFogos() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const fogo = document.createElement('div');
            fogo.classList.add('fogo');
            fogo.style.left = Math.random() * window.innerWidth + 'px';
            fogo.style.top = Math.random() * window.innerHeight + 'px';
            fogo.style.backgroundColor = randomColor();
            document.body.appendChild(fogo);

            setTimeout(() => {
                fogo.remove();
            }, 1000);
        }, i * 100);
    }
}

function randomColor() {
    const cores = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
    return cores[Math.floor(Math.random() * cores.length)];
}
