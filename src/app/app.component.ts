import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {base64Image} from './shared/myImgInBase64';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  private _canvasContext: {canvas: {width: number, height: number}, drawImage: Function, getImageData: Function};
  private _bgColor: string = 'rgba(0,0,0,255)';
  private _rgbaCoords: string;
  private _hsv: string;

  onCanvasClick (evt) {
    const imageData = this._canvasContext.getImageData(evt.clientX, evt.clientY, 1, 1);
    let [red, green, blue, alpha] = imageData.data;
    this._bgColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this._rgbaCoords = `${red}: ${green}: ${blue}: ${alpha}`;
    const hsv = this.rgbToHsv(red, green, blue);
    this._hsv = `${hsv.h}% : ${hsv.s}% : ${hsv.v}%`;
    console.log(this.rgbToHsv(red, green, blue));
  }

  ngAfterViewInit () { 
    try {
      this._canvasContext = this.myCanvas.nativeElement.getContext('2d');
    } catch (e) {
      return;
    }
    const myImage = new Image();
    myImage.addEventListener('load', () => {
      this._canvasContext.canvas.width = myImage.width; 
      this._canvasContext.canvas.height = myImage.height; 
      this._canvasContext.drawImage(myImage, 0, 0);
      this.myCanvas.nativeElement.addEventListener('click', (evt) => this.onCanvasClick(evt));
    });
    myImage.src = base64Image;
  };
  
  ngOnInit (): void {};
  
  onInit() { // misspelled
    console.log('The component is initialized');
  }
  
  rgbToHsv (r: number, g: number, b: number) {
    r = r / 255; 
    g = g / 255; 
    b = b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return { h : Math.round(h * 100), s : Math.round(s * 100), v : Math.round(v * 100) };
  }
  
  
  
}
