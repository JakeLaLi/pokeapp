import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPokemonComponent } from './display-pokemon.component';

describe('DisplayPokemonComponent', () => {
  let component: DisplayPokemonComponent;
  let fixture: ComponentFixture<DisplayPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
