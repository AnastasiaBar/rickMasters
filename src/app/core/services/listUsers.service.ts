import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(private http: HttpClient) {

  }

  getUserList() {
    return this.http
      .get(`http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/`)
  }
}


