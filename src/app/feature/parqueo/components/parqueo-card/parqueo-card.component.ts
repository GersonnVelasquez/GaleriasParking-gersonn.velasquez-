import { Component, Input, OnInit } from '@angular/core';
import { Parqueo } from '../../shared/models/parqueo.model';


@Component({
  selector: 'app-parqueo-card',
  templateUrl: './parqueo-card.component.html',
  styleUrls: ['./parqueo-card.component.scss']
})
export class ParqueoCardComponent implements OnInit {
  @Input() parqueo: Parqueo;

  constructor() { }

  ngOnInit(): void {
  }

  getDate(date: string) {

    if (date) {
      return new Date(date);
    } else {
      return null;
    }


  }

}
