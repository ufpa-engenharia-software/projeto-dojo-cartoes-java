import { Moment } from 'moment';
import { IFatura } from 'app/shared/model/fatura.model';

export interface IPagamento {
  id?: number;
  data?: Moment;
  valor?: number;
  nomeBanco?: string;
  fatura?: IFatura;
}

export class Pagamento implements IPagamento {
  constructor(public id?: number, public data?: Moment, public valor?: number, public nomeBanco?: string, public fatura?: IFatura) {}
}
