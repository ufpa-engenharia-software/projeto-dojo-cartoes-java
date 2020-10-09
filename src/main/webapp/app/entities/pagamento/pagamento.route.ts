import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPagamento, Pagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoDetailComponent } from './pagamento-detail.component';
import { PagamentoUpdateComponent } from './pagamento-update.component';

@Injectable({ providedIn: 'root' })
export class PagamentoResolve implements Resolve<IPagamento> {
  constructor(private service: PagamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pagamento: HttpResponse<Pagamento>) => {
          if (pagamento.body) {
            return of(pagamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pagamento());
  }
}

export const pagamentoRoute: Routes = [
  {
    path: '',
    component: PagamentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.pagamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PagamentoDetailComponent,
    resolve: {
      pagamento: PagamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.pagamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PagamentoUpdateComponent,
    resolve: {
      pagamento: PagamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.pagamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PagamentoUpdateComponent,
    resolve: {
      pagamento: PagamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.pagamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
