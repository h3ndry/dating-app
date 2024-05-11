import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RegisterComponent]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode
  }


  getUser() {
    this.http.get('http://localhost:5276/api/users').subscribe({
      next: response => this.users = response,
      error: (error) => console.log(error),
      complete: () => console.log('request it is complet')
    })
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event
  }

}
