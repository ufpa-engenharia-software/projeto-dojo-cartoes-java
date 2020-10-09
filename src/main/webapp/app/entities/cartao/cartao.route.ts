import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICartao, Cartao } from 'app/shared/model/cartao.model';
import { CartaoService } from './cartao.service';
import { CartaoComponent } from './cartao.component';
import { CartaoDetailComponent } from './cartao-detail.component';
import { CartaoUpdateComponent } from './cartao-update.component';

@Injectable({ providedIn: 'root' })
export class CartaoResolve implements Resolve<ICartao> {
  constructor(private service: CartaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICartao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cartao: HttpResponse<Cartao>) => {
          if (cartao.body) {
            return of(cartao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cartao());
  }
}

export const cartaoRoute: Routes = [
  {
    path: '',
    component: CartaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.cartao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CartaoDetailComponent,
    resolve: {
      cartao: CartaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.cartao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CartaoUpdateComponent,
    resolve: {
      cartao: CartaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.cartao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CartaoUpdateComponent,
    resolve: {
      cartao: CartaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.cartao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
