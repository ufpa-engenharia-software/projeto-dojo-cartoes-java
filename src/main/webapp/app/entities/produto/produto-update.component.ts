import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProduto, Produto } from 'app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from 'app/entities/fatura/fatura.service';

@Component({
  selector: 'jhi-produto-update',
  templateUrl: './produto-update.component.html',
})
export class ProdutoUpdateComponent implements OnInit {
  isSaving = false;
  faturas: IFatura[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    local: [],
    dataCompra: [],
    valor: [],
    fatura: [],
  });

  constructor(
    protected produtoService: ProdutoService,
    protected faturaService: FaturaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produto }) => {
      if (!produto.id) {
        const today = moment().startOf('day');
        produto.dataCompra = today;
      }

      this.updateForm(produto);

      this.faturaService.query().subscribe((res: HttpResponse<IFatura[]>) => (this.faturas = res.body || []));
    });
  }

  updateForm(produto: IProduto): void {
    this.editForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      local: produto.local,
      dataCompra: produto.dataCompra ? produto.dataCompra.format(DATE_TIME_FORMAT) : null,
      valor: produto.valor,
      fatura: produto.fatura,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produto = this.createFromForm();
    if (produto.id !== undefined) {
      this.subscribeToSaveResponse(this.produtoService.update(produto));
    } else {
      this.subscribeToSaveResponse(this.produtoService.create(produto));
    }
  }

  private createFromForm(): IProduto {
    return {
      ...new Produto(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      local: this.editForm.get(['local'])!.value,
      dataCompra: this.editForm.get(['dataCompra'])!.value ? moment(this.editForm.get(['dataCompra'])!.value, DATE_TIME_FORMAT) : undefined,
      valor: this.editForm.get(['valor'])!.value,
      fatura: this.editForm.get(['fatura'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduto>>): void {
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

  trackById(index: number, item: IFatura): any {
    return item.id;
  }
}
