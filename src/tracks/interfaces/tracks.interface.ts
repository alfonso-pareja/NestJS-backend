
export interface ITrackResponse {
    total_albumes:   number;
    total_canciones: number;
    albumes: string[];
    canciones: ISong[];
}

export interface IResponse {
    message: string;
    status: boolean;
    data: any;
}

export interface ISong {
    cancion_id:     number;
    nombre_album:   string;
    nombre_tema:    string;
    preview_url:    string;
    fecha_lanzamiento: string;
    precio: IPrice;
}

export class IPrice {
    valor:  string;
    moneda: string;
}