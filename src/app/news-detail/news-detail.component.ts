import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { SpinnerService } from '../services/spinner.service';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  news: News;
  newsImage: any;

  constructor(private newsService: NewsService,
    private authService: AuthorizationService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }  

  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    let newsId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.newsService.getNewsById(newsId).subscribe(response => {
      this.news = response;
      this.spinnerService.HideSpinner('LoadingProcess');
    });
    this.newsService.getNewsImageById(newsId).subscribe(response => {
      this.createImageFromBlob(response);
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  private createImageFromBlob(image: Blob): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.newsImage = reader.result;
    }); 

    if (image && image.size > 0) {
       reader.readAsDataURL(image);
    }
  }

}
