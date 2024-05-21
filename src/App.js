import "./App.css";
import { GlobalProvider } from "./context/GlobalContext";
import Routing from "./routing/Routing";

function App() {
  return (
    <>
      <GlobalProvider>
        <Routing />
      </GlobalProvider>
    </>
  );
}

export default App;
