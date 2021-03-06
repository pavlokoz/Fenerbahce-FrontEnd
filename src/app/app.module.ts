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
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { SearchService } from './services/search.service';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditInstructorComponent } from './edit-instructor/edit-instructor.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { PaymentService } from './services/payment.service';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AddNewsComponent } from './add-news/add-news.component';

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
    SearchDialogComponent,
    EditGroupComponent,
    EditStudentComponent,
    EditInstructorComponent,
    EditSchoolComponent,
    SpinnerComponent,
    AddPaymentComponent,
    EditPaymentComponent,
    NewsComponent,
    NewsDetailComponent,
    AddNewsComponent,
  ],
  entryComponents: [
    AddGroupComponent, 
    AddStudentComponent, 
    AddSchoolComponent, 
    RegisterUserComponent, 
    AddInstructorComponent,
    AddPaymentComponent,
    SearchDialogComponent,
    EditGroupComponent, 
    EditStudentComponent,
    EditInstructorComponent,
    EditGroupComponent,
    EditSchoolComponent,
    EditPaymentComponent
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
    SearchDialogComponent,    
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
    StudentService,
    SearchService,
    PaymentService,
    SpinnerService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AppModule { }
