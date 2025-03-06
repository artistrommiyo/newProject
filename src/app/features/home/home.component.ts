import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [
    'assets/shake_hand_1.png',
    'assets/shake_hand_2.png',
    'assets/shake_hand_3.png',
    'assets/shake_hand_4.png'
  ];
  how_to_work = ['assets/how_to_work1.png','assets/how_to_work2.png','assets/how_to_work3.png'];
  
  currentIndex = 0;
  currentIndex3 = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentIndex3 = (this.currentIndex3 + 1) % this.how_to_work.length;
    }, 3000);
  }
}
