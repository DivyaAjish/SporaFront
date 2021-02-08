import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AddComponent } from './add/add.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { PlantsComponent } from './plants.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: PlantsComponent },
  { path: 'add', component: AddComponent },
  { path: 'create', component: CreateComponent},
  { path: 'view/:id', component: ViewComponent},
  { path: 'edit/:id', 
    component: EditComponent,
    canActivate: [AdminGuard]
  },
  { path: 'delete/:id', 
    component: DeleteComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule { }
