import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"]
})
export class ImageComponent implements OnInit, OnChanges {
  @Input() src: string;
  @Input() alt: string;
  currentImage: string;

  constructor(private ref: ElementRef<HTMLElement>, private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.

    console.log(changes);
    this.currentImage = this.src;
  }

}
