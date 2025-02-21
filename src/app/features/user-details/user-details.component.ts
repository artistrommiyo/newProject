import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  columnDefs: any[] = [];
  rowData: any[] = [];
  baseApi = 'https://64.227.174.34:9101/moneymining/api';
  gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      resizable: true,
      filter: true,
    },
    pagination: true,
    paginationPageSize: 10,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.columnDefs = [
      { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 80 },
      { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
      { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
      { field: 'email', headerName: 'Email', sortable: true, filter: true },
      { field: 'mobile', headerName: 'Mobile', sortable: true, filter: true },
      { field: 'city', headerName: 'City', sortable: true, filter: true },
      { field: 'state', headerName: 'State', sortable: true, filter: true },
      { field: 'pincode', headerName: 'Pincode', sortable: true, filter: true },
      {
        field: 'actions',
        headerName: 'Actions',
        cellRenderer: (params: any) => {
          const button = document.createElement('button');
          button.innerText = 'Delete';
          button.style.backgroundColor = 'red';
          button.style.color = 'white';
          button.style.border = 'none';
          button.style.padding = '5px 10px';
          button.style.cursor = 'pointer';
          button.onclick = () => this.deleteUser(params.data.id);
          return button;
        },
        width: 120
      }
    ];
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>(this.baseApi+'/get/all/users') // 🔹 Replace with your API
      .subscribe((data:any) => {
        this.rowData = data?.payLoad;
      });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.baseApi}/delete/user?userId=${userId}`).subscribe(
        () => {
          alert('User deleted successfully!');
          this.rowData = this.rowData.filter(user => user.id !== userId);
        },
        error => {
          alert('Failed to delete user!');
        }
      );
    }
  }
}