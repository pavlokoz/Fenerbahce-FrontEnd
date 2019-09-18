import { Component, OnInit, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef  } from '@angular/material'; 
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from 'events';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { Parent } from '../models/parent';
import { StudentParent } from '../models/student-parent';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  searchInput: FormControl = new FormControl();
  searchResult: Parent[] = [];

  constructor(private searchService: SearchService, 
    private spinnerService: SpinnerService,   
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SearchDialogComponent>) { }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(debounceTime(500))
    .subscribe(input => {
      let inputLine = input.toString();
      if (inputLine != null && inputLine != "") {
        this.searchResult.length = 0;
        this.searchService.searchParent(inputLine).subscribe(res => {
            this.searchResult = res;
        });
      }
      else {
        this.searchResult.length = 0;
      }
    });
  }

  addParent(parentId: number) {
    let data: StudentParent = {
      ParentId: parentId,
      StudentId: this.data.StudentId
    }
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.searchService.addParent(data).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Parent added!", "Got it", {
        duration: 2000
      });
    });
  }
}
