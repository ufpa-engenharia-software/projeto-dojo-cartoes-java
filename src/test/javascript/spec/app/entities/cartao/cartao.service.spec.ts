import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CartaoService } from 'app/entities/cartao/cartao.service';
import { ICartao, Cartao } from 'app/shared/model/cartao.model';
import { StatusCartao } from 'app/shared/model/enumerations/status-cartao.model';

describe('Service Tests', () => {
  describe('Cartao Service', () => {
    let injector: TestBed;
    let service: CartaoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICartao;
    let expectedResult: ICartao | ICartao[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CartaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Cartao(0, 'AAAAAAA', StatusCartao.BLOQUEADO, 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datavencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cartao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datavencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datavencimento: currentDate,
          },
          returnedFromService
        );

        service.create(new Cartao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cartao', () => {
        const returnedFromService = Object.assign(
          {
            ndigitos: 'BBBBBB',
            status: 'BBBBBB',
            nometitular: 'BBBBBB',
            codseguranca: 1,
            limitecredito: 1,
            datavencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datavencimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cartao', () => {
        const returnedFromService = Object.assign(
          {
            ndigitos: 'BBBBBB',
            status: 'BBBBBB',
            nometitular: 'BBBBBB',
            codseguranca: 1,
            limitecredito: 1,
            datavencimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datavencimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cartao', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
