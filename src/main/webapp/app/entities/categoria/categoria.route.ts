import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICategoria, Categoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from './categoria.service';
import { CategoriaComponent } from './categoria.component';
import { CategoriaDetailComponent } from './categoria-detail.component';
import { CategoriaUpdateComponent } from './categoria-update.component';

@Injectable({ providedIn: 'root' })
export class CategoriaResolve implements Resolve<ICategoria> {
  constructor(private service: CategoriaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((categoria: HttpResponse<Categoria>) => {
          if (categoria.body) {
            return of(categoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Categoria());
  }
}

export const categoriaRoute: Routes = [
  {
    path: '',
    component: CategoriaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.categoria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategoriaDetailComponent,
    resolve: {
      categoria: CategoriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.categoria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategoriaUpdateComponent,
    resolve: {
      categoria: CategoriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.categoria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategoriaUpdateComponent,
    resolve: {
      categoria: CategoriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoDojoCartoesApp.categoria.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
