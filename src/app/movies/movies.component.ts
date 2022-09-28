import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  public movies$: Promise<Movie[]> | undefined;
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies = () => {
    this.movies$ = this.moviesService.getAllMovies();
    console.log(this.movies$);
  }

  deleteMovie = (id: number | undefined) => {
    if(confirm('Estás seguro de eliminar esta película?')) {
      this.moviesService.deleteMovieById(id).then(res => {
        alert('Eliminado con éxito.');
      }).catch(err => {
        alert('Ocurrió un error');
        console.log(err);
      }).finally(() => this.getMovies())
    }
  }
}
