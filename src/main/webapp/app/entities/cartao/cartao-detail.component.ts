import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICartao } from 'app/shared/model/cartao.model';

@Component({
  selector: 'jhi-cartao-detail',
  templateUrl: './cartao-detail.component.html',
})
export class CartaoDetailComponent implements OnInit {
  cartao: ICartao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartao }) => (this.cartao = cartao));
  }

  previousState(): void {
    window.history.back();
  }
}
