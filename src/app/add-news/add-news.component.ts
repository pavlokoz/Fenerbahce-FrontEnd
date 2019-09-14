import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { News } from '../models/news';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  public newsForm: FormGroup;
  formData: FormData;

  constructor(private newsService: NewsService,
    private spinnerService: SpinnerService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initFormGroup();
  }

  create(newsForm) {
    let news: News = {
      NewsId: 0,
      Title: newsForm.newsTitle,
      Info: newsForm.newsText,
      CreateDate: null
    };
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.newsService.createNews(news).subscribe(res => {
      if (this.formData){
        this.newsService.addNewsImage(res, this.formData).subscribe(res => {
          this.spinnerService.HideSpinner('LoadingProcess');
          this.snackBar.open("News added!", "Got it", {
            duration: 2000
          });
        });
      } else {
        this.spinnerService.HideSpinner('LoadingProcess');
        this.snackBar.open("News added!", "Got it", {
          duration: 2000
        });
      }
    });
  };

  public initFormGroup() {
    this.newsForm = new FormGroup({
      newsTitle: new FormControl(null, [Validators.required]),
      newsLogo: new FormControl(null, [Validators.required]),
      newsText: new FormControl(null, [Validators.required])
    });
  };

  public onFileChanged(event) {
    let newsLogo = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', newsLogo, newsLogo.name);
  };
}
