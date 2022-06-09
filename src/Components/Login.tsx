import React, { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import {
  SmileOutlined,
  UserOutlined,
  KeyOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { draw } from '../methods';
import '../App.css';



function Login() {
  const [trueCode, setTrueCode] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  
  const handleClickCanvas = () => {
    const res = draw([])
    setTrueCode(res)
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onCodeChange = (event) => {
    setCode(event.target.value)
  }

  const onLogin = () => {
    if (!name || !password || !code ) {
      message.warning('请填写完整')
      return
    }
    if (password !== '123456') {
      message.error('密码输入错误')
      return
    }
    if (code !== trueCode) {
      message.error('验证码输入错误')
      return
    }
    window.location.hash = '/querylist'
  }


  useEffect(() => {
    const res = draw([])
    setTrueCode(res)
  }, [])

  return (
    <div className='login'>
        <div className='login-block'>
          <div>
            <SmileOutlined style={{fontSize: '30px'}}/>
            <h1>场外衍生品交易管理系统</h1>
          </div>
          <Input 
            size='large' 
            value={name} 
            placeholder="请输入用户名" 
            prefix={<UserOutlined />}
            allowClear 
            onChange={onNameChange}
          />
          <Input.Password 
            size='large' 
            value={password} 
            placeholder="请输入密码" 
            prefix={<KeyOutlined />}
            allowClear
            onChange={onPasswordChange}
          />
          <Input 
            size='large'
            value={code}
            placeholder="请输入验证码" 
            prefix={<SafetyCertificateOutlined />} 
            suffix={
              <canvas id="canvas" width="130px" height="33px" onClick={handleClickCanvas}></canvas>
            }
            allowClear
            onChange={onCodeChange}
          />
          <Button type="primary" size='large' className='login-btn' onClick={onLogin}>登录</Button>
        </div>
    </div>
  );
}

export default Login;
