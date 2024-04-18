import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./components/Main/Main";
import Info from "./components/NextForm/FormPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/form' element={<Info/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
