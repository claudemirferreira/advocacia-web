import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModeloComponent } from './item-modelo.component';

describe('ItemModeloComponent', () => {
  let component: ItemModeloComponent;
  let fixture: ComponentFixture<ItemModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
