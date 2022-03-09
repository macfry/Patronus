import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {IResponse, IUserResponse} from "./users.interface";

@Injectable()
export class UsersService {
  private authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdHJvbnVzIGNvZGUgY2hhbGxlbmdlIiwiaWF0IjoxNTE2MjM5MDIyfQ.ySwvtbpSzdTimko0acSe03Tp6VadH1wCDhYxoNfgH3k";

  constructor(private http: HttpClient) {}

  public getUsersData() {
    return this.http
      .get<IResponse>("assets/usersMockData.json")
      .pipe(map((response) => response?.content));
  }

  public getUsers(): Observable<IUserResponse[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
    return this.http
      .get<IResponse>('http://localhost:4200/api/getAllEmergencies', {headers: headers})
      .pipe(map((response) => response?.content));
  }
}
