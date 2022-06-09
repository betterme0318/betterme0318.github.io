import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import UseContextProvider from '../useContextProvider';
import QueryForm from './QueryForm';
import QueryTable from './QueryTable';
import '../App.css';

const { TabPane } = Tabs;

function QueryList() {
  const [query, setQuery] = useState({})
 
  useEffect(() => {
    
  }, [])

  return (
    <div className='querylist'>
      <Tabs defaultActiveKey="1">
        <TabPane tab="互换汇总统计" key="1">
          <UseContextProvider value={query}>
            <QueryForm query={(val) => {setQuery(val)}}></QueryForm>
            <QueryTable></QueryTable>
          </UseContextProvider>
        </TabPane>
        <TabPane tab="基金互换汇总统计" key="2">
          <div>待实现</div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default QueryList;
