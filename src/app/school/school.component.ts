import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  school: School;
  displayedColumnsGroup = ['GroupName', 'SportName'];

  constructor(private schoolService: SchoolService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let schoolId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.schoolService.getSchoolById(schoolId).subscribe(response => {
      this.school = response;
    });
  }
}
