import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { limpiar } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [
  ]
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados','pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro );
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;

      this.pendientes = state.todos.filter(filtro => !filtro.completado ).length;
    });

  }

  cambiarFiltro(filtro:filtrosValidos) {
    this.store.dispatch(setFiltro({filtro}));
  }

  limpiar() {
    this.store.dispatch(limpiar());
  }
}
