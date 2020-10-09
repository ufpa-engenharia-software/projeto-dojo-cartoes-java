import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoDojoCartoesTestModule } from '../../../test.module';
import { PagamentoDetailComponent } from 'app/entities/pagamento/pagamento-detail.component';
import { Pagamento } from 'app/shared/model/pagamento.model';

describe('Component Tests', () => {
  describe('Pagamento Management Detail Component', () => {
    let comp: PagamentoDetailComponent;
    let fixture: ComponentFixture<PagamentoDetailComponent>;
    const route = ({ data: of({ pagamento: new Pagamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoDojoCartoesTestModule],
        declarations: [PagamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PagamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pagamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
