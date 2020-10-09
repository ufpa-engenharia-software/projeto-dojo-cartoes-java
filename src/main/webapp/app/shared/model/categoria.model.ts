import { IPessoa } from 'app/shared/model/pessoa.model';

export interface ICategoria {
  id?: number;
  nome?: string;
  descricao?: string;
  pontuacaoMinima?: number;
  pessoas?: IPessoa[];
}

export class Categoria implements ICategoria {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public pontuacaoMinima?: number,
    public pessoas?: IPessoa[]
  ) {}
}
