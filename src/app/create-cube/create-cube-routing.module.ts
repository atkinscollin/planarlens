import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { CreateCubeComponent } from './create-cube.component';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
    Shell.childRoutes([
        {
            path: 'create-cube',
            component: CreateCubeComponent,
            data: { title: 'Create Cube' },
            canActivate: [AuthenticationGuard]
        }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class CreateCubeRoutingModule {}
