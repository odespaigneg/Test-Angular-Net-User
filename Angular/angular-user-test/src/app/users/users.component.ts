import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [UserDetailsComponent]
})
export class UsersComponent {
  users?: User[];
  currentUser: User = { name: '', lastName: '', email: ''};
  currentIndex = -1;
  viewMode = false;

  constructor(private userService: UserService) {
    this.retrieveUsers();
   }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = { name: '', lastName: '', email: ''};
    this.currentIndex = -1;
  }

  changeViewmodel(): void{
    console.log(this.viewMode);
    this.viewMode = !this.viewMode;
    console.log(this.viewMode);
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
}
