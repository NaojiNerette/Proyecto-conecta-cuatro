import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private victoriasRojasSubject = new BehaviorSubject<number>(0);
  private victoriasAmarillasSubject = new BehaviorSubject<number>(0);
  private ganadorSubject = new BehaviorSubject<string | null>(null);

  victoriasRojas$ = this.victoriasRojasSubject.asObservable();
  victoriasAmarillas$ = this.victoriasAmarillasSubject.asObservable();
  ganador$ = this.ganadorSubject.asObservable();

  incrementarVictoria(color: string): void {
    if (color === 'R') {
      this.victoriasRojasSubject.next(this.victoriasRojasSubject.value + 1);
    } else if (color === 'A') {
      this.victoriasAmarillasSubject.next(this.victoriasAmarillasSubject.value + 1);
    }
  }

  establecerGanador(color: string): void {
    this.ganadorSubject.next(color);
  }

  resetearContador(): void {
    this.victoriasRojasSubject.next(0);
    this.victoriasAmarillasSubject.next(0);
  }

  resetearGanador(): void {
    this.ganadorSubject.next(null);
  }
}
