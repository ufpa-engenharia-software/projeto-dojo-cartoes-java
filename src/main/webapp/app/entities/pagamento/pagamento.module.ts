import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoDojoCartoesSharedModule } from 'app/shared/shared.module';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoDetailComponent } from './pagamento-detail.component';
import { PagamentoUpdateComponent } from './pagamento-update.component';
import { PagamentoDeleteDialogComponent } from './pagamento-delete-dialog.component';
import { pagamentoRoute } from './pagamento.route';

@NgModule({
  imports: [ProjetoDojoCartoesSharedModule, RouterModule.forChild(pagamentoRoute)],
  declarations: [PagamentoComponent, PagamentoDetailComponent, PagamentoUpdateComponent, PagamentoDeleteDialogComponent],
  entryComponents: [PagamentoDeleteDialogComponent],
})
export class ProjetoDojoCartoesPagamentoModule {}
