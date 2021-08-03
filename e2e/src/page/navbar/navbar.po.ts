import { by, element } from 'protractor';

export class NavbarPage {
    linkResumen = element(by.id('resumenLink'));
    linkAsignarParqueo = element(by.id('asignarParqueoLink'));
    linkDespacharParqueo = element(by.id('despacharParqueoLink'));

    async clickLinkResumen() {
        await this.linkResumen.click();
    }

    async clickLinkAsignarParqueo() {
        await this.linkAsignarParqueo.click();
    }

    async clickLinkDespacharParqueo() {
        await this.linkDespacharParqueo.click();
    }
}
