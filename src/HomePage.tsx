import React from 'react';
import { DateTime } from 'luxon';
import { Cpe } from './Cpe';
import { CpeService } from './CpeService';
import ResultsView from './ResultView';

const emptyBill: Cpe = new Cpe({
  idConsultaCpe: undefined,
  idTipoDocumento: undefined,
  ruc: '',
  razonSocial: undefined,
  serie: '',
  correlativo: '',
  fechaEmision: undefined,
  xmlEnvio: undefined,
  xmlRespuesta: undefined,
  pdfDocumento: undefined,
  nombreArchivoEnvio: undefined,
  nombreArchivoRespuesta: undefined,
  monto: undefined,
  estadoRegistro: undefined,
  tipoDocumento: undefined,
  codTipoDocumento: '03',
});

const mockBill: Cpe = new Cpe({
  idConsultaCpe: undefined,
  idTipoDocumento: undefined,
  ruc: '20604084092',
  razonSocial: undefined,
  serie: 'F001',
  correlativo: '1',
  fechaEmision: new Date(),
  xmlEnvio: undefined,
  xmlRespuesta: undefined,
  pdfDocumento: undefined,
  nombreArchivoEnvio: undefined,
  nombreArchivoRespuesta: undefined,
  monto: undefined,
  estadoRegistro: undefined,
  tipoDocumento: undefined,
  codTipoDocumento: '01',
});

export default function HomePage() {
  const service: CpeService = new CpeService('http://localhost:8080/api');

  const [bill, setBill] = React.useState<Cpe>(mockBill);

  const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(true);

  const [result, setResult] = React.useState<Cpe>();

  function formatDate(value?: Date): string {
    if (value === undefined) {
      return '';
    }
    return DateTime.fromJSDate(value).toFormat('dd/MM/yyyy');
  }

  function parseDate(value?: string): Date | undefined {
    if (value === undefined) {
      return undefined;
    }
    if (value.length !== 10) {
      return undefined;
    }
    return DateTime.fromFormat(value, 'dd/MM/yyyy').toJSDate();
  }

  function bindTaxIdChanges(event: React.ChangeEvent<HTMLInputElement>) {
    bill.ruc = event.currentTarget.value;
  }

  function bindEmittedDateChanges(event: React.ChangeEvent<HTMLInputElement>) {
    bill.fechaEmision = parseDate(event.currentTarget.value);
  }

  function bindBillTypeChanges(event: React.ChangeEvent<HTMLSelectElement>) {
    bill.codTipoDocumento = event.currentTarget.value;
    setBill(bill);
  }

  function bindSerialChanges(event: React.ChangeEvent<HTMLInputElement>) {
    bill.serie = event.currentTarget.value;
  }

  function bindNumberChanges(event: React.ChangeEvent<HTMLInputElement>) {
    bill.correlativo = event.currentTarget.value;
  }

  async function retrieveBill(bill: Cpe): Promise<Cpe | undefined> {
    return await service.getOne(bill.ruc!, bill.fechaEmision!, bill.codTipoDocumento!, bill.serie!, bill.correlativo!);
  }

  async function trySearch(): Promise<void> {
    const currentResult: Cpe | undefined = await retrieveBill(bill);
    setIsFirstLoad(false);
    setResult(currentResult);
  }

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-md">
              <span className="navbar-brand mb-0 h1">React App</span>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col my-3">
          <form>
            <div className="row mb-3">
              <label htmlFor="taxpayerId" className="col-sm-2 col-form-label">Ruc</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={bill.ruc}
                  onChange={(event) => bindTaxIdChanges(event)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="emittedDate" className="col-sm-2 col-form-label">Fecha</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={formatDate(bill.fechaEmision)}
                  onChange={(event) => bindEmittedDateChanges(event)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="type" className="col-sm-2 col-form-label">Tipo</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={bill.codTipoDocumento}
                  onChange={(event) => bindBillTypeChanges(event)}
                >
                  <option value="03">Boleta</option>
                  <option value="01">Factura</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="serie" className="col-sm-2 col-form-label">Serie</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={bill.serie}
                  onChange={(event) => bindSerialChanges(event)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="number" className="col-sm-2 col-form-label">Número</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={bill.correlativo}
                  onChange={(event) => bindNumberChanges(event)}
                />
              </div>
            </div>
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => trySearch()}
              >
                Consultar
              </button>
            </div>
          </form>
        </div>
      </div>
      {isFirstLoad ? (
        <div></div>
      ) : (
        <div className="row">
          <div className="col">
            <ResultsView result={result} />
          </div>
        </div>
      )}
    </div>
  );
}
