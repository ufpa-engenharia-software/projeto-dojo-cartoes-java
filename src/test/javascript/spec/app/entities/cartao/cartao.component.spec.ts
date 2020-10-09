import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoDojoCartoesTestModule } from '../../../test.module';
import { CartaoComponent } from 'app/entities/cartao/cartao.component';
import { CartaoService } from 'app/entities/cartao/cartao.service';
import { Cartao } from 'app/shared/model/cartao.model';

describe('Component Tests', () => {
  describe('Cartao Management Component', () => {
    let comp: CartaoComponent;
    let fixture: ComponentFixture<CartaoComponent>;
    let service: CartaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoDojoCartoesTestModule],
        declarations: [CartaoComponent],
      })
        .overrideTemplate(CartaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CartaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CartaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cartao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cartaos && comp.cartaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
