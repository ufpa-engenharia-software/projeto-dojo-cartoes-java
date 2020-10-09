import { Moment } from 'moment';
import { IFatura } from 'app/shared/model/fatura.model';

export interface IProduto {
  id?: number;
  nome?: string;
  local?: string;
  dataCompra?: Moment;
  valor?: number;
  fatura?: IFatura;
}

export class Produto implements IProduto {
  constructor(
    public id?: number,
    public nome?: string,
    public local?: string,
    public dataCompra?: Moment,
    public valor?: number,
    public fatura?: IFatura
  ) {}
}
