import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum SnackAction {
  Close = 'X',
  Ok = 'X'
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _configInfo: MatSnackBarConfig = {
    duration: 4000,
    panelClass: [],
  };

  private _configWarn: MatSnackBarConfig = {
    duration: 0,
    panelClass: [],
  };

  private _commonConfig: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  private get configInfo () {
    return {
      ...this._commonConfig,
      ...this._configInfo,
    };
  }

  private get configWarn () {
    return {
      ...this._commonConfig,
      ...this._configWarn,
    };
  }

  constructor (
    private readonly snackBar: MatSnackBar,
  ) {
  }

  info (message: string, action: SnackAction = SnackAction.Close): void {
    this.snackBar.open(message, action, this.configInfo);
  }

  warn (message: string, action: SnackAction = SnackAction.Ok): void {
    this.snackBar.open(message, action, this.configWarn);
  }

  showSomethingWrong (action: SnackAction = SnackAction.Ok): void {
    this.warn('Your action failed! Please try again', action)
  }

  dismiss (): void {
    this.snackBar.dismiss();
  }

  showUpdateSuccess (action: SnackAction = SnackAction.Ok): void {
    this.info('Update success!', action)
  }
}
