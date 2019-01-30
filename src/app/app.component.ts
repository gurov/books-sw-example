import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

export interface Book {
  volumeInfo: {
    imageLinks: {
      thumbnail: string;
    }
    title: string;
    authors: string[];
  };
}

export interface GBooks {
  items: Book[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  value = '';
  books = [];
  newVersionIsAvailable = false;
  lastQ: string[] = [];
  loading = false;
  q = new Subject<string>();

  constructor(private http: HttpClient, private swUpdate: SwUpdate) {
  }

  reload() {
    location.reload();
  }

  ngOnInit() {

    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.newVersionIsAvailable = true;
    });

    this.q
      .pipe(
        map(s => s.trim()),
        distinctUntilChanged()
      )
      .subscribe(s => {
        if (this.lastQ.length > 5) {
          this.lastQ.shift();
        }
        this.lastQ = [s, ...this.lastQ.filter(lastS => lastS !== s)];
        this.load(s);
      });
  }

  load(s: string) {
    this.loading = true;
    this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${s}`)
      .subscribe((res: GBooks) => {
        this.books = res.items || [];
        this.loading = false;
      });
  }



}
