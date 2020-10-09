import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.ProjetoDojoCartoesPessoaModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./endereco/endereco.module').then(m => m.ProjetoDojoCartoesEnderecoModule),
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.ProjetoDojoCartoesCategoriaModule),
      },
      {
        path: 'cartao',
        loadChildren: () => import('./cartao/cartao.module').then(m => m.ProjetoDojoCartoesCartaoModule),
      },
      {
        path: 'produto',
        loadChildren: () => import('./produto/produto.module').then(m => m.ProjetoDojoCartoesProdutoModule),
      },
      {
        path: 'fatura',
        loadChildren: () => import('./fatura/fatura.module').then(m => m.ProjetoDojoCartoesFaturaModule),
      },
      {
        path: 'pagamento',
        loadChildren: () => import('./pagamento/pagamento.module').then(m => m.ProjetoDojoCartoesPagamentoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ProjetoDojoCartoesEntityModule {}
