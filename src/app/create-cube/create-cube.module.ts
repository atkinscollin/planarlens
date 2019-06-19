import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { CreateCubeComponent } from './create-cube.component';
import { CreateCubeRoutingModule } from './create-cube-routing.module';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        CreateCubeRoutingModule
    ],
    declarations: [CreateCubeComponent]
})
export class CreateCubeModule {}
