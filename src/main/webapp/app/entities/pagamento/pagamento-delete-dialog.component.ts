import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';

@Component({
  templateUrl: './pagamento-delete-dialog.component.html',
})
export class PagamentoDeleteDialogComponent {
  pagamento?: IPagamento;

  constructor(protected pagamentoService: PagamentoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pagamentoListModification');
      this.activeModal.close();
    });
  }
}
