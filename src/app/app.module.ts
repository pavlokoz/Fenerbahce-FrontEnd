import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationService } from './services/authorization.service';
import { SportService } from './services/sport.service';
import { SchoolService } from './services/school.service';
import { GroupService } from './services/group.service';
import { InstructorService } from './services/instructor.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule
}
  from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { SchoolsComponent } from './schools/schools.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolComponent } from './school/school.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { StudentService } from './services/student.service';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    RegisterUserComponent,
    SidebarComponent,
    GroupsComponent,
    GroupComponent,
    AddGroupComponent,
    AddStudentComponent,
    AddInstructorComponent,
    AddSchoolComponent,
    SchoolsComponent,
    SchoolComponent,
    StudentComponent,
  ],
  entryComponents: [
    AddGroupComponent, 
    AddStudentComponent, 
    AddSchoolComponent, 
    RegisterUserComponent, 
    AddInstructorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule
  ],
  exports: [
    AddStudentComponent,
    AddGroupComponent,
    AddSchoolComponent,
    AddInstructorComponent,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [
    AuthorizationService,
    GroupService,
    SportService,
    SchoolService,
    InstructorService,
    StudentService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
