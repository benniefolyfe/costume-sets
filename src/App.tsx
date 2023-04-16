import { HabiticaUserProvider } from "./contexts/habitica-user-context";
import { AppRoutes } from "./pages/routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global-style.css'

function App() {

  return (
      <HabiticaUserProvider>
        <AppRoutes />
      </HabiticaUserProvider>
  );
}

export default App;
