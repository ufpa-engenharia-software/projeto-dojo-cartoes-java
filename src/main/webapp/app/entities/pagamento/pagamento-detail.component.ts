import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagamento } from 'app/shared/model/pagamento.model';

@Component({
  selector: 'jhi-pagamento-detail',
  templateUrl: './pagamento-detail.component.html',
})
export class PagamentoDetailComponent implements OnInit {
  pagamento: IPagamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pagamento }) => (this.pagamento = pagamento));
  }

  previousState(): void {
    window.history.back();
  }
}
