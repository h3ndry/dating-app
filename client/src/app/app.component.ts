import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, CommonModule, NavComponent]
})

export class AppComponent implements OnInit {
  title = 'client';
  users: any

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get('http://localhost:5276/api/users').subscribe({
      next: response => this.users = response,
      error: (error) => console.log(error),
      complete: () => console.log('request it is complet')
    })
  }

}
