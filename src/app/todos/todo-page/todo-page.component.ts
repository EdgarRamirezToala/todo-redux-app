import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { toggleAll } from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styles: [
  ]
})
export class TodoPageComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleAll() {
    this.store.dispatch(toggleAll());
  }
}
