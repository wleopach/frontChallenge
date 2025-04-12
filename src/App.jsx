import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeatureSelector from "./components/FeatureSelector.jsx";
function App() {

    return (
       <>
           <Router>
               <Routes>
                   <Route path="/" element={<FeatureSelector/>} />
               </Routes>
           </Router>
       </>

        )

}

export default App
