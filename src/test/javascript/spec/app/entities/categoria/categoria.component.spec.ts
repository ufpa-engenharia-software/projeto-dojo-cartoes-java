import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoDojoCartoesTestModule } from '../../../test.module';
import { CategoriaComponent } from 'app/entities/categoria/categoria.component';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { Categoria } from 'app/shared/model/categoria.model';

describe('Component Tests', () => {
  describe('Categoria Management Component', () => {
    let comp: CategoriaComponent;
    let fixture: ComponentFixture<CategoriaComponent>;
    let service: CategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoDojoCartoesTestModule],
        declarations: [CategoriaComponent],
      })
        .overrideTemplate(CategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Categoria(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categorias && comp.categorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
