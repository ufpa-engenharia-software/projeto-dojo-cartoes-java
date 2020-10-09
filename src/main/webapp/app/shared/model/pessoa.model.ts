import { Moment } from 'moment';
import { ICartao } from 'app/shared/model/cartao.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Moment;
  cadastro?: Moment;
  cartaos?: ICartao[];
  endereco?: IEndereco;
  categoria?: ICategoria;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public telefone?: string,
    public dataNascimento?: Moment,
    public cadastro?: Moment,
    public cartaos?: ICartao[],
    public endereco?: IEndereco,
    public categoria?: ICategoria
  ) {}
}
