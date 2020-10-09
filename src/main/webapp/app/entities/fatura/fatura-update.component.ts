import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFatura, Fatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento/pagamento.service';
import { ICartao } from 'app/shared/model/cartao.model';
import { CartaoService } from 'app/entities/cartao/cartao.service';

type SelectableEntity = IPagamento | ICartao;

@Component({
  selector: 'jhi-fatura-update',
  templateUrl: './fatura-update.component.html',
})
export class FaturaUpdateComponent implements OnInit {
  isSaving = false;
  pagamentos: IPagamento[] = [];
  cartaos: ICartao[] = [];
  dataDeProcessamentoDp: any;

  editForm = this.fb.group({
    id: [],
    dataDeProcessamento: [],
    valorTotal: [],
    status: [],
    pontuacaoGanhar: [],
    pagamento: [],
    cartao: [],
  });

  constructor(
    protected faturaService: FaturaService,
    protected pagamentoService: PagamentoService,
    protected cartaoService: CartaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fatura }) => {
      this.updateForm(fatura);

      this.pagamentoService
        .query({ filter: 'fatura-is-null' })
        .pipe(
          map((res: HttpResponse<IPagamento[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPagamento[]) => {
          if (!fatura.pagamento || !fatura.pagamento.id) {
            this.pagamentos = resBody;
          } else {
            this.pagamentoService
              .find(fatura.pagamento.id)
              .pipe(
                map((subRes: HttpResponse<IPagamento>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPagamento[]) => (this.pagamentos = concatRes));
          }
        });

      this.cartaoService.query().subscribe((res: HttpResponse<ICartao[]>) => (this.cartaos = res.body || []));
    });
  }

  updateForm(fatura: IFatura): void {
    this.editForm.patchValue({
      id: fatura.id,
      dataDeProcessamento: fatura.dataDeProcessamento,
      valorTotal: fatura.valorTotal,
      status: fatura.status,
      pontuacaoGanhar: fatura.pontuacaoGanhar,
      pagamento: fatura.pagamento,
      cartao: fatura.cartao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fatura = this.createFromForm();
    if (fatura.id !== undefined) {
      this.subscribeToSaveResponse(this.faturaService.update(fatura));
    } else {
      this.subscribeToSaveResponse(this.faturaService.create(fatura));
    }
  }

  private createFromForm(): IFatura {
    return {
      ...new Fatura(),
      id: this.editForm.get(['id'])!.value,
      dataDeProcessamento: this.editForm.get(['dataDeProcessamento'])!.value,
      valorTotal: this.editForm.get(['valorTotal'])!.value,
      status: this.editForm.get(['status'])!.value,
      pontuacaoGanhar: this.editForm.get(['pontuacaoGanhar'])!.value,
      pagamento: this.editForm.get(['pagamento'])!.value,
      cartao: this.editForm.get(['cartao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFatura>>): void {
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
