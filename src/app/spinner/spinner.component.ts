import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from './../services/spinner.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Constants } from './../constants';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() name: string;
  @Input() loadingImage: string = '../assets/img/LoadingAnimations/dance.gif';
  @Input() isShown: boolean = false;

  public spinnerName: string;

  constructor(private spinnerService: SpinnerService) 
  { }

  ngOnInit() {
    if(!this.name) throw new Error("Spinner must have a 'name' attribute.")
    this.spinnerService.Register(this);
    this.spinnerName = 'LoadingProcess';
  }
}
