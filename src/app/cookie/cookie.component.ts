import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from './service/cookie.service';
import { CookieModalComponent } from './cookie-modal/cookie-modal.component';
import { NgxMaterialSpinnerService } from 'ngx-material-spinner';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  constructor(private service: CookieService,
              private dialog: MatDialog,
              private spinner: NgxMaterialSpinnerService) { }

  ngOnInit(): void {}

  onClick(): void {
    this.spinner.show('primary');
    this.service.retrieveData().toPromise().then(
      retrieveResponse => {
        console.log(retrieveResponse);
        const dialogRef = this.dialog.open(CookieModalComponent, {
          data: retrieveResponse[1]
        });
        this.spinner.hide('primary', 300);

        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            const body = {id: retrieveResponse[0], fortune: result};
            this.service.saveData(body).toPromise().then(
              saveResponse => {
                console.log(saveResponse);
              }
            );
          }
        });
      }
    );
  }
}
