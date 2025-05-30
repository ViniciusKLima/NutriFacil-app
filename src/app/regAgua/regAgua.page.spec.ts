import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegAguaPage } from './regAgua.page';

describe('Tab2Page', () => {
  let component: RegAguaPage;
  let fixture: ComponentFixture<RegAguaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegAguaPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegAguaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
