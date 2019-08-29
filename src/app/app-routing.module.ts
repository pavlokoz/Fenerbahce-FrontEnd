import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { SchoolsComponent } from './schools/schools.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'schools', component: SchoolsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
