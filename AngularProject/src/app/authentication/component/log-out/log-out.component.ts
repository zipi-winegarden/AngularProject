
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: false,
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['authentication/login']);
  }

}
