import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl
  members: Member[] = []

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members
        return members
      })
    )
  }

  getMember(username: string) {

    const member = this.members.find(x => x.userName === username);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Member) {
    return this.http.put<Member>(this.baseUrl + 'users/', member)
  }

  getHttpOptions() {
    const userString = localStorage.getItem('user');
    if (!userString) return
    const user = JSON.parse(userString)
    return {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + user.token
        }
      )
    }
  }

}

