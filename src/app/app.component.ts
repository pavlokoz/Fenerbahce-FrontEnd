import { Component } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService} from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fenerbahce';
  spinnerName: string = 'LoadingProcess';
}
