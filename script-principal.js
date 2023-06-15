const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

let altura = parseFloat(prompt("Qual a sua altura?"));
let Yy = Math.round(altura / 0.085);
document.getElementById("altura-personagem").textContent = altura.toFixed(2);
document.getElementById("altura-y").textContent = Yy;

//Variaveis de gravidade:
var escalaGravidade = 0.01;
let gravidade; 
const gravidadeTerra = 9.8;
const gravidadeLua = 1.6;
const gravidadeMarte = 3.7;
const gravidadeMercurio = 3.7;
const gravidadeVenus = 8.8

function DefineGravidade() {
  var opcao = document.querySelector('input[name=grav]:checked');
  if (!opcao) {
    console.log('Escolha uma opção de gravidade');
    return;
  }

  switch (opcao.value) {
    case 'terra':
      console.log(gravidade)
      return gravidade = gravidadeTerra; 
    case 'lua':
      console.log(gravidade)
      return gravidade = gravidadeLua;
    case 'marte':
      console.log(gravidade)
      return gravidade = gravidadeMarte;
    case 'mercurio':
      console.log(gravidade)
      return gravidade = gravidadeMercurio;
    case 'venus':
      console.log(gravidade)
      return gravidade = gravidadeVenus;
    default:
      console.log('Opção de gravidade inválida');
      return;
  }
}

function updateGravidade() {
  gravidade = DefineGravidade();
}

// Adicionar evento de clique nos elementos de rádio para atualizar a gravidade
const radioInputs = document.querySelectorAll('input[name="grav"]');
radioInputs.forEach(input => {
  input.addEventListener('click', updateGravidade);
});

//criando as posições do jogador
class Jogador{
  constructor(){
    this.posicao = {
      x:50,   
      y:100
    }
    this.velocidade = {
      x:0,
      y:0
    }
    this.width = 10
    this.height = altura/.085
    this.chao = 150
    this.pulando = false
  }  
  //gameloop para que seja atualizado sempre
  update(){
    context.fillStyle = 'red';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(this.posicao.x, this.posicao.y, this.width, this.height);
    this.posicao.y += this.velocidade.y
    this.posicao.x += this.velocidade.x

      if (this.posicao.y + this.height + this.velocidade.y <= this.chao) {
        this.velocidade.y += gravidade * escalaGravidade;
      } else {
        this.velocidade.y = 0;
        this.posicao.y = this.chao - this.height;
        this.pulando = false;
      }
    if (this.posicao.x < 0){
      this.posicao.x = 290
    }else if (this.posicao.x > 290){
      this.posicao.x = -1
    }
    }
  }

const jogador = new Jogador();
const puloVelocidadeInicial = -5;
const puloTempoTotal = 10;
var puloTempoAtual = 0;

const botoes = {
  direita: {
    pressed: false
  },
  esquerda: {
    pressed: false
  }
}

function animacao() {
  requestAnimationFrame(animacao);
  jogador.update();

  if (!jogador.pulando) {
    if (botoes.direita.pressed) {
      if (gravidade === gravidadeTerra) {
        jogador.velocidade.x = 2;
      } else if (gravidade === gravidadeLua) {
        jogador.velocidade.x = 1;
      } else if (gravidade === gravidadeMercurio) {
        jogador.velocidade.x = 1.3;
      } else if (gravidade === gravidadeMarte) {
        jogador.velocidade.x = 1.3;
      } else if (gravidade === gravidadeVenus) {
        jogador.velocidade.x = 1.9;
      }
    } else if (botoes.esquerda.pressed) {
      if (gravidade === gravidadeTerra) {
        jogador.velocidade.x = -2;
      } else if (gravidade === gravidadeLua) {
        jogador.velocidade.x = -1;
      } else if (gravidade === gravidadeMercurio) {
        jogador.velocidade.x = -1.3;
      } else if (gravidade === gravidadeMarte) {
        jogador.velocidade.x = -1.3;
      } else if (gravidade === gravidadeVenus) {
        jogador.velocidade.x = -1.9;
      }
    } else {
      jogador.velocidade.x = 0;
    }
  }

  if (puloTempoAtual > 0) {
    jogador.velocidade.y = puloVelocidadeInicial * (puloTempoAtual / puloTempoTotal);
    puloTempoAtual--;
  } else if (jogador.pulando) {
    jogador.velocidade.y += gravidade * escalaGravidade;
  }
}

animacao();

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log ('esquerda')
      botoes.esquerda.pressed = true
      break
    
    case 83:
      console.log ('baixo')
      break
    
    case 68:
      console.log ('direita')
      botoes.direita.pressed = true
      break

    case 87:
      console.log('cima');
      if (!jogador.pulando) {
        jogador.pulando = true
        puloTempoAtual = puloTempoTotal;
        jogador.velocidade.y = puloVelocidadeInicial;
      }
      break;
  }
})

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log ('esquerda')
      botoes.esquerda.pressed = false
      break
    
    case 83:
      console.log ('baixo')
      break
    
    case 68:
      console.log ('direita')
      botoes.direita.pressed = false
      break
  }
})