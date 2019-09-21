import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { News } from '../models/news';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  public newsForm: FormGroup;
  private news: News;
  formData: FormData;

  constructor(private newsService: NewsService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.news = this.data.News;
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
    this.newsService.updateNews(news).subscribe(res => {
      if (this.formData){
        this.newsService.addNewsImage(res, this.formData).subscribe(res => {
          this.spinnerService.HideSpinner('LoadingProcess');
          this.snackBar.open("News updated!", "Got it", {
            duration: 2000
          });
        });
      } else {
        this.spinnerService.HideSpinner('LoadingProcess');
        this.snackBar.open("News updated!", "Got it", {
          duration: 2000
        });
      }
    });
  };

  public initFormGroup() {
    this.newsForm = new FormGroup({
      newsTitle: new FormControl(this.data.News.Title, [Validators.required]),
      newsLogo: new FormControl(this.data.Image),
      newsText: new FormControl(this.data.News.Info, [Validators.required])
    });
  };

  public onFileChanged(event) {
    let newsLogo = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', newsLogo, newsLogo.name);
  };

}
