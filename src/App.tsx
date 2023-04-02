import { HabiticaUserProvider } from "./contexts/habitica-user-context";
import { AppRoutes } from "./pages/routes";
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <HabiticaUserProvider>
        <AppRoutes />
      </HabiticaUserProvider>
  );
}

export default App;
