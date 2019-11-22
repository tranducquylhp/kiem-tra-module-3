import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './book';

const API_URL = 'http://localhost:8081/books';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL, book);
  }

  edit(book: Book, id: number): Observable<Book> {
    return this.http.put<Book>(API_URL + `/${id}`, book);
  }

  getById(id: string): Observable<Book> {
    return this.http.get<Book>(API_URL + `/${id}`);
  }
}
