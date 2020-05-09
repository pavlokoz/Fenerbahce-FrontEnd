import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from '../services/authorization.service';
import { SpinnerService } from '../services/spinner.service';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  constructor(
    private newsService: NewsService,
    private authService: AuthorizationService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  public deleteNews(id: number): void {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.newsService.deleteNews(id).subscribe(response => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.loadData()
    });
  };

  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.newsService.getNews().subscribe(response => {
      this.news = response;
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

}
