import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const hasVisitedAuth = localStorage.getItem('hasVisitedAuth');

        if (!hasVisitedAuth) {
            // Redirect to /auth if user hasn't visited it
            this.router.navigate(['/auth']);
            return false;
        }

        return true; // Allow navigation to the main route
    }
}
