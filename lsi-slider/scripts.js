/*
//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-//
//. ___.....LSI...........________.......______..................__..__.......//
//./\  \................./\  _____\...../ _____\......LSI......./\ \ \ \......//
//.\ \_ \.......__  _____\ \ \____/..../\ \____/ ______  __  ___\ \ \_\ \..LSI//
//..\//\ \...../\_\/\  __ \ \ \_____...\ \ \____/\  __ \/\ \/ ___\ \____ \....//
//....\ \ \....\/\ \ \ \/ /\ \  ____\...\ \____ \ \ \/ /\ \  /___/\/____\ \...//
//.....\ \ \..._\ \ \ \  /..\ \ \___/....\/____\ \ \  /..\ \ \.........\ \ \..//
//.LSI..\_\ \__\ \ \ \ \ \...\ \ \______....____\ \ \ \...\ \ \.......__\_\ \.//
//....../\________\ \_\ \_\...\ \_______\../\_____/\ \_\...\ \ \...../\_____/.//
//......\/________/\/_/\/_/....\/_______/..\/____/..\/_/....\/_/.....\/____/..//
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//
//    LSI          Felipe Moraes - felipemdeoliveira@live.com          LSI    //
//¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-¯-//

* NÃO É RECOMENDÁVEL ALTERAR ESTE ARQUIVO
* SÓ ALTERE SE REALMENTE FOR NECESSÁRIO E SOUBER OQ ESTÁ FAZENDO
*******************************************************************************/

// Inicialização das variáveis
var slideCont;
var slideItens;
var slideAuto;
var slideHover = false;
var slideAtivo = 0;

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    slideItens = document.querySelectorAll('div.lsi-slides > article');

    if (slideItens.length == 1) {

        slideItens[0].classList.add('lsi-slide-ativo');
        setSlideBg();

    } else if (slideItens.length > 1) {

        // DEFININDO IMAGENS DE FUNDO
        setSlideBg();

        // HABILITANDO BOTÕES PRÓXIMO E ANTERIOR
        let btns = document.querySelectorAll(
            'div.lsi-slides > button.slideBtn'
        );
        for (let btn of btns) {
            btn.style.display = 'block';
        }

        // MOSTRANDO O PRIMEIRO SLIDE
        setTimeout(function(){
            slideItens[0].classList.add('lsi-slide-ativo');
        }, 200);

        // CACHEANDO O CONTAINER DOS SLIDES
        slideCont = document.querySelector('div.lsi-slides');

        // DESABILITANDO SELEÇÃO NOS SLIDES
        if (slideCont.getAttribute('data-block-select') == "true")
            slideCont.addEventListener('selectstart', function(e) {
                e.preventDefault();
            });

        // INICIANDO O TIMER PARA AVANÇAR OS SLIDES
        startAuto();

        // ADICIONANDO OS GATILHOS DOS EVENTOS
        slideCont.addEventListener(
            'mouseover',
            function() {
                stopAuto();
                slideHover = true;
            }
        );

        slideCont.addEventListener(
            'mouseout',
            function() {
                startAuto();
                slideHover = false;
            }
        );

        document.querySelector('.slideBtn.ant').addEventListener(
            'click', slideAnt
        );

        document.querySelector('.slideBtn.prox').addEventListener(
            'click', slideProx
        );
    }

});

// FUNÇÕES
function setSlideBg() {
    for (let slide of slideItens) {
        if (slide.getAttribute('data-slide-background') !== null)
            slide.style.backgroundImage = (
                'url('
                +slide.getAttribute('data-slide-background')
            );
    }
}

function slideProx() {
    stopAuto();
    if (slideAtivo == (slideItens.length-1))
        slideAtivo = 0;
    else
        slideAtivo++;
    slideReset();
    slideItens[slideAtivo].classList.add('lsi-slide-ativo');
    if (!slideHover)
        startAuto();
}

function slideAnt() {
    stopAuto();
    if (slideAtivo == 0)
        slideAtivo = (slideItens.length-1);
    else
        slideAtivo--;
    slideReset();
    slideItens[slideAtivo].classList.add('lsi-slide-ativo');
    if (!slideHover)
        startAuto();
}

function slideReset() {
    for (let slide of slideItens) {
        slide.classList.remove('lsi-slide-ativo');
    }
}

function startAuto() {
    slideAuto = setInterval(
        function() {
            slideProx();
        },
        slideCont.getAttribute('data-timer')
    );
}

function stopAuto() {
    clearInterval(slideAuto);
}
