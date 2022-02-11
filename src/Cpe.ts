export class Cpe {
    idConsultaCpe?: number;
    idTipoDocumento?: number;
    ruc?: string;
    razonSocial?: string;
    serie?: string;
    correlativo?: string;
    fechaEmision?: Date;
    xmlEnvio?: null;
    xmlRespuesta?: null;
    pdfDocumento?: null;
    nombreArchivoEnvio?: string;
    nombreArchivoRespuesta?: string;
    monto?: number;
    estadoRegistro?: boolean;
    tipoDocumento?: string;
    codTipoDocumento?: string;

    constructor(literal: Cpe) {
        this.idConsultaCpe = literal.idConsultaCpe;
        this.idTipoDocumento = literal.idTipoDocumento;
        this.ruc = literal.ruc;
        this.razonSocial = literal.razonSocial;
        this.serie = literal.serie;
        this.correlativo = literal.correlativo;
        this.fechaEmision = literal.fechaEmision;
        this.xmlEnvio = literal.xmlEnvio;
        this.xmlRespuesta = literal.xmlRespuesta;
        this.pdfDocumento = literal.pdfDocumento;
        this.nombreArchivoEnvio = literal.nombreArchivoEnvio;
        this.nombreArchivoRespuesta = literal.nombreArchivoRespuesta;
        this.monto = literal.monto;
        this.estadoRegistro = literal.estadoRegistro;
        this.tipoDocumento = literal.tipoDocumento;
        this.codTipoDocumento = literal.codTipoDocumento;
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
