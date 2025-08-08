import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { useLoginMutation } from "../redux/api/api";
import { setUser } from "../redux/features/auth/authSlice";
import { LoginForm } from "../components/ui/LoginForm";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setError(null);
    try {
      const res = await login(values).unwrap();
      dispatch(setUser(res));
      // redirect or notify success
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />;
};

export default Login;
