export class Parqueo {
    id: number;
    Ubicacion: string;
    NoPlaca: string;
    Marca: string;
    Color: string;
    Entrada: Date;
    Disponible: boolean;

    constructor(id: number, ubicacion: string, noPlaca: string, marca: string, color: string, entrada: Date, disponible: boolean) {
        this.id = id;
        this.Ubicacion = ubicacion;
        this.NoPlaca = noPlaca;
        this.Marca = marca;
        this.Color = color;
        this.Entrada = entrada;
        this.Disponible = disponible;
    }
}

