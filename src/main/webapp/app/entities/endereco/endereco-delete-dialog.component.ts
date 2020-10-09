import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';

@Component({
  templateUrl: './endereco-delete-dialog.component.html',
})
export class EnderecoDeleteDialogComponent {
  endereco?: IEndereco;

  constructor(protected enderecoService: EnderecoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enderecoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('enderecoListModification');
      this.activeModal.close();
    });
  }
}
