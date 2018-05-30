import { Component, ViewChild, OnInit, Renderer } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  accordionExpanded = false;
  @ViewChild("cc") content: any;
  icon: string = "arrow-forward";

  constructor(public renderer: Renderer) {
    
  }

  ngOnInit(){
    console.log(this.content.nativeElement);
    this.renderer.setElementStyle(this.content.nativeElement, "webkitTransition", "max-height 400ms, padding 400ms");
  }

  toggleAccordion(){
      if(this.accordionExpanded) {
        this.renderer.setElementStyle(this.content.nativeElement, "max-height", "0px");
        this.renderer.setElementStyle(this.content.nativeElement, "padding", "0px 16px");
      } else {
        this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
        this.renderer.setElementStyle(this.content.nativeElement, "padding", "13px 16px");
      }

      this.accordionExpanded = !this.accordionExpanded;
      this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }

}
