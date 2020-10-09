import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoDojoCartoesTestModule } from '../../../test.module';
import { FaturaComponent } from 'app/entities/fatura/fatura.component';
import { FaturaService } from 'app/entities/fatura/fatura.service';
import { Fatura } from 'app/shared/model/fatura.model';

describe('Component Tests', () => {
  describe('Fatura Management Component', () => {
    let comp: FaturaComponent;
    let fixture: ComponentFixture<FaturaComponent>;
    let service: FaturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoDojoCartoesTestModule],
        declarations: [FaturaComponent],
      })
        .overrideTemplate(FaturaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FaturaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FaturaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Fatura(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.faturas && comp.faturas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
