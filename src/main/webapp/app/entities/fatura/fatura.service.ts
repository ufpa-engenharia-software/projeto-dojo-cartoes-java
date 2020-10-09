import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFatura } from 'app/shared/model/fatura.model';

type EntityResponseType = HttpResponse<IFatura>;
type EntityArrayResponseType = HttpResponse<IFatura[]>;

@Injectable({ providedIn: 'root' })
export class FaturaService {
  public resourceUrl = SERVER_API_URL + 'api/faturas';

  constructor(protected http: HttpClient) {}

  create(fatura: IFatura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fatura);
    return this.http
      .post<IFatura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fatura: IFatura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fatura);
    return this.http
      .put<IFatura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFatura>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFatura[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fatura: IFatura): IFatura {
    const copy: IFatura = Object.assign({}, fatura, {
      dataDeProcessamento:
        fatura.dataDeProcessamento && fatura.dataDeProcessamento.isValid() ? fatura.dataDeProcessamento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataDeProcessamento = res.body.dataDeProcessamento ? moment(res.body.dataDeProcessamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((fatura: IFatura) => {
        fatura.dataDeProcessamento = fatura.dataDeProcessamento ? moment(fatura.dataDeProcessamento) : undefined;
      });
    }
    return res;
  }
}
