import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from '../constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Payment } from '../models/payment';

@Component({
  selector: 'edit-add-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {
  types = Constants.PaymentConstants.PaymentTypes;
  public editPaymentForm: FormGroup;  

  constructor(private paymentService: PaymentService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormGroup();    
  }

  updatePayment(addPaymentForm) {
    let payment: Payment = {
      PaymentId: this.data.Payment.PaymentId,
      StudentId: this.data.Payment.StudentId,
      Amount: addPaymentForm.amount,
      Type: addPaymentForm.type
    };

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.paymentService.updatePayment(payment).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Payment is edited!", "Got it", {
        duration: 2000
      });
    });
  };

  private initFormGroup() {
    this.editPaymentForm = new FormGroup({
      type: new FormControl(this.data.Payment.Type, [Validators.required]),
      amount: new FormControl(this.data.Payment.Amount, [Validators.required, Validators.min(1)])
    });
  };
}
