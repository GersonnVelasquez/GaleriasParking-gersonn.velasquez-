import { by, element } from 'protractor';


export class AsignarParqueoPage {

    private UbicacionSelect = element(by.name('UbicacionSelect'));
    private NoPlacaInput = element(by.name('NoPlacaInput'));
    private MarcaInput = element(by.id('MarcaInput'));
    private ColorInput = element(by.id('ColorInput'));
    private asignarBtn = element(by.id('asignarBtn'));


    async seleccionarUbicacion(ubicacion: string) {
        await this.UbicacionSelect.element(by.cssContainingText('option', ubicacion)).click();
    }

    async asignarClick() {
        await this.asignarBtn.click();
    }

    async escribirColor(color) {
        await this.ColorInput.clear();
        await this.ColorInput.sendKeys(color);
    }

    async escribirPlaca(noPlaca) {
        await this.NoPlacaInput.clear();
        await this.NoPlacaInput.sendKeys(noPlaca);
    }

    async escribirMarca(marca) {
        await this.MarcaInput.clear();
        await this.MarcaInput.sendKeys(marca);
    }


}
