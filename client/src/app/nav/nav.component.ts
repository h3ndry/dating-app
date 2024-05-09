import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit {

  model: any = {}

  constructor() {
    // super();

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    console.log(this.model)
  }

}
