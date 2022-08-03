import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  EmailValidator,
} from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginForm!: FormGroup;
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  // form = new FormGroup({
  //   userName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(10),
  //   ]),
  //   password: new FormControl('', Validators.required),
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   Email: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', Validators.required),
  // });
  // get userName() {
  //   return this.form.get('userName');
  // }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/signUp').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.p
          );
        });
        if (user) {
          alert('Login Success');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
}
