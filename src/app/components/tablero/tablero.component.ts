import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  filas = Array(6).fill(0);
  columnas = Array(7).fill(0);
  tablero: string[][] = [];
  turno: string = 'R';


  constructor(private gameService: GameService) {
    this.resetTablero();
  }

  ngOnInit(): void {
    this.gameService.ganador$.subscribe(ganador => {
      if (ganador) {
        alert(`${ganador === 'R' ? 'Rojas' : 'Amarillas'} ha ganado!`);
      }
    });
  }

  colocarFicha(x: number): void {
    for (let y = this.tablero.length - 1; y >= 0; y--) {
      if (!this.tablero[y][x]) {
        this.tablero[y][x] = this.turno;
        if (this.verificarVictoria(this.turno, x, y)) {
          this.gameService.establecerGanador(this.turno);
          this.gameService.incrementarVictoria(this.turno);
        }
        this.turno = this.turno === 'R' ? 'A' : 'R';
        this.guardarEstado();
        break;
      }
    }
  }

  guardarEstado(): void {
    localStorage.setItem('tablero', JSON.stringify(this.tablero));
    localStorage.setItem('turno', this.turno);
  }

  cargaEstado(): void {
    const tableroGuardado = localStorage.getItem('tablero');
    const turnoGuardado = localStorage.getItem('turno');

    if (tableroGuardado && turnoGuardado){
      this.tablero = JSON.parse(tableroGuardado);
      this.turno = turnoGuardado;
    }
  }

  resetTablero(): void {
    this.tablero = Array(6).fill(null).map(() => Array(7).fill(null));
    this.gameService.resetearGanador();
    this.guardarEstado();
  }


  verificarVictoria(color: string, x: number, y: number): boolean {
    // Implementa la lógica para verificar si el color ha ganado
    // Esta es una implementación simple y necesita ser completada
    let consecutivaRoja: number = 0;
    let consecutivaAmarilla: number = 0;

    color === 'R' ? consecutivaRoja = 1 : consecutivaAmarilla = 1;
    console.log("consecutivaRoja: ", consecutivaRoja)
    console.log("consecutivaAmarilla: ", consecutivaAmarilla)

    let revisionX: number = x;
    let revisionY: number = y;

    // valida por columna completa
    while(true){
      revisionY++;
      if (revisionY > 5) break;

      if (this.tablero[revisionY][x] === color) {
        color === 'R' ? consecutivaRoja++ : consecutivaAmarilla++;
        if (consecutivaRoja === 4 || consecutivaAmarilla === 4) return true;
      }
      else
        break;
    }

    // valida por fila completa
    let vuelta: boolean = false;
    while(true){
      vuelta ? revisionX-- : revisionX++;

      if (revisionX < 0 || revisionX > 5) break;

      if (this.tablero[y][revisionX] === color) {
        color === 'R' ? consecutivaRoja++ : consecutivaAmarilla++;
        if (consecutivaRoja === 4 || consecutivaAmarilla === 4) return true;
      }
      else {
        if (vuelta){
          break;
        } else {
          vuelta = true;
          revisionX = x;
        }
      }

    }

    return false;
  }
}
