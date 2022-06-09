import { dataSource } from "./constants";

const randomColor = () => {
  const colorArr = ["pink", "yellow", "green", "blue"];
  const index = Math.floor(Math.random());
  return colorArr[index];
};

const draw = (show_num) => {
  const canvas_width = document.querySelector("#canvas").clientWidth;
  const canvas_height = document.querySelector("#canvas").clientHeight;
  const canvas: any = document.getElementById("canvas"); //获取到canvas
  const context = (canvas as any).getContext("2d"); //获取到canvas画图
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  const sCode =
    "a,b,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
  const aCode = sCode.split(",");
  const aLength = aCode.length; //获取到数组的长度
  //4个验证码数
  for (let i = 0; i <= 3; i++) {
    const j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    const deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
    const txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt.toLowerCase(); // 依次把取得的内容放到数组里面
    const x = 10 + i * 20; //文字在canvas上的x坐标
    const y = 20 + Math.random() * 8; //文字在canvas上的y坐标
    context.font = "bold 23px 微软雅黑";

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = randomColor();
    context.fillText(txt, 0, 0);

    context.rotate(-deg);
    context.translate(-x, -y);
  }
  //验证码上显示6条线条
  for (var i = 0; i <= 5; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  //验证码上显示31个小点
  for (var i = 0; i <= 30; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    var x = Math.random() * canvas_width;
    var y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
  //最后把取得的验证码数组存起来，方式不唯一
  return show_num.join("");
};

const getData = (query) => {
  const data = dataSource.filter((item) =>
    Object.keys(query).every(
      (key) => item[key] && item[key].includes(query[key])
    )
  );
  return data || [];
};

export { draw, getData };
