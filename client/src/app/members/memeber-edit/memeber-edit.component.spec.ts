import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeberEditComponent } from './memeber-edit.component';

describe('MemeberEditComponent', () => {
  let component: MemeberEditComponent;
  let fixture: ComponentFixture<MemeberEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeberEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemeberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
