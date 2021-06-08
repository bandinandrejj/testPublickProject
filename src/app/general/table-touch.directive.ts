import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[TableTouch]'
})
export class TableTouchDirective {

  constructor(private element: ElementRef, private renderer: Renderer2){
    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }


  @HostListener("mouseenter") onMouseEnter() {
    this.setColor('rgba(255, 255, 128, .5)');
    this.setFontWeight(600);

    // this.boolTouchOut.emit(true);

  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setColor('#f5f5fb');
    this.setFontWeight(500);

    // this.boolTouchOut.emit(false);

  }

  private setFontWeight(val: number) {
    this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
  }
  private setColor(val: string) {
    this.renderer.setStyle(this.element.nativeElement, "background-color", val);
  }

}
