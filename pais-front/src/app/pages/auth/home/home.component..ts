import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | null = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
  }
}
