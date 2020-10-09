import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';

@Component({
  templateUrl: './fatura-delete-dialog.component.html',
})
export class FaturaDeleteDialogComponent {
  fatura?: IFatura;

  constructor(protected faturaService: FaturaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.faturaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('faturaListModification');
      this.activeModal.close();
    });
  }
}
