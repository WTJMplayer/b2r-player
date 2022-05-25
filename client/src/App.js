import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import  AudioUpload  from './components/AudioUpload';
import Auth from './components/utils/auth';
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [safeMode, setSafeMode] = useState(true);
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <AudioUpload />
        <Router>
          <Navbar safeMode={safeMode}
          setSafeMode={setSafeMode}/>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
        <Footer safeMode={safeMode} />
      </div>
    </ApolloProvider>
  );
}

export default App;
