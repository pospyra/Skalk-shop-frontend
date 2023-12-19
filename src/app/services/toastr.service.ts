import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(private snackBar: MatSnackBar) { }

  private readonly defaultDuration = 3000;

  public showSuccessMessage(message: any) {
    this.openSnackBar(message, 'success-snack-bar');
  }

  public showWarningMessage(message: any) {
    this.openSnackBar(message, 'warn-snack-bar');
  }

  public showInfoMessage(message: any) {
    this.openSnackBar(message, 'info-snack-bar');
  }

  public showErrorMessage(message: any) {
    this.openSnackBar(message, 'error-snack-bar');
  }

  private openSnackBar(message: any, panelClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = this.defaultDuration;
    config.panelClass = [panelClass];
    config.horizontalPosition = 'end' as MatSnackBarHorizontalPosition;
    config.verticalPosition = 'top' as MatSnackBarVerticalPosition;

    this.snackBar.open(message, '', config);
  }
}
