import {Directive, ElementRef, AfterViewInit, Input} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appSlickCarousel]',
  standalone: true
})
export class SlickCarouselDirective implements AfterViewInit{

  @Input() slickConfig: any;
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    $(this.el.nativeElement).slick(this.slickConfig);
  }
}
