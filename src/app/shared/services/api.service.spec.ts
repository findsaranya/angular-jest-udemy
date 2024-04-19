import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';


import { ApiService } from './api.service';
import { TagInterface } from '../types/tag.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ApiService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTags',() => {
    it("should return a list of tags",() => {
      let tags : TagInterface[] | undefined;
      service.getTags().subscribe(response => tags=response);
      const req = httpTestingController.expectOne(service.apiUrl+'/tags');
      req.flush([{
        id:"1",
        name:"foo"
      }])
      expect(tags).toEqual([{
        id:'1',
        name:"foo"
      }]);
    })
  });

  describe('createTag', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;
      service.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '1', name: 'foo' });
      expect(tag).toEqual({ id: '1', name: 'foo' });
    });

    it('passes the correct body', () => {
      let tag: TagInterface | undefined;
      service.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '1', name: 'foo' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'foo' });
    });

  });

});
