import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    const isLoggedIn = !!localStorage.getItem('loggedInClient');
    return isLoggedIn ? true : this.router.navigate(['/login']);
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
