import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student;
  displayedColumnsGroup = ['FirstName', 'LastName'];

  constructor(private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let studentId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(studentId).subscribe(response => {
      this.student = response;
    });
  }

}
