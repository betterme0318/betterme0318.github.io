import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import '../App.css';

const { Option } = Select;

function QueryForm(props) {
	const [form] = Form.useForm();

	const onFinish = (val) => {
			props.query({
				reportTime: val.reportTime ? moment(val.reportTime).format('YYYY-MM-DD') : '',
				changeType: val.changeType || ''
			})
	}

	const onClear = () => {
    form.setFieldsValue({
      reportTime: '',
			changeType: ''
    });
		props.query({
			reportTime: '',
			changeType: ''
		})
  };
  
	useEffect(() => {
    
  }, [])

  return (
    <div className='queryform'>
      <Form
				layout={'inline'}
				form={form}
				initialValues={{}}
				onFinish={onFinish}
    	>
				<Form.Item label="报告日期" name="reportTime">
					<DatePicker style={{width: '160px'}} />
				</Form.Item>
				<Form.Item label="交易薄类型" name="changeType">
					<Select placeholder="请选择" allowClear style={{width: '160px'}}>
						<Option value="1">交易薄1</Option>
						<Option value="2">交易薄2</Option>
						<Option value="3">交易薄3</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type='default' onClick={onClear}>重置</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">查询</Button>
				</Form.Item>
    	</Form>
    </div>
  );
}

export default QueryForm;
