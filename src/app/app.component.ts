import {Component, OnInit} from '@angular/core';
import {environment} from "../environment/environment";
import {AuthService} from "./services/auth.service";
import {ObjectService} from "./services/object.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontTest';
  clientId = environment.clientId;

  email?: string;
  name?: string;
  objects?: any;

  constructor(private authService: AuthService, private objectService: ObjectService) {
  }

  ngOnInit(): void {
    console.log(window.sessionStorage.getItem('g_token'));
    this.authService.loginWithGoogle()
      .then((response: any) => {
        console.log(response);
        const user = response.user;
        const token = response.token;
        window.sessionStorage.setItem('userEmail', user.email);
        window.sessionStorage.setItem('userToken', user.token);

        this.email = user.email;
        this.name = user.name;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  logout(){
    window.sessionStorage.clear();
    window.location.reload();
  }

  loadObjects(){
    this.objectService.getObjects()
      .then((objectList: any) => {
        this.objects = objectList
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
