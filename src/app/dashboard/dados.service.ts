import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dado } from './models';

@Injectable()
export class DadosService {

  dados = [
    ['Junho', 0],
    ['Julho', 0],
    ['Agosto', 0],
    ['Setembro', 0]
  ]

  constructor() { }

  atualizarDados(dado: Dado): void {
    let index = dado.mesArr[0]
    this.dados[index][1] =  dado.numCasos
  }

  obterDados(): Observable<any>{
    return new Observable(observable => {
      observable.next(this.dados)
      observable.complete()
    })
  }

}
