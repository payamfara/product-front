"use client";
import { useEffect } from "react";
import DataTable from "../../components/DataTable";
import { baseApiAuth } from "@/src/api/baseApi";


const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

const columns = [
  { title: 'ID', data: 'id' },
  { title: 'Name', data: 'name' },
  { title: 'Email', data: 'email' },
  {
    title: 'Details',
    render: (data, type, row) => {
      return `<div>
        <strong>${row.name}</strong><br />
        <small>${row.email}</small><br />
        <span>${row.age} years old</span>
      </div>`;
    }
  }
];

// Render Component
const app = () => {
    useEffect(()=>{
        const requestUrl = '/api2/'
        baseApiAuth
        .get('')
    }, [])
    
    return (
        <DataTable data={data} columns={columns} />
    )
}
export default app;