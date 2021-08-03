import { by, element } from 'protractor';


export class DespacharParqueoPage {

    private UbicacionSelect = element(by.name('UbicacionSelect'));
    private despacharBtn = element(by.id('DepacharBtn'));

    async seleccionarUbicacion(ubicacion: string) {
        await this.UbicacionSelect.element(by.cssContainingText('option', ubicacion)).click();
    }

    async despacharClick() {
        await this.despacharBtn.click();
    }


}
