import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {
  baseUrl = 'http://localhost:5276/api/'

  constructor(private http: HttpClient) { }



  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
  }


  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
  }


  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
  }


  post400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', { name: "a", password: 'e' }).subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
  }

}
