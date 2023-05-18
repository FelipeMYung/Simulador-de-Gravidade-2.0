var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var gravidade = 2;

var altura = parseFloat(prompt("Qual a sua altura?"));
var Yy = Math.round(altura / 0.085);
document.getElementById("altura-personagem").textContent = altura.toFixed(2);
document.getElementById("altura-y").textContent = Yy;
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
        this.velocidade.y += gravidade;
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

function animacao(){
  requestAnimationFrame(animacao);
  jogador.update();

  if(botoes.direita.pressed) {
    jogador.velocidade.x = 2
  } else if (botoes.esquerda.pressed){
    jogador.velocidade.x = -2
  }
  else jogador.velocidade.x = 0
  if (puloTempoAtual > 0) {
    jogador.velocidade.y = puloVelocidadeInicial * (puloTempoAtual / puloTempoTotal);
    puloTempoAtual--;
  } else if (jogador.pulando){
    jogador.velocidade.y = gravidade;
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