import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Category, CategoryForm } from '../category.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly api = `${environment.api}/categories`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  save(value: FormGroup<CategoryForm>['value']) {
    const createCategoryDto = { ...value };

    createCategoryDto.properties!.forEach((p) => {
      p.metadata = Object.fromEntries(
        Object.entries(p.metadata || {}).filter(
          ([_, v]) => v !== null && v !== undefined
        )
      );
    });

    return this.http.post(this.api, createCategoryDto);
  }
}
