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
    { url: '/Resumen', nombre: 'Resumen' },
    { url: '/AsignarParqueo', nombre: 'Asignar Parqueo' },
    { url: '/NuevoEspacio', nombre: 'Nuevo Espacio' }
  ];
}
