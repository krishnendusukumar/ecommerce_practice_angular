import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecom';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.addCategory({
      name: 'Electric',
      image: 'https://media.istockphoto.com/id/1144423759/vector/electric-plug-icon-with-cord-stock-vector.jpg?s=612x612&w=0&k=20&c=gaL7s6huiB6tCI-wybq1Q1ui1zH4yoDB1cxUg8Z4aLw='
    }).subscribe({
      next: () => console.log('Default category "Electric" added successfully.'),
      error: (err) => console.error('Failed to add default category:', err)
    });
  }
}
