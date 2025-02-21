import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  columnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 80 },
    { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'mobile', headerName: 'Mobile', sortable: true, filter: true },
    { field: 'city', headerName: 'City', sortable: true, filter: true },
    { field: 'state', headerName: 'State', sortable: true, filter: true },
    { field: 'pincode', headerName: 'Pincode', sortable: true, filter: true }
  ];

  rowData: any[] = [];
  gridOptions = {
    pagination: true,
    paginationPageSize: 10
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('https://64.227.174.34:9101/moneymining/api/get/all/users?pageSize=10&pageNumber=0') // 🔹 Replace with your API
      .subscribe((data:any) => {
        this.rowData = data?.payLoad;
      });
  }
}