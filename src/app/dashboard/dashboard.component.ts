import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DadosService } from './dados.service';
import { Dado } from './models';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("dadosForm", {static:true})
  dadosForm:NgForm;

  private dados: any;
  public dado: Dado = {
    mesArr: [0, 'Junho'],
    numCasos: 0
  }

  constructor(private dadosService: DadosService) { }

  ngOnInit() {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      });
  }


  init(): void {
    if (typeof (google) !== 'undefined') {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }


  atualizarDados(){
    this.dadosService.atualizarDados(this.dado)
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      });
  }

  exibirGraficos(): void {

    this.exibirColumnChart();
 
  }


  exibirColumnChart(): void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  obterOpcoes(): any {
    return {
      'title': 'Quantidade de casos de Covid (Jul - Set)',
      'width': 600,
      'height': 500
    };
  }

}