import { by, element } from 'protractor';

export class ParqueoResumenPage {

    private listaParqueos = element.all(by.tagName('app-parqueo-card'));
    private listaParqueosDisponibles = element.all(by.css('.bg-success'));
    private listaParqueosOcupados = element.all(by.css('.bg-danger'));

    async contarParqueos() {
        return this.listaParqueos.count();
    }

    async contarDisponibles() {
        return this.listaParqueosDisponibles.count();
    }

    async contarOcupados() {
        return this.listaParqueosOcupados.count();
    }
}
