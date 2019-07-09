import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartTransactionsComponent } from './pie-chart-transactions.component';

describe('PieChartTransactionsComponent', () => {
  let component: PieChartTransactionsComponent;
  let fixture: ComponentFixture<PieChartTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
