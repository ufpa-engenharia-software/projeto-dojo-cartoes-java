import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoDojoCartoesSharedModule } from 'app/shared/shared.module';
import { CartaoComponent } from './cartao.component';
import { CartaoDetailComponent } from './cartao-detail.component';
import { CartaoUpdateComponent } from './cartao-update.component';
import { CartaoDeleteDialogComponent } from './cartao-delete-dialog.component';
import { cartaoRoute } from './cartao.route';

@NgModule({
  imports: [ProjetoDojoCartoesSharedModule, RouterModule.forChild(cartaoRoute)],
  declarations: [CartaoComponent, CartaoDetailComponent, CartaoUpdateComponent, CartaoDeleteDialogComponent],
  entryComponents: [CartaoDeleteDialogComponent],
})
export class ProjetoDojoCartoesCartaoModule {}
