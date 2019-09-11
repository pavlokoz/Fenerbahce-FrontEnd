import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  school: School;
  schoolLogo: any;
  displayedColumnsGroup = ['GroupName', 'SportName'];

  constructor(private schoolService: SchoolService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let schoolId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.schoolService.getSchoolById(schoolId).subscribe(response => {
      this.school = response;
    });
    this.schoolService.getSchoolLogoById(schoolId).subscribe(response => {
      this.createImageFromBlob(response);
    });
  }

  deleteSchool(): void {
    this.schoolService.deleteSchool(this.school.SchoolId).subscribe(response => {
      this.router.navigate(['/schools']);
    });
  };

  private createImageFromBlob(image: Blob): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.schoolLogo = reader.result;
    }); 

    if (image && image.size > 0) {
       reader.readAsDataURL(image);
    }
  }  
}
