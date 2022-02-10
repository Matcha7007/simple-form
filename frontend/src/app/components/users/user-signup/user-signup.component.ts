import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/core/validators';
import { UserForSignup } from 'src/app/models/user';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  registerForm!: FormGroup;
  user!: UserForSignup;
  userSubmitted!: boolean;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, CustomValidators.match('password')]],
      phone: [null, [Validators.required, Validators.maxLength(12)]],
      userRole: [null, Validators.required]
    });
  }

  initializeFormGroup() {
    this.registerForm.setValue({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      userRole: 3
    });
  }

  populateForm(signup:UserForSignup) {
    this.registerForm.setValue(signup);
  }

  onReset() {
    this.route.navigate(['/']);
    this.userSubmitted = false;
    this.initializeFormGroup();
    this.registerForm.reset();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email tidak boleh kosong';
    }

    return this.email.hasError('email') ? 'Format email salah' : '';
  }

  getErrorPassword() {
    if (this.password.hasError('required')) {
      return 'Password tidak boleh kosong';
    }

    return this.password.hasError('minlength') ? 'Password minimal 8 karakter' : '';
  }

  getErrorConfirmPassword() {
    if (this.confirmPassword.hasError('required')) {
      return 'Masukkan ulang password';
    }
    return this.registerForm.hasError('match') ? '' : 'Password tidak sama';
  }

  register() {
    console.log(this.registerForm.value);
    this.userSubmitted = true;
    if (this.registerForm.valid) {
        this.auth.signupUser(this.userData()).subscribe(
          () => { 
            this.alert.alertSuccess('Added New User Successfully'), 
            this.onReset() 
          });
    };
  }

  userData(): UserForSignup {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
      userRole: this.userRole.value
    }
  }

  //get value dari field-field
  get userName() {
    return this.registerForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get phone() {
    return this.registerForm.get('phone') as FormControl;
  }

  get userRole() {
    return this.registerForm.get('userRole') as FormControl;
  }

}
