import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduto } from 'app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { ProdutoDeleteDialogComponent } from './produto-delete-dialog.component';

@Component({
  selector: 'jhi-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit, OnDestroy {
  produtos?: IProduto[];
  eventSubscriber?: Subscription;

  constructor(protected produtoService: ProdutoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.produtoService.query().subscribe((res: HttpResponse<IProduto[]>) => (this.produtos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProdutos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProduto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProdutos(): void {
    this.eventSubscriber = this.eventManager.subscribe('produtoListModification', () => this.loadAll());
  }

  delete(produto: IProduto): void {
    const modalRef = this.modalService.open(ProdutoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produto = produto;
  }
}
