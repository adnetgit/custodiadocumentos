import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentosComponent } from './TipoDocumentos.component';

describe('TipodocumentosComponent', () => {
  let component: TipoDocumentosComponent;
  let fixture: ComponentFixture<TipoDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
