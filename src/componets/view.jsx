import { useEffect, useMemo, useState } from 'react';
import { View } from '../utils/services';
import './table.css';


export const Table=() =>{
  const [data,setdata]=useState([]);

  const api=()=>{
    View().then(res=>setdata(res.res))
    .catch(err=>console.log(err))
  };
  useEffect(()=>{
    api()
  },[])
      
  const columns = useMemo(
    (item) => [
      {
        Header: 'First Name',
        accessor: 'FirstName',
      },{
        Header: 'Last Name',
        accessor: 'LastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Date of Birth',
        accessor: 'dob',
      },
      {
        Header: 'Phone number',
        accessor: 'PhoneNo',
      },
    ],
    []
  );

  const tableData = useMemo(() => data, [data]);
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
