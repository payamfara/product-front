"use client";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';

const DataTable = ({ data, columns }) => {
  useEffect(() => {
    const table = $('#datatable').DataTable({
      data: data,
      columns: columns,
      destroy: true, 
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);  

  return (
    <div className="table-responsive">
      <table id="datatable" className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};

export default DataTable;
