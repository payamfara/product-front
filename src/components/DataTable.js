"use client";
import "datatables.net-buttons-bs5"; 
import "datatables.net-buttons/js/buttons.html5"; 
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-bs5";
import React, { useEffect } from "react";
import $ from "jquery";
import RippleButton from "../components/RippleButton/RippleButton";
import CustomDropdown from '../components/Dropdown';
import { replaceComponent } from "../utils/funcs";
import { IconPrinter, IconFile, IconCopy, IconPlus, IconDownload } from '@tabler/icons-react';

const DataTable = ({ data, columns }) => {
  useEffect(() => {
    const table = $("#datatable").DataTable({
      data: data,
      columns: columns,
      destroy: true,
      pagingType: "simple_numbers",
      dom: '<"dataTables_wrapper dt-bootstrap5 no-footer"<"col-12 card-header d-flex justify-content-between border-top rounded-0 flex-wrap py-3"f<"d-flex flex-wrap gap-3"l<"custom-actions inner-h-100"><"custom-actions-hidden d-none"B><"add-product inner-h-100">>>rt<"row justify-content-between p-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>>',
      // dom: '<"d-flex justify-content-between"Bf>rtip', 
      buttons: ["copy", "excel", "csv", "print"],
      initComplete: function () {
        document.querySelector('.dt-search').classList.add('form-floating');
        document.querySelector('.dt-length > select').classList.add('h-100');
        document.querySelector('.dt-info').classList.add('dataTables_info');
        document.querySelector('.dt-paging').classList.add('dataTables_paginate');

        // swap input & label position
        const parent = document.querySelector('.dt-search'); 
        const input = parent.querySelector('input');
        const label = parent.querySelector('label');
        if (input && label) {
          parent.insertBefore(input, label); 
        }

        const btnCopy = document.querySelector(".custom-actions-hidden .buttons-copy");
        const btnCsv = document.querySelector(".custom-actions-hidden .buttons-csv");
        const btnPrint = document.querySelector(".custom-actions-hidden .buttons-print");
        const items = [
          { 'label': 'چاپ', 'icon': <IconPrinter size={16} />, onClick: () => btnPrint.click() },
          { 'label': 'Csv', 'icon': <IconFile size={16} />, onClick: () => btnCsv.click() },
          { 'label': 'کپی', 'icon': <IconCopy size={16} />, onClick: () => btnCopy.click() },
        ]
        replaceComponent(
          ".custom-actions",
          <CustomDropdown icon={<IconDownload size={16} />} title={'گرفتن خروجی'} items={items} />
        );
        replaceComponent(
          ".add-product",
          <RippleButton
            className={`d-flex align-items-center gap-1 z-1 btn btn-primary p-1 px-4`}
            title="Add Product"
          >
            <IconPlus size={16} />
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
