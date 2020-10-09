import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICartao } from 'app/shared/model/cartao.model';
import { CartaoService } from './cartao.service';

@Component({
  templateUrl: './cartao-delete-dialog.component.html',
})
export class CartaoDeleteDialogComponent {
  cartao?: ICartao;

  constructor(protected cartaoService: CartaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cartaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cartaoListModification');
      this.activeModal.close();
    });
  }
}
