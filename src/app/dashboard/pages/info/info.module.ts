import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoRoutingModule } from './info-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InfoEffects } from './store/info.effects';
import { StoreModule } from '@ngrx/store';
import { infoFeature } from './store/info.reducer';



@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule,
    StoreModule.forFeature(infoFeature),
    EffectsModule.forFeature([InfoEffects])
  ],
  exports: [
    InfoComponent
  ]
})
export class InfoModule { }
