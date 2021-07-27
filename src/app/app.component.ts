import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-base';
  public options: MenuItem[] = [
    { url: '/parqueo/resumen', nombre: 'Resumen' },
    { url: '/parqueo/asignar', nombre: 'Asignar Parqueo' }
  ];
}
