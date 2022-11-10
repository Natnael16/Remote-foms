import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Admin from "./pages/admin";


class App extends Component {

  render() {
    return (
  
     <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/lists" element={<Admin/>}>
        </Route>
      </Routes>
    </BrowserRouter>

       
  
    
  );
  }
}

export default App;

ReactDom.render(<App />, document.getElementById("root"));
