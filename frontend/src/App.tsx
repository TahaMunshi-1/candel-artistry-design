import "antd/dist/reset.css"; // Import Ant Design styles
import "./App.css";
import CurtainPreloader from "./components/layout/CurtainPreloader";
import AppRoutes from "./Routes.tsx";

function App() {
  return (
    <CurtainPreloader>
      <AppRoutes />
    </CurtainPreloader>
  );
}

export default App;
