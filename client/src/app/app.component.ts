import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule, NavComponent, HomeComponent]
})

export class AppComponent implements OnInit {
  title = 'client';
  users: any

  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user')
    if (!userString) return
    const user: User = JSON.parse(userString)
    this.accountService.setCurrentUser(user)
  }

}
