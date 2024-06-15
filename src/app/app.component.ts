import { Component, ViewChild } from '@angular/core';
import { TableroComponent } from './components/tablero/tablero.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conecta-cuatro';
  @ViewChild(TableroComponent) tablero!: TableroComponent;

  onReiniciarPartida(): void {
    this.tablero.resetTablero();
  }
}
