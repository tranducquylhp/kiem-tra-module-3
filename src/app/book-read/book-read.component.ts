import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../book.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.scss']
})
export class BookReadComponent implements OnInit {
  bookList: Book[] = [];
  successMessage: string;
  failMessage: string;
  sub: Subscription;
  book: Book;
  bookForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.bookService.getAll().subscribe(result => {
      this.bookList = result;
    });
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.bookService.getById(id).subscribe(next => {
        this.book = next;
      }, error => {
        this.failMessage = error;
      });
    });
  }

  read(book: Book) {
    book.read = !book.read;
    this.bookService.edit(book, book.id).subscribe(() => {
      this.successMessage = 'Cập nhật thành công';
    }, () => {
      this.failMessage = 'Cập nhật thất bại';
      book.read = !book.read;
    });
  }
}
