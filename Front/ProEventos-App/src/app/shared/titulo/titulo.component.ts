import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
  @Input() titulo: string | undefined;
  @Input() iconClass: string  = 'fa fa-user';
  @Input() subtitulo: string = 'Desde 2021';
  @Input() botaoListar = false;
  constructor() { }

  ngOnInit() {
  }

}
