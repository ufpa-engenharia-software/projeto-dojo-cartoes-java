import { Moment } from 'moment';
import { IFatura } from 'app/shared/model/fatura.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { StatusCartao } from 'app/shared/model/enumerations/status-cartao.model';

export interface ICartao {
  id?: number;
  ndigitos?: string;
  status?: StatusCartao;
  nometitular?: string;
  codseguranca?: number;
  limitecredito?: number;
  datavencimento?: Moment;
  faturas?: IFatura[];
  pessoa?: IPessoa;
}

export class Cartao implements ICartao {
  constructor(
    public id?: number,
    public ndigitos?: string,
    public status?: StatusCartao,
    public nometitular?: string,
    public codseguranca?: number,
    public limitecredito?: number,
    public datavencimento?: Moment,
    public faturas?: IFatura[],
    public pessoa?: IPessoa
  ) {}
}
