import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  @Input() viewMode = false;

  @Input() currentUser: User = {
    name: '',
    lastName: '',
    email: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

    getUser(id: string): void {
      this.userService.get(id)
        .subscribe({
          next: (data) => {
            this.currentUser = data;
          },
          error: (e) => console.error(e)
        });
    }
  
    updateUser(): void {  
      this.userService.update(this.currentUser.id, this.currentUser)
        .subscribe({
          next: (res) => {
          },
          error: (e) => console.error(e)
        });
    }
  
    deleteUser(): void {
      this.userService.delete(this.currentUser.id)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/users']);
          },
          error: (e) => console.error(e)
        });
    }
}
