import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements OnInit {
  activeSlideIndex: number = 1;

  ngOnInit(): void {
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.addEventListener('swiperslidechange', (event: any) => {
      this.activeSlideIndex = event.detail[0].activeIndex + 1;
    })
  }

}
