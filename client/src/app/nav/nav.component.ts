import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit {
  model: any = {};
  // isLoggedIn = false;
  // currentUser$: Observable<User | null> = of(null)

  constructor(public accountServices: AccountService) { }

  ngOnInit(): void {
  }

  // getCurrentUser() {
  //   this.accountServices.currentUser$.subscribe({
  //     next: user => this.isLoggedIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

  login() {
    this.accountServices.login(this.model).subscribe({
      next: response => {
        console.log(response)
        // this.isLoggedIn = true;
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountServices.logout()
    // this.isLoggedIn = false
  }

}
