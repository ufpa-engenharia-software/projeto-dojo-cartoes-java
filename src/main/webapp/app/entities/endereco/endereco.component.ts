import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';
import { EnderecoDeleteDialogComponent } from './endereco-delete-dialog.component';

@Component({
  selector: 'jhi-endereco',
  templateUrl: './endereco.component.html',
})
export class EnderecoComponent implements OnInit, OnDestroy {
  enderecos?: IEndereco[];
  eventSubscriber?: Subscription;

  constructor(protected enderecoService: EnderecoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.enderecoService.query().subscribe((res: HttpResponse<IEndereco[]>) => (this.enderecos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEnderecos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEndereco): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEnderecos(): void {
    this.eventSubscriber = this.eventManager.subscribe('enderecoListModification', () => this.loadAll());
  }

  delete(endereco: IEndereco): void {
    const modalRef = this.modalService.open(EnderecoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.endereco = endereco;
  }
}
