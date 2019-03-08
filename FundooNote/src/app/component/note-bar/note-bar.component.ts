import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
    selector: 'app-note-bar',
    templateUrl: './note-bar.component.html',
    styleUrls: ['./note-bar.component.scss']
})
export class NoteBarComponent implements OnInit {
    colorCode: Array<Object> = [
        { name: 'white', colorCode: 'rgb(255, 255, 255)' },
        { name: 'lightGreen', colorCode: 'rgb(204, 255, 144)' },
        { name: 'purple', colorCode: 'rgb(215, 174, 251)' },
        { name: 'red', colorCode: 'rgb(242, 139, 130)' },
        { name: 'Teal', colorCode: 'rgb(167, 255, 235)' },
        { name: 'pink', colorCode: 'rgb(253, 207, 232)' },
        { name: 'orange', colorCode: 'rgb(251, 188, 4)' },
        { name: 'blue', colorCode: 'rgb(203, 240, 248)' },
        { name: 'brown', colorCode: 'rgb(230, 201, 168)' },
        { name: 'yellow', colorCode: 'rgb(255, 244, 117)' },
        { name: 'darkBlue', colorCode: 'rgb(174, 203, 250)' },
        { name: 'gray', colorCode: 'rgb(232, 234, 237)' }
    ];

    private color: string;

    @Input() noteDetail: NoteModel;
    constructor(private cardUpdate: CardUpdateServiceService, private httpService: HttpserviceService,
        private snackBar: MatSnackBar, private dialog: MatDialog) { }

    ngOnInit() {
    }



    changeColor(color) {
        this.noteDetail.color = color;
        this.httpService.notePutRequest('note', this.noteDetail).subscribe(
            data => {
                if (data.statusCode === 100) {
                    this.snackBar.open('color updated Successfully', '', {
                        duration: 2000,
                    });
                }
                //  this.cardUpdate.changemessage();
            },
            error => {

                console.log('Error', error);
            }

        );
    }

    openEditDialog(item) {
        console.log('note ', item);

        const dialogRef = this.dialog.open(EditCardComponent, {
            width: '550px',

            data: item
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log('after dialog ', item);
            this.httpService.notePutRequest('note', item).subscribe(
                data => {
                    if (data.statusCode === 100) {

                        this.snackBar.open('note updated Successfully', '', {
                            duration: 2000,
                        });
                    }
                }
            );
        });

    }


}
