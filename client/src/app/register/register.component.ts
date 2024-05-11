import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // @Input() usersFromHomeComponets: any
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountService: AccountService) { }

  register() {
    console.log(this.model)
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response)
        this.cancel()
      },
      error: erro => console.log(erro)
    })
  }

  cancel() {
    this.cancelRegister.emit(false)
  }

}
