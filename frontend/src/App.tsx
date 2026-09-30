import "antd/dist/reset.css";
import "./App.css";
import PrologueGate from "./components/layout/PrologueGate";
import AppRoutes from "./Routes.tsx";

function App() {
  return (
    <PrologueGate>
      <AppRoutes />
    </PrologueGate>
  );
}

export default App;
