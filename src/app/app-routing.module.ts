import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolComponent } from './school/school.component';
import { StudentComponent } from './student/student.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'addnews', component: AddNewsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'schools', component: SchoolsComponent },
  { path: 'school/:id', component: SchoolComponent },
  { path: 'student/:id', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
