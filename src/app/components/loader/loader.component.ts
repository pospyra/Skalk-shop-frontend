import { Component, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
  isLoading: boolean = false;
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  @Input() overlay: boolean = false;

  @Input() size = '20px';

  @Input() top = '50%';

  @Input() left = '50%';

  @Input() position = 'fixed';

  @Input() margin = 'auto';

}
