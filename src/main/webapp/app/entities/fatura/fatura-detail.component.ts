import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFatura } from 'app/shared/model/fatura.model';

@Component({
  selector: 'jhi-fatura-detail',
  templateUrl: './fatura-detail.component.html',
})
export class FaturaDetailComponent implements OnInit {
  fatura: IFatura | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fatura }) => (this.fatura = fatura));
  }

  previousState(): void {
    window.history.back();
  }
}
