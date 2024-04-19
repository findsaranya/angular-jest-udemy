import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInteface } from '../types/user.interface';

@Injectable()
export class UsersService {
  
user$ = new BehaviorSubject<UserInteface[]>([]);

  addUser(user: UserInteface): void {
    this.user$.next( [...this.user$.getValue(), user]);
  }

  removeUser(userId: string): void {
    const updatedUsers = this.user$.getValue().filter((user) => userId !== user.id);
    this.user$.next( updatedUsers);
  }

 
}
