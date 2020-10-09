import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICartao } from 'app/shared/model/cartao.model';

type EntityResponseType = HttpResponse<ICartao>;
type EntityArrayResponseType = HttpResponse<ICartao[]>;

@Injectable({ providedIn: 'root' })
export class CartaoService {
  public resourceUrl = SERVER_API_URL + 'api/cartaos';

  constructor(protected http: HttpClient) {}

  create(cartao: ICartao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cartao);
    return this.http
      .post<ICartao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cartao: ICartao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cartao);
    return this.http
      .put<ICartao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICartao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICartao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cartao: ICartao): ICartao {
    const copy: ICartao = Object.assign({}, cartao, {
      datavencimento: cartao.datavencimento && cartao.datavencimento.isValid() ? cartao.datavencimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datavencimento = res.body.datavencimento ? moment(res.body.datavencimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cartao: ICartao) => {
        cartao.datavencimento = cartao.datavencimento ? moment(cartao.datavencimento) : undefined;
      });
    }
    return res;
  }
}
