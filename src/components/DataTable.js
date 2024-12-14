"use client";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"; // Styles for buttons
import "datatables.net-buttons-bs5"; // Buttons for Bootstrap 5
import "datatables.net-buttons/js/buttons.html5"; // Export to CSV/Excel
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import RippleButton from "../components/RippleButton/RippleButton";
import {replaceComponent} from "../utils/funcs";
import { FaDownload, FaPlus } from "react-icons/fa";
import CustomDropdown from '../components/Dropdown';
const DataTable = ({ data, columns }) => {
  useEffect(() => {
    const table = $("#datatable").DataTable({
      data: data,
      columns: columns,
      destroy: true,
      pagingType: "simple_numbers",
      dom: '<"col-12 card-header d-flex justify-content-between border-top rounded-0 flex-wrap py-2"f<"d-flex flex-wrap"l<"custom-actions"B><"add-product">>rtip>', // Add "B" for buttons
      // dom: '<"d-flex justify-content-between"Bf>rtip', // Add "B" for buttons
      buttons: ["copy", "excel", "csv", "print"],
      initComplete: function () {
        console.log(document.querySelector(".custom-actions").innerHTML)
        replaceComponent(
          ".custom-actions",
          <CustomDropdown title={'گرفتن خروجی'} items={document.querySelector(".custom-actions").innerHTML} />
        );
        replaceComponent(
          ".add-product",
          <RippleButton
            className={`d-flex align-items-center gap-1 w-100 h-100 z-1 btn btn-lg btn-primary p-1`}
            title="Add Product"
          >
            <FaPlus />
            افزودن محصول
          </RippleButton>
        );
      },
      language: {
        info: "نمایش _START_ تا _END_ از _TOTAL_ ورودی",
        infoEmpty: "هیچ داده‌ای موجود نیست",
        infoFiltered: "(فیلتر شده از _MAX_ ورودی)",
        lengthMenu: "_MENU_",
        loadingRecords: "در حال بارگذاری...",
        zeroRecords: "هیچ داده‌ای یافت نشد",
        search: "",
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
        className="datatables-products table dataTable no-footer dtr-column collapsed"
      >
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
