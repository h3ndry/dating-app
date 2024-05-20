import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemeberCardComponent {
  @Input() member: Member | undefined
  faUser = faUser

  constructor() {
  }

}
