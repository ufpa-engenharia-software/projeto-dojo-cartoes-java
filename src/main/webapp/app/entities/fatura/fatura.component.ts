import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';
import { FaturaDeleteDialogComponent } from './fatura-delete-dialog.component';

@Component({
  selector: 'jhi-fatura',
  templateUrl: './fatura.component.html',
})
export class FaturaComponent implements OnInit, OnDestroy {
  faturas?: IFatura[];
  eventSubscriber?: Subscription;

  constructor(protected faturaService: FaturaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.faturaService.query().subscribe((res: HttpResponse<IFatura[]>) => (this.faturas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFaturas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFatura): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFaturas(): void {
    this.eventSubscriber = this.eventManager.subscribe('faturaListModification', () => this.loadAll());
  }

  delete(fatura: IFatura): void {
    const modalRef = this.modalService.open(FaturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fatura = fatura;
  }
}
