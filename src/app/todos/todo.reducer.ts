import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, eliminar, toggleAll, limpiar } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo("Salvar al mundo!"),
  new Todo("vencer a thanos!"),
  new Todo("Comprar traje de Iron man!"),
  new Todo("Robar el escudo del Capitán América!")
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [ ...state, new Todo( texto ) ]),
  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {...todo, completado: !todo.completado}
      }else {
        return todo;
      }
    });
  }),
  on(toggleAll, state => {
    return state.map( todo => {
      return {...todo, completado: !todo.completado}
    });
  }),
  on(limpiar, state => {
    return state.filter( todo => !todo.completado);
  }),
  on(editar, (state, { id, texto }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {...todo, texto}
      }else {
        return todo;
      }
    });
  }),
  on(eliminar, (state, { id }) => {
    return state.filter( todo => todo.id !== id);
  }),
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
