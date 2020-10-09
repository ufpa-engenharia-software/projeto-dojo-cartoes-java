import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFatura, Fatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';
import { FaturaComponent } from './fatura.component';
import { FaturaDetailComponent } from './fatura-detail.component';
import { FaturaUpdateComponent } from './fatura-update.component';

@Injectable({ providedIn: 'root' })
export class FaturaResolve implements Resolve<IFatura> {
  constructor(private service: FaturaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFatura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fatura: HttpResponse<Fatura>) => {
          if (fatura.body) {
            return of(fatura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fatura());
  }
}

export const faturaRoute: Routes = [
  {
    path: '',
    component: FaturaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.fatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FaturaDetailComponent,
    resolve: {
      fatura: FaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.fatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FaturaUpdateComponent,
    resolve: {
      fatura: FaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.fatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FaturaUpdateComponent,
    resolve: {
      fatura: FaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.fatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
