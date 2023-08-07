const miModulo = (() => {
    'use strict'
    let deck = [];
    const tipos = ['C','D','H','S'],
        especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0,
    puntosComputadora = 0;

    //Referencias HHTML
    const botonPedir =  document.querySelector('#btnPedir'),
        botonDetener =  document.querySelector('#btnDetener'),
        botonJuego =  document.querySelector('#btnJuego'),
        puntuadores = document.querySelectorAll('small'),
        cartasJugador = document.querySelector('#jugador-cartas'),
        cartasComputadora = document.querySelector('#computadora-cartas')


    const inicializarJuego = () => {
        deck = crearDeck();
    }

    const crearDeck = () => {
        deck = [];
        for(let i = 2; i <=10; i++){
            for(let tipo of tipos){
                deck.push(i+tipo)
            }
        }
        for(let especial of especiales){
            for(let tipo of tipos){
                deck.push(especial+tipo)
            }
        }
        return _.shuffle(deck);
    }


    const pedirCarta = () => {
        if(deck.length <= 0) {
            throw 'No hay cartas'
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return isNaN(valor) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    //Turno Computadora
    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntuadores[1].innerText = puntosComputadora;
            const imgCarta = document.createElement('img');
            imgCarta.src=`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            cartasComputadora.append(imgCarta);
            if(puntosMinimos > 21) {
                break;
            }
        }while(puntosComputadora<puntosMinimos && puntosComputadora<=21);
        setTimeout(()=>{
            quienGana(puntosJugador,puntosComputadora);
        },100)
    }

    const quienGana = (puntosJugador, puntosComputadora) => {
        if( puntosJugador > 21){
            alert('Perdiste')
        } else if((puntosComputadora > puntosJugador) && puntosComputadora< 21 ){
            alert('Perdiste')
        } else if(puntosComputadora > 21){
            alert('Ganaste')
        } else if(puntosComputadora === puntosJugador){
            alert('Empate')
        }
    }

    //Eventos
    botonPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);

        puntuadores[0].innerText = puntosJugador;
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            botonPedir.disabled = true;
            turnoComputadora(puntosJugador);
        } else if(puntosJugador === 21){
            botonPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    botonDetener.addEventListener('click', () => {
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    botonJuego.addEventListener('click', () => {
        inicializarJuego();

        puntosComputadora = 0;
        puntosJugador = 0;
        puntuadores[0].innerText = puntosJugador;
        puntuadores[1].innerText = puntosComputadora;
        cartasJugador.innerHTML = '';
        cartasComputadora.innerHTML = '';
        botonPedir.disabled = false;
        botonDetener.disabled = false;
        crearDeck();
    });

    return {
        nuevoJuego: inicializarJuego
    }
})();

