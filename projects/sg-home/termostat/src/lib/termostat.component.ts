import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

import { TempTypes } from './interfaces/temp-types';

@Component({
  selector: 'sg-home-termostat',
  templateUrl: 'termostat.component.html',
  styleUrls: ['termostat.component.scss']
})
export class TermostatComponent implements OnInit, OnChanges, AfterViewInit {
  
  public weatherInfo: string = '';
  public weatherClass: string = '';
  public rotationDeg: number = 0;

  private _minTemp: number;
  private _maxTemp: number;
  private _currentTemp: number;
  private _weatherTemp: number;
  private _tempTypes = TempTypes;

  @Input() set minTemp(val: number) {
    if(this.checkValues(val, this._tempTypes.Minimum)) {
      this._minTemp = val;
    }
  };
  @Input() set maxTemp(val: number) {
    if(this.checkValues(val, this._tempTypes.Maximum)) {
      this._maxTemp = val;
    }
  };
  @Input() set currentTemp(val:number) {
    if(this.checkValues(val, this._tempTypes.Current)) {
      this._currentTemp = val;
      this.onCurrentTempChange.emit(this._currentTemp);
    }
  };
  @Input() set weatherTemp(val:number) {
    this._weatherTemp = val;
    this.setWeatherFeedback();
  };

  get minTemp() {
    return this._minTemp;
  }
  get maxTemp() {
    return this._maxTemp;
  }
  get currentTemp() {
    return this._currentTemp;
  }
  get weatherTemp() {
    return this._weatherTemp;
  }

  @Output() onCurrentTempChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('tickContainer') tickContainer: ElementRef;

  private startingTickAngle:number = -135;
  
  ngOnInit(): void {
    this.setWeatherFeedback();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkDefaultValues();
    if((changes['currentTemp'] && !changes['currentTemp'].firstChange) || (changes['maxTemp'] && !changes['maxTemp'].firstChange) || (changes['minTemp'] && !changes['minTemp'].firstChange)) {
      this.createTicks();
    }
  }

  ngAfterViewInit(): void {
    this.createTicks();
  }

  private setWeatherFeedback() {
    if(typeof this.weatherTemp === 'undefined') {
      this.weatherInfo = '';
      this.weatherClass = '';
    } else {
      this.weatherInfo = this.currentTemp < this.weatherTemp ? 'Cooling Now!' : 'Heating Now!';
      this.weatherClass = this.currentTemp < this.weatherTemp ? 'cooling' : 'heating';
    }
  }

  private checkValues(val: number, typ: TempTypes) {
    switch(typ) {
      case TempTypes.Minimum:
        if (val > this.maxTemp) {
          alert('Minimum Temperature value cannot be bigger than maximum temperature value');
          return false;
        } else {
          return true;
        }
        break;
      case TempTypes.Maximum:
        if (val < this.minTemp) {
          alert('Maximum Temperature value cannot be smaller than minimum temperature value');
          return false;
        } else {
          return true;
        }
        break;
      case TempTypes.Current:
        if (val > this.maxTemp) {
          alert('Current temperature cannot be bigger than maximum temperature');
          return false;
        } else if (val < this.minTemp) {
          alert('Current temperature cannot be smaller than minimum temperature');
          return false;
        } else {
          return true;
        }
      break;
      default:
        if (val > this.maxTemp) {
          alert('Current temperature cannot be bigger than maximum temperature');
          return false;
        } else if (val < this.minTemp) {
          alert('Current temperature cannot be smaller than minimum temperature');
          return false;
        } else {
          return true;
        }
    }
  }

  private checkDefaultValues() {
    if(typeof this.minTemp === 'undefined') {
      this.minTemp = 15 < this.maxTemp ? 15 : this.maxTemp - 50;
    } else if(typeof this.maxTemp === 'undefined') {
      this.maxTemp = 75 > this.minTemp ? 75 : this.minTemp + 50;;
    } else if(typeof this.currentTemp === 'undefined') {
      this.currentTemp = 24 <= this.maxTemp && 24>=this.minTemp ? 24 : this.minTemp;
    }
  }

  private createTicks() {
    let numTicks: number;
    let highlightNumTicks: number;

    numTicks = this.maxTemp - this.minTemp > 50 ? 25 : this.maxTemp - this.minTemp;
    const tickAngle = 270 / numTicks;
    const tempDiff = this.maxTemp - this.minTemp;
    const currentDiff = this.currentTemp - this.minTemp;
    let currentAngle = 270 * currentDiff;
    currentAngle = currentAngle / tempDiff;
    const currentMedian = tempDiff / numTicks;
    highlightNumTicks = currentDiff / currentMedian;

    this.rotationDeg = currentAngle;
    
    while(this.tickContainer.nativeElement.firstChild) {
      this.tickContainer.nativeElement.removeChild(this.tickContainer.nativeElement.firstChild);
    }
    
    for(var i=0;i < numTicks + 1;i++) {
      let tick = document.createElement("div");
      tick.className = i < highlightNumTicks + 1 ? 'tick activetick' : 'tick';
      
      this.tickContainer.nativeElement.appendChild(tick);
      tick.style.transform = "rotate(" + this.startingTickAngle + "deg)";
      this.startingTickAngle += tickAngle;
    }

    this.startingTickAngle = -135;
  }
}
