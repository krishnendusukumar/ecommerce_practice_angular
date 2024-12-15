import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private apollo: Apollo) { }

    // Fetch user profile from the backend
    getUserProfile(): Observable<any> {
        const GET_USER_PROFILE = gql`
      query getUserProfile {
        userProfile {
          name
          address
          phone
        }
      }
    `;
        return this.apollo.query({
            query: GET_USER_PROFILE,
            fetchPolicy: 'network-only', // Always fetch fresh data
        });
    }

    // Update user profile on the backend
    updateUserProfile(profileData: { name: string; address: string; phone: string }): Observable<any> {
        const UPDATE_USER_PROFILE = gql`
      mutation updateUserProfile($data: UpdateProfileInput!) {
        updateUserProfile(data: $data) {
          name
          address
          phone
        }
      }
    `;
        return this.apollo.mutate({
            mutation: UPDATE_USER_PROFILE,
            variables: { data: profileData },
        });
    }
}
