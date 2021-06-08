import {Directive, ElementRef, HostListener, EventEmitter,  Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[headingTouch]'
})
export class HeadingTouchDirective {

  @Output() boolTouchOut = new EventEmitter<boolean>();


  constructor(private element: ElementRef, private renderer: Renderer2){
    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }


  @HostListener("mouseenter") onMouseEnter() {
    this.setColor('black');
    this.setFontWeight(600);

    // this.boolTouchOut.emit(true);

  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setColor('#8DA1B5');
    this.setFontWeight(500);

    // this.boolTouchOut.emit(false);

  }

  private setFontWeight(val: number) {
    this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
  }
  private setColor(val: string) {
    this.renderer.setStyle(this.element.nativeElement, "color", val);
  }

}
