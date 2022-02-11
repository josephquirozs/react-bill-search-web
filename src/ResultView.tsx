import React from "react";
import { DateTime } from "luxon";
import { Cpe } from "./Cpe";

interface ResultViewProps {
  result?: Cpe
}

export default function ResultView({ result }: ResultViewProps) {
  return (
    <React.Fragment>
      {result === undefined
        ?
        <div className="text-center">
          <h1>
            Sin resultados
          </h1>
          <p>
            Revise los datos ingresados y vuelva a intentarlo
          </p>
        </div>
        :
        <div className="text-center">
          <h1>
            Comprobante encontrado
          </h1>
          <p className="my-0">
            {result.tipoDocumento} {result.serie}-{result.correlativo}
          </p>
          <p className="my-0">
            Emitida el {DateTime.fromJSDate(result.fechaEmision!).toFormat('dd/MM/yyyy')}
          </p>
          <p className="my-0">
            {result.razonSocial}
          </p>
          <p className="fs-2 fw-bold text-secondary">
            S/ {result.monto}
          </p>
          <a href="#" className="link-primary mr-5">Descargar PDF</a>
          <span className="mx-4"></span>
          <a href="#" className="link-primary ml-2">Descargar XML</a>
        </div>
      }
    </React.Fragment>
  );
}
