import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';

@NgModule({
    imports: [CommonModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, HomeRoutingModule],
    declarations: [HomeComponent],
    providers: [QuoteService]
})
export class HomeModule {}
