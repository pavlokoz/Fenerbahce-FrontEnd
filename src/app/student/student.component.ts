import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { AuthorizationService } from '../services/authorization.service';
import { SpinnerService } from '../services/spinner.service';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { Constants } from '../constants';
import { Payment } from '../models/payment';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { PaymentService } from '../services/payment.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student;
  paymentTypes = Constants.PaymentConstants.PaymentTypes;
  displayedParentColumns = ['FirstName', 'LastName'];
  displayedPaymentColumns = ['Amount', 'Type', 'Update', 'Delete'];

  constructor(private studentService: StudentService,
    private authService: AuthorizationService,
    private paymentService: PaymentService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,    
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  ModalParent(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '240px',
      height: 'auto',
      data: {
        StudentId: this.student.StudentId,
        searchCallback: 'searchParent'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });    
  }

  addPayment(): void {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '540px',
      height: 'auto',
      data: {
        StudentId: this.student.StudentId
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });    
  }

  updatePayment(payment: Payment): void {
    const dialogRef = this.dialog.open(EditPaymentComponent, {
      width: '540px',
      height: 'auto',
      data: {
        Payment: payment
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });
  }

  deletePayment(paymentId: number): void { 
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.paymentService.deletePayment(paymentId).subscribe(response => {
      let payments = this.student.Payments;
      this.student.Payments = payments.filter(item => item.PaymentId != paymentId);
      this.snackBar.open("Payment is deleted!", "Got it", {
        duration: 2000
      });
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

  getTypeDescription(typeCode: string): string {
    let typeModel = this.paymentTypes.find(item => item.TypeCode === typeCode);
    return typeModel ? typeModel.TypeDescription : '';
  }
  
  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    let studentId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(studentId).subscribe(response => {
      this.student = response;
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }
}
