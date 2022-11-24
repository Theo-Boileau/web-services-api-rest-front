import {Component, OnInit} from '@angular/core';
import {environment} from "../environment/environment";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontTest';
  clientId = environment.clientId;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(window.sessionStorage.getItem('g_token'));
    this.authService.loginWithGoogle()
      .then((response: any) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
