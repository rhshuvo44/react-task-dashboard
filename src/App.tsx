import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute role={undefined}>
        <MainLayout />
      </ProtectedRoute>
    </>
  );
}

export default App;
