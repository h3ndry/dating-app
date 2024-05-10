import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit {

  model: any = {};
  isLoggedIn = false;

  constructor(private accountServices: AccountService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.accountServices.login(this.model).subscribe({
      next: response => {
        console.log(response)
        this.isLoggedIn = true;
      },
      error: error => console.log(error)
    })
  }

}
