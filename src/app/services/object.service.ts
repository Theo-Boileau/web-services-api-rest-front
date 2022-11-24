import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class ObjectService {
  private $token: string = '';

  constructor(private http: HttpClient) {
    this.$token = window.sessionStorage.getItem('g_token') || '';
  }

  getObjects() {

    const email = window.sessionStorage.getItem('userEmail') || '';
    const authorization = window.sessionStorage.getItem('userToken') || '';

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3001/api/objects', {
        headers: {
          email: email,
          authorization: authorization
        }
      })
        .subscribe((object: any) => {
          console.log(object);
          resolve(object);
        }, (err) => {
          console.log(err);
          reject();
        })
    })
  }

  // loginWithGoogle(){
  //   return new Promise((resolve, reject) => {
  //     this.http.post('http://localhost:3001/api/auth/login', {token: this.$token})
  //       .subscribe((user: any) => {
  //         console.log(user);
  //         resolve(user);
  //       }, (err) => {
  //         console.log(err);
  //         reject();
  //       })
  //   })
  // }
}
