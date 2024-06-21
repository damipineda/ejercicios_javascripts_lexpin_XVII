class JuegoPiedraPapelTijera {
    constructor() {
        this.opciones = ['piedra', 'papel', 'tijera'];
        this.historial = { victorias: 0, derrotas: 0, empates: 0 };
    }

    jugar(eleccionJugador) {
        const eleccionComputadora = this.opciones[Math.floor(Math.random() * this.opciones.length)];
        const resultado = this.obtenerGanador(eleccionJugador, eleccionComputadora);

        const jugadorDiv = document.getElementById('eleccion-jugador');
        const computadoraDiv = document.getElementById('eleccion-computadora');

        jugadorDiv.innerText = this.obtenerEmoji(eleccionJugador);
        computadoraDiv.innerText = this.obtenerEmoji(eleccionComputadora);

        // Reset classes
        jugadorDiv.classList.remove('loser');
        computadoraDiv.classList.remove('loser');

        if (resultado === 'victoria') {
            this.historial.victorias += 1;
            computadoraDiv.classList.add('loser');
        } else if (resultado === 'derrota') {
            this.historial.derrotas += 1;
            jugadorDiv.classList.add('loser');
        } else {
            this.historial.empates += 1;
        }

        let output = document.getElementById('output-ppt');
        output.innerHTML = `<p>Jugador: ${this.obtenerEmoji(eleccionJugador)} - Computadora: ${this.obtenerEmoji(eleccionComputadora)} -> ${resultado}</p>`;
        this.mostrarHistorial();
    }

    obtenerGanador(eleccionJugador, eleccionComputadora) {
        if (eleccionJugador === eleccionComputadora) {
            return 'empate';
        } else if (
            (eleccionJugador === 'piedra' && eleccionComputadora === 'tijera') ||
            (eleccionJugador === 'papel' && eleccionComputadora === 'piedra') ||
            (eleccionJugador === 'tijera' && eleccionComputadora === 'papel')
        ) {
            return 'victoria';
        } else {
            return 'derrota';
        }
    }

    obtenerEmoji(eleccion) {
        switch (eleccion) {
            case 'piedra':
                return '🤜';
            case 'papel':
                return '🤚';
            case 'tijera':
                return '✌';
        }
    }

    mostrarHistorial() {
        let historialDiv = document.getElementById('historial');
        historialDiv.innerHTML = `
            <p class="victoria">Victorias: ${this.historial.victorias}</p>
            <p class="derrota">Derrotas: ${this.historial.derrotas}</p>
            <p class="empate">Empates: ${this.historial.empates}</p>
        `;
    }

    reiniciarHistorial() {
        this.historial = { victorias: 0, derrotas: 0, empates: 0 };
        this.mostrarHistorial();
        document.getElementById('output-ppt').innerHTML = '';
        document.getElementById('eleccion-jugador').innerText = '🖐';
        document.getElementById('eleccion-computadora').innerText = '🖐';
    }
}

const juegoPPT = new JuegoPiedraPapelTijera();

function jugarPPT(eleccion) {
    juegoPPT.jugar(eleccion);
}

function reiniciarHistorial() {
    juegoPPT.reiniciarHistorial();
}