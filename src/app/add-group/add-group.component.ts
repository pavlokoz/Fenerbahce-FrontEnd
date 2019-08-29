import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { GroupService } from '../services/group.service';
import { SportService } from '../services/sport.service';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material';
import { Group } from '../models/group';
import { Sport } from '../models/sport';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  public addGroupForm: FormGroup;  
  public sports: Sport[];
  
  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private MaxCountOfStudents: string = Constants.DataValidationConstants.MaxCountOfStudents;
  private pricePattern: string = Constants.DataValidationConstants.pricePattern;

  constructor(private groupService: GroupService,
              private sportService: SportService,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getSports();
    this.initFormGroup();
  }

  addGroup(addGroupForm) {
    let group: Group = {
      GroupName: addGroupForm.groupName,
      MaxCountOfStudents: addGroupForm.MaxCountOfStudents,
      MonthPrice: addGroupForm.MonthPrice,
      GroupId: 0,
      StartDate: addGroupForm.StartDate,
      EndDate: addGroupForm.EndDate,
      Students: null,
      SubjectId: addGroupForm.Sport,
      SubjectName: null
    };
     this.groupService.createGroup(group).subscribe(res => {
       this.snackBar.open("You are registered!", "Got it", {
         duration: 2000
       });
     });
  };

  hasError (controlName: string, errorName: string) {
    return this.addGroupForm.controls[controlName].hasError(errorName);
  };

  private initFormGroup() {
    this.addGroupForm = new FormGroup({
      MaxCountOfStudents: new FormControl(0, [Validators.required, Validators.min(1)]),
      groupName: new FormControl('', [Validators.required, 
                                      Validators.pattern(this.namePattern)]),
      StartDate: new FormControl(new Date(), [Validators.required]),
      EndDate: new FormControl(new Date(), [Validators.required]),
      Sport: new FormControl(0, [Validators.required]),
      MonthPrice: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  };

  private getSports() {
    this.sportService.getSports().subscribe(res => {
      this.sports = res;
    });
  };
}
