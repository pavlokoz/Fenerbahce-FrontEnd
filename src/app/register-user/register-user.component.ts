import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Role } from '../models/role';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-register.user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public registerForm: FormGroup;

  public roles: Role[] = Constants.RegistrationConstants.UserRoles;

  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private passwordPattern: string = Constants.DataValidationConstants.PasswordPattern;
  private emailPattern: string = Constants.DataValidationConstants.EmailPattern;

  constructor(private authService: AuthorizationService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RegisterUserComponent>) { }

  ngOnInit() {
    this.initFormGroup();
  };

  register(registerFormValues) {
    let user: User = {
      Email: registerFormValues.email,
      LastName: registerFormValues.lastName,
      FirstName: registerFormValues.firstName,
      UserId: 0,
      DateOfBirth: registerFormValues.dateOfBirth,
      Password: registerFormValues.password,
      ConfirmPassword: registerFormValues.confirmPassword,
      SecurityPin: registerFormValues.pin,
      ConfirmPin: registerFormValues.confirmPin,
      Role: registerFormValues.role,
    };
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.authService.registerUser(user).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("User is registered!", "Got it", {
        duration: 2000
      });
    });
  };

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  pinKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  private passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value &&
           formGroup.get('pin').value === formGroup.get('confirmPin').value
      ? null : { 'mismatch': true };
  };

  private initFormGroup() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required,
      Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required,
      Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl('', [Validators.required,
      Validators.pattern(this.passwordPattern)]),
      pin: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPin: new FormControl('', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl('', [Validators.required,
      Validators.pattern(this.namePattern)]),
      lastName: new FormControl('', [Validators.required,
      Validators.pattern(this.namePattern)]),
      role: new FormControl(0, [Validators.required]),
      dateOfBirth: new FormControl(new Date())
    }, this.passwordMatchValidator);
  };
}
