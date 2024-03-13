import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../user.model';
import { UserService } from '../../../user.service';



@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  errorMessage: string = '';
  public usersList: User[] = []

  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "code": new FormControl("", [Validators.required]),
      "name": new FormControl("", [Validators.required]),
      "address": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required])
    });

    this.route.queryParams.subscribe(params => {
      const name = params['name'];

      if (name) {
        this.registerForm.get('name')!.setValue(name);
      }
    });
    
    this._userService.getUserList().subscribe({
      next: (res) => {
        this.usersList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  onSubmit(): void {
    let user: User = this.registerForm.value;

    const userExists = this.usersList.some(u => u.name === user.name && u.email === user.email);
    if (!userExists) {
      this._userService.addUser(user).subscribe({
        next: (response) => {
          console.log("User added successfully:", response);
          this.router.navigate(['/recipe/all-recipe'])
        },
        error: (error) => {
          console.error("Error adding user:", error);
        }
      });
    } else {
      this.errorMessage = 'This user already exists';
    }
  }
}
