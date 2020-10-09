import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IEndereco {
  id?: number;
  nome?: string;
  logradouro?: string;
  numero?: number;
  referencia?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  pessoas?: IPessoa[];
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public nome?: string,
    public logradouro?: string,
    public numero?: number,
    public referencia?: string,
    public bairro?: string,
    public cidade?: string,
    public cep?: string,
    public pessoas?: IPessoa[]
  ) {}
}
