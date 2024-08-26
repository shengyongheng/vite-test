import { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import type { CheckboxProps } from "antd";
import axios from "axios";
import md5 from 'js-md5'

const LoginRegisterDemo = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [remember, setRemember] = useState(false);
    const [form] = Form.useForm();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        form.resetFields();
    };
    const handleChange: CheckboxProps["onChange"] = (e) => {
        setRemember(e.target.checked);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async ({ username, password, confirm }: any) => {
        if (isLogin) {
            try {
                const response = await axios.post("/api/login", {
                    username,
                    password: md5(password),
                    remember
                });
                console.log("注册请求成功:", response.data);
                message.success("登录成功");
            } catch (error) {
                console.error("登录请求失败:", error);
                message.success("登录失败");
            }
        } else {
            try {
                const response = await axios.post("/api/register", {
                    username,
                    password: md5(password),
                    confirm: md5(confirm),
                });
                console.log("注册请求成功:", response.data);
                message.success("注册成功");
            } catch (error) {
                console.error("注册请求失败:", error);
                message.success("注册失败");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Form form={form} className="w-full max-w-md p-4" onFinish={onFinish}>
                <>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "请输入用户名" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;
                                    if (value && usernameRegex.test(getFieldValue("username"))) {
                                        return Promise.resolve();
                                    }
                                    if (value && !usernameRegex.test(getFieldValue("username"))) {
                                        return Promise.reject(
                                            new Error(
                                                "用户名只包含字母、数字和下划线。长度在5到20个字符之间。"
                                            )
                                        );
                                    }
                                    if (!value) {
                                        return Promise.reject(new Error(""));
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        className={isLogin ? "mb-2" : ""}
                        rules={[
                            { required: true, message: "请输入密码" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const passwordRegex =
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
                                    if (value && passwordRegex.test(getFieldValue("password"))) {
                                        return Promise.resolve();
                                    }
                                    if (value && !passwordRegex.test(getFieldValue("password"))) {
                                        return Promise.reject(
                                            new Error(
                                                "至少包含8个字符、至少1个大写字母、1个小写字母、1个数字和1个特殊字符"
                                            )
                                        );
                                    }
                                    if (!value) {
                                        return Promise.reject(new Error(""));
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                </>
                {!isLogin ? (
                    <>
                        <Form.Item
                            name="confirm"
                            className="mb-2"
                            dependencies={["password"]}
                            rules={[
                                { required: true, message: "请输入确认密码" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error(""));
                                        }
                                        if (value && getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("两次输入的密码不一致"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="请输入确认密码" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            注册
                        </Button>
                        <div className="text-center mt-1">
                            <Button onClick={toggleForm} className="text-gray-600 flex justify-start">
                                已有账号，去注册
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center mt-2 mb-2 flex justify-between items-center">
                            <Checkbox onChange={handleChange} value={remember}>
                                记住我
                            </Checkbox>
                            <Button onClick={toggleForm} className="text-gray-600">
                                没有账号？去注册
                            </Button>
                        </div>
                        <Button type="primary" htmlType="submit" className="w-full">
                            登录
                        </Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default LoginRegisterDemo;