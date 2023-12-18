import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skalk';
  constructor(private router: Router, private spinner: LoaderService) {
    this.listenRouter();
}


private listenRouter() {
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
            this.spinner.show();
        }
        if (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ) {
            this.spinner.hide();
        }
    });
}
}
