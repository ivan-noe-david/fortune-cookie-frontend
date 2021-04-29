import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CookieService } from './service/cookie.service';
import { CookieModalComponent } from './cookie-modal/cookie-modal.component';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  constructor(private service: CookieService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.service.retrieveData().toPromise().then(
      retrieveResponse => {
        console.log(retrieveResponse);
        const dialogRef = this.dialog.open(CookieModalComponent, {
          data: retrieveResponse[1]
        });

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
