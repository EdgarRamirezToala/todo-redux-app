import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';
import { toggle, editar, eliminar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo('');
  @ViewChild('inputFisico') txtInputFisico: ElementRef | undefined;

  checkCompletado: FormControl = new FormControl();
  txtInput: FormControl = new FormControl();
  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo?.completado);
    this.txtInput = new FormControl( this.todo?.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe( valor => {
      console.log(valor);
      this.store.dispatch(toggle({id: this.todo.id}));
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico?.nativeElement.select();
    }, 1);
  }

  eliminar() {
    this.store.dispatch( eliminar({ id: this.todo.id}) );
  }

  terminarEdicion() {
    this.editando = false;

    if(this.txtInput.invalid) { return; }
    if(this.txtInput.value === this.todo.texto) { return; }

    this.store.dispatch( editar({id: this.todo.id, texto: this.txtInput.value}) );
  }
}
