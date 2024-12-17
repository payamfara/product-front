"use client";
import "datatables.net-buttons-bs5"; 
import "datatables.net-buttons/js/buttons.html5"; 
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-bs5";
import React, { useEffect } from "react";
import $ from "jquery";
import RippleButton from "../components/RippleButton/RippleButton";
import CustomDropdown from '../components/CustomDropdown';
import { replaceComponent } from "../utils/funcs";
import { IconPrinter, IconFile, IconCopy, IconPlus, IconDownload } from '@tabler/icons-react';

const DataTable = ({ data, columns }) => {
  useEffect(() => {
    const table = $("#datatable").DataTable({
      data: data,
      columns: columns,
      destroy: true,
      dom: 'rt',
      language: {
        info: "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
        infoEmpty: "هیچ داده‌ای موجود نیست",
        infoFiltered: "(فیلتر شده از _MAX_ ورودی)",
        lengthMenu: "_MENU_",
        loadingRecords: "در حال بارگذاری...",
        zeroRecords: "هیچ داده‌ای یافت نشد",
        search: "جستجو",
        paginate: {
          first: "اولین",
          last: "آخرین",
          next: "بعدی",
          previous: "قبلی",
        },
      },
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);

  return (
    <div className="table-responsive">
      <table
        id="datatable"
        className="mb-3 datatables-products table dataTable no-footer dtr-column collapsed"
      >
        <thead className="border-top">
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
