import React, { useEffect, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import {ContContext} from '../useContextProvider';
import {columns, dataSource} from '../constants';
import { getData } from '../methods';
import '../App.css';


const QueryTable = () => {
  const [tableData, setTableData] = useState(dataSource)
  const query = useContext(ContContext)

  useEffect(() => {
    const data = getData(query);
    setTableData(data);
  }, [query])

  return (
    <div className='query-table'>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
}

export default QueryTable;
