"use client";
import DynamicAttributeField from "@/src/components/DynamicAttributeField";
import { Fragment, useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { baseApiAuth } from "../../api/baseApi";
import CustomLoading from "../../components/Loading";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";
import MultilevelMenu from "../../components/MultilevelMenu";

const ListProductPage = () => {
  const columns = [
    {
      title: "محصول",
      render: (data, type, row) => {
        return `<div class="d-flex justify-content-start align-items-center product-name">
          <div class="avatar-wrapper">
            <div class="avatar avatar me-2 rounded-2 bg-label-secondary">
              <img src="${row.images[0]}" alt="${row.part_number_en}" class="rounded-2">
            </div>
          </div>
          <div class="d-flex flex-column">
            <h6 class="text-body text-nowrap mb-0">${row.part_number_en}</h6>
            <small class="text-muted text-truncate d-none d-sm-block">${row.part_number_fa}</small>
          </div>
        </div>`;
      },
    },
    { title: "دسته بندی", data: "category_str" },
    { title: "کد محصول", data: "id" },
    {
      title: "قیمت",
      data: "price",
      render: (data, type, row) => data + " تومان",
    },
    {
      title: "عملیات",
      render: (data, type, row) => {
        const container = document.createElement("div");
        container.className = "d-flex gap-2";

        const root = createRoot(container);
        root.render(
          <Fragment>
            <IconEdit onClick size={16} />
            <IconTrash onClick size={16} />
          </Fragment>
        );

        return container;
      },
    },
  ];

  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    const requestUrl = `/api2/product/`;
    const response = await baseApiAuth.get(requestUrl);
    const results = response.data.results;
    return results;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      console.log("data", data);

      setData(data);
    };
    loadData();
  }, []);

  if (!data.length) {
    return <CustomLoading />;
  }

  return (
    <Fragment>
      <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div className="layout-container">
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="py-3">
                <div className="bg-white shadow-sm rounded-pill container-xxl flex-grow-1 py-2">
                  <MultilevelMenu />
                </div>
              </div>
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4">
                  <span className="text-muted fw-light"> صفحه اصلی / </span>
                  لیست محصولات
                </h4>
                <div className="card">
                  <div className="card-header d-flex flex-wrap row-cols-3">
                    <h5 className="card-title mb-0 col-12">لیست محصولات</h5>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "status",
                          attribute_name_fa: "وضعیت",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-choice/?title=status",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "category",
                          attribute_name_fa: "دسته بندی",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-category/?",
                          },
                        }}
                      />
                    </div>
                    <div className="p-2">
                      <DynamicAttributeField
                        data={{
                          attribute_name_en: "status",
                          attribute_name_fa: "وضعیت انبار",
                          attr_type: {
                            type: "select_2",
                            url: "/api2/myapp-category/?",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <DataTable data={data} columns={columns} />
                </div>
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="drag-target"></div>
    </Fragment>
  );
};

export default ListProductPage;
