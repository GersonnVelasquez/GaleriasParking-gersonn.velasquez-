import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ParqueoResumenPage } from '../page/parqueoResumen/parqueoResumen.po';

describe('Pantalla Parqueo Resumen', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let parqueoResumen: ParqueoResumenPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        parqueoResumen = new ParqueoResumenPage();
    });

    it('Deberia listar parqueos', () => {
        page.navigateTo();
        navBar.clickLinkResumen();
        expect(5).toBe(parqueoResumen.contarParqueos());
    });

});
