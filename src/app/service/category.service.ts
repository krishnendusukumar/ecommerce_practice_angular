import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) { }

  // Fetch all categories
  getCategories(): Observable<any> {
    const GET_CATEGORIES = gql`
      query {
        categories {
          id
          name
          image
        }
      }
    `;
    return this.apollo.watchQuery({ query: GET_CATEGORIES }).valueChanges;
  }

  // Add a new category
  addCategory(data: { name: string; image: string }): Observable<any> {
    const ADD_CATEGORY = gql`
      mutation AddCategory($data: CreateCategoryDto!) {
        addCategory(data: $data) {
          id
          name
          image
        }
      }
    `;

    return this.apollo.mutate({
      mutation: ADD_CATEGORY,
      variables: { data } // Pass only the form data
    });
  }



  // Update an existing category
  updateCategory(id: string, changes: { name?: string; image?: string }): Observable<any> {
    const UPDATE_CATEGORY = gql`
      mutation UpdateCategory($id: ID!, $changes: UpdateCategoryDto!) {
        updateCategory(id: $id, changes: $changes) {
          id
          name
          image
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_CATEGORY,
      variables: { id, changes },
    });
  }


  // Delete a category
  deleteCategory(id: string): Observable<any> {
    const DELETE_CATEGORY = gql`
      mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id },
    });
  }

}
