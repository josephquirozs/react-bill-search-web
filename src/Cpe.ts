export class Cpe {
    idConsultaCpe: number | undefined;
    idTipoDocumento: number | undefined;
    ruc: string | undefined;
    razonSocial: string | undefined;
    serie: string | undefined;
    correlativo: string | undefined;
    fechaEmision: Date | undefined;
    xmlEnvio: undefined;
    xmlRespuesta: undefined;
    pdfDocumento: undefined;
    nombreArchivoEnvio: string | undefined;
    nombreArchivoRespuesta: string | undefined;
    monto: number | undefined;
    estadoRegistro: boolean | undefined;
    tipoDocumento: string | undefined;
    codTipoDocumento: string | undefined;

    constructor(values: Cpe) {
        this.idConsultaCpe = values.idConsultaCpe;
        this.idTipoDocumento = values.idTipoDocumento;
        this.ruc = values.ruc;
        this.razonSocial = values.razonSocial;
        this.serie = values.serie;
        this.correlativo = values.correlativo;
        this.fechaEmision = values.fechaEmision;
        this.xmlEnvio = values.xmlEnvio;
        this.xmlRespuesta = values.xmlRespuesta;
        this.pdfDocumento = values.pdfDocumento;
        this.nombreArchivoEnvio = values.nombreArchivoEnvio;
        this.nombreArchivoRespuesta = values.nombreArchivoRespuesta;
        this.monto = values.monto;
        this.estadoRegistro = values.estadoRegistro;
        this.tipoDocumento = values.tipoDocumento;
        this.codTipoDocumento = values.codTipoDocumento;
    }
}

export class Convert {
    public static toCpe(json: string): Cpe {
        return JSON.parse(json);
    }

    public static cpeToJson(value: Cpe): string {
        return JSON.stringify(value);
    }
}
