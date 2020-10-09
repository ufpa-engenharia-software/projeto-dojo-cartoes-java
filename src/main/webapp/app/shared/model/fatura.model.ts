import { Moment } from 'moment';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { IProduto } from 'app/shared/model/produto.model';
import { ICartao } from 'app/shared/model/cartao.model';
import { StatusFatura } from 'app/shared/model/enumerations/status-fatura.model';

export interface IFatura {
  id?: number;
  dataDeProcessamento?: Moment;
  valorTotal?: number;
  status?: StatusFatura;
  pontuacaoGanhar?: string;
  pagamento?: IPagamento;
  produtos?: IProduto[];
  cartao?: ICartao;
}

export class Fatura implements IFatura {
  constructor(
    public id?: number,
    public dataDeProcessamento?: Moment,
    public valorTotal?: number,
    public status?: StatusFatura,
    public pontuacaoGanhar?: string,
    public pagamento?: IPagamento,
    public produtos?: IProduto[],
    public cartao?: ICartao
  ) {}
}
