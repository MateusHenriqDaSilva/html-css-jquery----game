var placar = 0;
var numPiso = 25;
var pisoContador = 0;
var bauContador = 0;
var bauChance = 5;
var gemChance = 58;
var gemPontos = 1500;
var bauPonto = 1500;
var gemContador = "";
var estrelaContador = "";
var defaultPiso = "pisoJogo";
var novoPiso = "";
var sujeira = "sujeira"
var pedra = "pedra";
var agua = "agua";
var gemaTexto = "Boaah!";
var bauTexto = "Uhuul!";
var inicioTexto = "bora!";
var endTexto = "Yaahh!";

$(document).ready(function(){
    iniciar(defaultPiso,placar);
    // scopo do jogo
    $('.'+defaultPiso).on('click',function(){
        if($(this).hasClass(defaultPiso)){
            random = Math.floor(Math.random() * 100);
            
            if(bauContador===1) {
                pegarGema($(this),random);
            }
            else{
                if(random <= bauChance){
                    bau($(this));
                }
                else {
                    pegarGema($(this),random)
                }
            }

        }

        if($('.off').length === 25 && $('.bau-fechar').length === 0){
            $('.gameover').show();
            $('.final-placar').text(placar);
            discursoText(endTexto,3000);
        }
    });

    $('.restart').on('click', function(){
        $('.bau').remove();
        $('.gameBoard .piso').removeClass('sujeira agua pedra off').addClass(defaultPiso);
        placar=0;
        bauContador=0;
        gemContador=0;
        estrelaContador=0;
        $('.gemContador').text(0);
        $('.estrelaContador').text(0);
        $('.placar').text(placar);
        $('.final-placar').text(placar);
        $('.gameover').hide();
        discursoText(inicioTexto, 600);
    });
});
// funcoes usadas
function iniciar(defaultPiso,placar){
    $('.gameBoard .piso').addClass(defaultPiso);
    $('.placar').text(placar);
}

function pegarGema(piso){
    if(random > bauChance && random <=(gemChance + bauChance)){
        gem(piso);
    }
    else{
        mudarPiso(piso,agua);
        sndEffects(0);
    }
}

function gem(piso) {
    mudarPiso(piso,sujeira);
    discursoText(gemaTexto, 500);
    sndEffects(1);
    placarCalc(gemPontos);
    gemContador++;
    $('.gemContador').text(gemContador);
    $(piso).append("<img class='gem' src='img/gem.png' />");
    $(piso).find('.gem').animate({top: "-30px", opacity:"0"}, 700);
    setTimeout(function() {
        $('img:last-child', piso).remove();
    }, 800);
}

function bau(piso) {
    mudarPiso(piso,pedra);
    $(piso).append("<div class='bau bau-fechar'></div>");
    bauContador = 1;
    sndEffects(0);

    $(".bau").click(function(){
        $(this).unbind();
        $(this).addClass("bau-aberto").removeClass('bau-fechar');
        $(this).append("<img class='estrela' src='img/estrela.png' />");
        $(this).find('.estrela').animate({top:"-40px",opacity:"0"},800);
        $('.estrelaContador').text(1);
        discursoText(bauTexto,300);
        sndEffects(1);
        placarCalc(bauPonto);
        $(this).delay(200).fadeOut("slow");
    });
}

function mudarPiso(piso, tipo){
    $(piso).removeClass(defaultPiso).addClass(tipo).addClass("off");
}

function sndEffects(itens){
    $("#pop-" + Math.ceil(Math.random() * 2))[0].play();
    if(itens){
        $("#som-gema")[0].play();
    }
}

function discursoText(texto,delay){
    $('.bolha').stop(true, false).animate({opacity: "1"}, 200);
    $('.bolha').text(texto);
    $('.bolha').delay(delay).animate({opacity: "0"}, 40);
}

function placarCalc(pontos) {
    placar += pontos;
    $('.placar').text(placar);
}