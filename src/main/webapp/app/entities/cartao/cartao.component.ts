import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICartao } from 'app/shared/model/cartao.model';
import { CartaoService } from './cartao.service';
import { CartaoDeleteDialogComponent } from './cartao-delete-dialog.component';

@Component({
  selector: 'jhi-cartao',
  templateUrl: './cartao.component.html',
})
export class CartaoComponent implements OnInit, OnDestroy {
  cartaos?: ICartao[];
  eventSubscriber?: Subscription;

  constructor(protected cartaoService: CartaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cartaoService.query().subscribe((res: HttpResponse<ICartao[]>) => (this.cartaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCartaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICartao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCartaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartaoListModification', () => this.loadAll());
  }

  delete(cartao: ICartao): void {
    const modalRef = this.modalService.open(CartaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cartao = cartao;
  }
}
