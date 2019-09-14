import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from '../constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  types = Constants.PaymentConstants.PaymentTypes;
  public addPaymentForm: FormGroup;  

  constructor(private paymentService: PaymentService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormGroup();    
  }

  addPayment(addPaymentForm) {
    let payment: Payment = {
      PaymentId: 0,
      StudentId: this.data.StudentId,
      Amount: addPaymentForm.amount,
      Type: addPaymentForm.type
    };

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.paymentService.createPayment(payment).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Payment is added!", "Got it", {
        duration: 2000
      });
    });
  };

  private initFormGroup() {
    this.addPaymentForm = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  };
}
