import { Component, HostListener, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-memeber-edit',
  standalone: true,
  imports: [CommonModule, TabsModule, FormsModule],
  templateUrl: './memeber-edit.component.html',
  styleUrl: './memeber-edit.component.css'
})
export class MemeberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty)
      $event.returnValue = true
  }

  member: Member | undefined
  user: User | null = null

  constructor(private accountService: AccountService, private memberService: MembersService,
    private toaster: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    if (!this.user) return
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }


  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toaster.success("Profile has been successfully updated")
        this.editForm?.reset(this.member)
      }
    })
  }
}
