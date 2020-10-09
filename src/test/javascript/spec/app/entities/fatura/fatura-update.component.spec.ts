import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoDojoCartoesTestModule } from '../../../test.module';
import { FaturaUpdateComponent } from 'app/entities/fatura/fatura-update.component';
import { FaturaService } from 'app/entities/fatura/fatura.service';
import { Fatura } from 'app/shared/model/fatura.model';

describe('Component Tests', () => {
  describe('Fatura Management Update Component', () => {
    let comp: FaturaUpdateComponent;
    let fixture: ComponentFixture<FaturaUpdateComponent>;
    let service: FaturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoDojoCartoesTestModule],
        declarations: [FaturaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FaturaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FaturaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FaturaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fatura(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fatura();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
