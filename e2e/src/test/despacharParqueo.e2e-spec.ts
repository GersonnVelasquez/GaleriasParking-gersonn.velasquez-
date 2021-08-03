import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { browser } from 'protractor';
import { ParqueoResumenPage } from '../page/parqueoResumen/parqueoResumen.po';
import { DespacharParqueoPage } from '../page/despacharParqueo/despacharParqueo.po';

describe('Pantalla Despachar Parqueo', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let despacharParqueo: DespacharParqueoPage;
    let resumenParqueo: ParqueoResumenPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        despacharParqueo = new DespacharParqueoPage();
        resumenParqueo = new ParqueoResumenPage();
        browser.waitForAngularEnabled(false);
    });

    it('Deberia Despachar un parqueo', async () => {
        const Ubicacion = 'A3';
        await page.navigateTo();
        await navBar.clickLinkDespacharParqueo();
        browser.sleep(2000);
        await despacharParqueo.seleccionarUbicacion(Ubicacion);
        despacharParqueo.despacharClick();
        browser.sleep(2000);
        expect(resumenParqueo.contarDisponibles()).toBe(4);
    });
});
