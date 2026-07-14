import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  auth$: Observable<boolean> = this.authSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$: Observable<string | null> = this.usernameSubject.asObservable();

  constructor() {
    this.initializeAuthState();
  }

  getToken(): string | null {
    return this.getStorage()?.getItem('jwt') || null;
  }

  setSession(token: string, role: string): void {
    const storage = this.getStorage();
    storage?.setItem('jwt', token);
    storage?.setItem('role', role);
    this.updateAuthState(token);
  }

  logout(): void {
    this.clearSession();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    if (token) {
      this.updateAuthState(token);
    } else {
      this.clearSession();
    }
  }

  private updateAuthState(token: string): void {
    const payload = this.decodeToken(token);
    const expiresAt = payload?.exp ? payload.exp * 1000 : null;

    if (!payload || !expiresAt || Date.now() >= expiresAt) {
      this.clearSession();
      return;
    }

    const username = payload.username || payload.sub || payload.email || null;
    this.authSubject.next(true);
    this.usernameSubject.next(username);
  }

  private clearSession(): void {
    const storage = this.getStorage();
    storage?.removeItem('jwt');
    storage?.removeItem('role');
    this.authSubject.next(false);
    this.usernameSubject.next(null);
  }

  private getStorage(): Storage | null {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  private decodeToken(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }

      const json =
        typeof window !== 'undefined' && typeof window.atob === 'function'
          ? window.atob(base64)
          : Buffer.from(base64, 'base64').toString('utf8');

      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
