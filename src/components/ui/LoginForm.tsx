import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import React from "react";

type LoginFormProps = {
  onSubmit: (values: { username: string; password: string }) => void;
  loading?: boolean;
  error?: string | null;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
}) => {
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
        Login
      </h2>

      {error && (
        <Alert message={error} type="error" showIcon className="mb-4" />
      )}

      <Form
        name="login"
        initialValues={{ username: "", password: "" }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
            className="rounded"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="rounded"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
