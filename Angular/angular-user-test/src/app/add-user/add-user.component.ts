import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})

export class AddUserComponent {
  user: User = {
    name: '',
    lastName: '',
    email: ''
  };
  submitted = false;

  constructor(private userService: UserService) { }

  saveUser(): void {
    const data = {
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email
    };

    this.userService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      lastName: '',
      email: ''
    };
  }
}
