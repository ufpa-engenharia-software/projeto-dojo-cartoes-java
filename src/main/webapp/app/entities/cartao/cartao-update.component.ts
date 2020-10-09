import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICartao, Cartao } from 'app/shared/model/cartao.model';
import { CartaoService } from './cartao.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

@Component({
  selector: 'jhi-cartao-update',
  templateUrl: './cartao-update.component.html',
})
export class CartaoUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];
  datavencimentoDp: any;

  editForm = this.fb.group({
    id: [],
    ndigitos: [],
    status: [],
    nometitular: [],
    codseguranca: [],
    limitecredito: [],
    datavencimento: [],
    pessoa: [],
  });

  constructor(
    protected cartaoService: CartaoService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartao }) => {
      this.updateForm(cartao);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
    });
  }

  updateForm(cartao: ICartao): void {
    this.editForm.patchValue({
      id: cartao.id,
      ndigitos: cartao.ndigitos,
      status: cartao.status,
      nometitular: cartao.nometitular,
      codseguranca: cartao.codseguranca,
      limitecredito: cartao.limitecredito,
      datavencimento: cartao.datavencimento,
      pessoa: cartao.pessoa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cartao = this.createFromForm();
    if (cartao.id !== undefined) {
      this.subscribeToSaveResponse(this.cartaoService.update(cartao));
    } else {
      this.subscribeToSaveResponse(this.cartaoService.create(cartao));
    }
  }

  private createFromForm(): ICartao {
    return {
      ...new Cartao(),
      id: this.editForm.get(['id'])!.value,
      ndigitos: this.editForm.get(['ndigitos'])!.value,
      status: this.editForm.get(['status'])!.value,
      nometitular: this.editForm.get(['nometitular'])!.value,
      codseguranca: this.editForm.get(['codseguranca'])!.value,
      limitecredito: this.editForm.get(['limitecredito'])!.value,
      datavencimento: this.editForm.get(['datavencimento'])!.value,
      pessoa: this.editForm.get(['pessoa'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartao>>): void {
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

  trackById(index: number, item: IPessoa): any {
    return item.id;
  }
}
