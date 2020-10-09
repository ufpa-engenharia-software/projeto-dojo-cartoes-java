import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';

type SelectableEntity = IEndereco | ICategoria;

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];
  categorias: ICategoria[] = [];
  dataNascimentoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    email: [],
    telefone: [],
    dataNascimento: [],
    cadastro: [],
    endereco: [],
    categoria: [],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected enderecoService: EnderecoService,
    protected categoriaService: CategoriaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      if (!pessoa.id) {
        const today = moment().startOf('day');
        pessoa.cadastro = today;
      }

      this.updateForm(pessoa);

      this.enderecoService.query().subscribe((res: HttpResponse<IEndereco[]>) => (this.enderecos = res.body || []));

      this.categoriaService.query().subscribe((res: HttpResponse<ICategoria[]>) => (this.categorias = res.body || []));
    });
  }

  updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      email: pessoa.email,
      telefone: pessoa.telefone,
      dataNascimento: pessoa.dataNascimento,
      cadastro: pessoa.cadastro ? pessoa.cadastro.format(DATE_TIME_FORMAT) : null,
      endereco: pessoa.endereco,
      categoria: pessoa.categoria,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      email: this.editForm.get(['email'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      cadastro: this.editForm.get(['cadastro'])!.value ? moment(this.editForm.get(['cadastro'])!.value, DATE_TIME_FORMAT) : undefined,
      endereco: this.editForm.get(['endereco'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
