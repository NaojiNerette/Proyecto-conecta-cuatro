import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.scss']
})
export class ControlesComponent implements OnInit{
  @Output() reiniciarPartida = new EventEmitter<void>();

  victoriasRojas: number = 0;
  victoriasAmarillas: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.victoriasRojas$.subscribe(victorias => this.victoriasRojas = victorias);
    this.gameService.victoriasAmarillas$.subscribe(victorias => this.victoriasAmarillas = victorias);
    this.cargarContador();
  }
  resetPartida(): void {
    this.gameService.resetearGanador();
    this.reiniciarPartida.emit();
  }

  resetContador(): void {
    this.gameService.resetearContador();
    this.victoriasRojas = 0;
    this.victoriasAmarillas = 0;
    this.guardarContador();
  }

  guardarContador(): void {
    localStorage.setItem('victoriasRojas', this.victoriasRojas.toString());
    localStorage.setItem('victoriasAmarillas', this.victoriasAmarillas.toString());
  }

  cargarContador(): void {
    const rojas = localStorage.getItem('victoriasRojas');
    const amarillas = localStorage.getItem('victoriasAmarillas');
    if (rojas) this.victoriasRojas = +rojas;
    if (amarillas) this.victoriasAmarillas = +amarillas;
  }


}
