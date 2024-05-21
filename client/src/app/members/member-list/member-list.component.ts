import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { MemeberCardComponent } from "../member-card/member-card.component";

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css',
    imports: [CommonModule, MemeberCardComponent]
})


export class MemberListComponent implements OnInit {
  members: Member[] = []

  constructor(private memberServices: MembersService) { }

  ngOnInit(): void {
    this.loadMemeber();
  }

  loadMemeber() {
    this.memberServices.getMembers().subscribe({
      next: members => this.members = members
    })
  }


}
