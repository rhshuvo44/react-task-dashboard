import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginForm } from "../components/ui/LoginForm";
import { useLoginMutation } from "../redux/api/api";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setError(null);
    try {
      const res = await login(values).unwrap();
      dispatch(setUser(res));

      // Show toast success with server message or fallback
      toast.success("Login successful!");

      // Redirect based on user role from response user object
      const userRole = res?.user?.role;
      if (userRole) {
        navigate(`/${userRole}/dashboard`, { replace: true });
      } else {
        navigate("/dashboard", { replace: true }); // fallback
      }
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />;
};

export default Login;
