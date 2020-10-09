import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';
import { PagamentoDeleteDialogComponent } from './pagamento-delete-dialog.component';

@Component({
  selector: 'jhi-pagamento',
  templateUrl: './pagamento.component.html',
})
export class PagamentoComponent implements OnInit, OnDestroy {
  pagamentos?: IPagamento[];
  eventSubscriber?: Subscription;

  constructor(protected pagamentoService: PagamentoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pagamentoService.query().subscribe((res: HttpResponse<IPagamento[]>) => (this.pagamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPagamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPagamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPagamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('pagamentoListModification', () => this.loadAll());
  }

  delete(pagamento: IPagamento): void {
    const modalRef = this.modalService.open(PagamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pagamento = pagamento;
  }
}
