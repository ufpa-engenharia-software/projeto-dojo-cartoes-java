import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoDojoCartoesSharedModule } from 'app/shared/shared.module';
import { EnderecoComponent } from './endereco.component';
import { EnderecoDetailComponent } from './endereco-detail.component';
import { EnderecoUpdateComponent } from './endereco-update.component';
import { EnderecoDeleteDialogComponent } from './endereco-delete-dialog.component';
import { enderecoRoute } from './endereco.route';

@NgModule({
  imports: [ProjetoDojoCartoesSharedModule, RouterModule.forChild(enderecoRoute)],
  declarations: [EnderecoComponent, EnderecoDetailComponent, EnderecoUpdateComponent, EnderecoDeleteDialogComponent],
  entryComponents: [EnderecoDeleteDialogComponent],
})
export class ProjetoDojoCartoesEnderecoModule {}
