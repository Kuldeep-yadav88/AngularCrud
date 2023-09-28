import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  postEmpDetails(data: any) {
    return this.httpClient.post<any>(
      'http://localhost:8080/api/v1/add-employee',
      data
    );
  }

  getEmpDetails(): Observable<any> {
    return this.httpClient.get<any>(
      ' http://localhost:8080/api/v1/get-all_employee'
    );
  }

  putEmpDetails(data: any) {
    return this.httpClient.put<any>(
      'http://localhost:8080/api/v1/update-employee',
      data
    );
  }

  deleteEmp(id: number) {
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/v1/delete-Details/' + id
    );
  }

  paginatedEmp(paginatedReq: any) {
    return this.httpClient.post<any>(' ',paginatedReq);
  }
}
