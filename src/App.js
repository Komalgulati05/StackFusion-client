import React from 'react'
import Form from "./componets/form";
import { Routes,Route} from "react-router-dom";
import {Table} from './componets/view';
function App() {


  return (
    <>
    <Routes>
    {/* <Route path="/" element={<Login/>} />      */}
      <Route path="/*" element={<Form />} />
      <Route path="/view" element={<Table />} />
    </Routes>

  </>
  )
  }

export default App;







