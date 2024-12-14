import React, { useEffect } from 'react';
import DataTable from '../../components/DataTable';
import baseApiAuth from '../../api/baseApi';

const App = () => {
    const [pageData, setPageData] = useState();
    const laodData = () => {

        const requestUrl = '/api2/product/'
        baseApiAuth
        .get(requestUrl)
        .then(res=>{
            setPageData(res.data.results.map(item=>))
        })  
        .catch(err=>{
            console.log('err', err);
            
        })  
    }
    useEffect(()=>{
        laodData();
    })
  const data = [
    [1, 'John Doe', 'john@example.com', '2024-01-01'],
    [2, 'Jane Smith', 'jane@example.com', '2023-05-15'],
  ];

  const columns = [
    { title: 'محصول', name='part_number_en' },
    { title: 'محصول', name='part_number_en' },
    { title: 'دسته بندی', name='category_str' },
    { title: 'موجود درانبار', name='price' },
    { title: 'کد محصول', name='id' },
    { title: 'قیمت', name='price' },
    { title: 'تعداد', name='price' },
    { title: 'وضعیت', name='status_str' },
    { title: 'عملیات', name='' },
  ];

  return (
    <div className="container mt-5">
      <h2>React Bootstrap DataTable</h2>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default App;
