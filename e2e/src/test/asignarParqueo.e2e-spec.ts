import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { AsignarParqueoPage } from '../page/asignarParqueo/asignarParqueo.po';
import { browser } from 'protractor';
import { ParqueoResumenPage } from '../page/parqueoResumen/parqueoResumen.po';

describe('Pantalla Asignar Parqueo', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let asigarParqueo: AsignarParqueoPage;
    let resumenParqueo: ParqueoResumenPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        asigarParqueo = new AsignarParqueoPage();
        resumenParqueo = new ParqueoResumenPage();
        browser.waitForAngularEnabled(false);
    });

    it('Deberia asignar un parqueo', async () => {
        const Ubicacion = 'A1';
        const NoPlaca = 'H2ASW123';
        const Marca = 'HONDA';
        const Color = 'AZUL';
        await page.navigateTo();
        await navBar.clickLinkAsignarParqueo();
        browser.sleep(2000);
        await asigarParqueo.seleccionarUbicacion(Ubicacion);
        await asigarParqueo.escribirPlaca(NoPlaca);
        await asigarParqueo.escribirMarca(Marca);
        await asigarParqueo.escribirColor(Color);
        asigarParqueo.asignarClick();
        browser.sleep(2000);
        expect(resumenParqueo.contarDisponibles()).toBe(3);
    });


});
