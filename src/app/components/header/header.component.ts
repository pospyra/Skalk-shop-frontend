import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Roles } from 'src/app/models/user/roles';
import { UserDTO } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSuccessSubscription: Subscription;
  private logoutSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef) {

    this.authSuccessSubscription = this.authService.authSuccess$.subscribe(() => {
      this.getCurrentUser();
    });

    this.logoutSubscription = this.authService.logout$.subscribe(() => {
      // Handle header update on logout
      this.currentUser = undefined;
      this.cdr.detectChanges();
    });
  }

  roles = Roles;

  currentUser: UserDTO | undefined;

  showDropdown: boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();
    this.cdr.detectChanges();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.cdr.detectChanges();
  }

  private getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      (data: UserDTO) => {
        this.currentUser = data;
        console.log(this.currentUser.role);
      }
    );
  }

  ngOnDestroy(): void {
    this.authSuccessSubscription.unsubscribe();
  }

}
