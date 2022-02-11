import { DateTime } from "luxon";
import Mustache from "mustache";
import { Convert, Cpe } from "./Cpe";
import { CpeEndpoints } from "./CpeEndpoints";

export class CpeService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getOne(ruc: string, fechaEmision: Date, codTipoDocumento: string, serie: string, correlativo: string): Promise<Cpe | undefined> {
        const fRuc: string = ruc === undefined || !ruc.length ? '00000000000' : ruc;
        const fFechaEmision: string = DateTime.fromJSDate(fechaEmision ?? new Date()).toFormat('yyyy-MM-dd');
        const fCodTipoDocumento: string = codTipoDocumento === undefined || !codTipoDocumento.length ? '00' : codTipoDocumento;
        const fSerie: string = serie === undefined || !serie.length ? 'Z000' : serie;
        const fCorrelativo: string = correlativo === undefined || !correlativo.length ? '0' : correlativo;
        const segmentValues: any = {
            ruc: fRuc,
            fechaEmision: fFechaEmision,
            codTipoDocumento: fCodTipoDocumento,
            serie: fSerie,
            correlativo: fCorrelativo,
        };
        const endpointUri: string = this.renderEndpoint(CpeEndpoints.getAll, segmentValues);
        const requestUrl: string = `${this.baseUrl}/${endpointUri}`;
        console.log(`Request GET to ${requestUrl}`);
        const response: Response = await fetch(requestUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const responseStatus: number = response.status;
        const responseBody: string = await response.text();
        console.log(`Response status ${responseStatus}`);
        console.log(`Response body ${responseBody}`);
        if (response.status === 200) {
            return responseBody.length ? Convert.toCpe(responseBody) : undefined;
        }
        throw new Error('An error occurred on the server side');
    }

    private renderEndpoint(endpoint: string, segmentValues: any): string {
        return Mustache.render(endpoint, segmentValues);
    }
}