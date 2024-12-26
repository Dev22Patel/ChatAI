import { Router } from "./router";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./router/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter> 
        <Router />
      </BrowserRouter>
    </AuthProvider> 
  );
}

export default App;
