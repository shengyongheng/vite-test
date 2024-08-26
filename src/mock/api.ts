// mock.js
import Mock from "mockjs";

// 创建一个虚拟的登录响应数据
const loginResponse = Mock.mock({
  status: "1",
  "data|1": {
    token: '@string("upper", 32)',
    expires_in: "@integer(100, 10000)",
  },
  message: "登录成功",
});

export default [
  {
    url: "/api/login", //请求地址
    method: "post", //请求方式
    // eslint-disable-next-line
    response: (req: any, res: any) => {
      // 模拟登录逻辑
      // 这里可以根据实际请求参数来调整响应逻辑
      const { username, password } = req.body;
      if (username === "hsy123456" && password === "@Hsy3271660881") {
        return loginResponse;
      } else {
        return {
          status: "0",
          message: "用户名或密码错误",
        }
      }
    },
  },
  {
    url: "/api/register", //请求地址
    method: "post", //请求方式
    // eslint-disable-next-line
    response: (req: any, res: any) => {
      const { username, password } = req.body;
      // 这里可以根据实际注册逻辑来调整响应
      if (username && password) {
        // 假设注册成功，返回成功响应
        return {
          status: "success",
          message: "注册成功",
        };
      } else {
        // 参数不完整，返回失败响应
        return {
          status: "fail",
          message: "注册失败：请填写完整的注册信息",
        };
      }
    },
  },
];
