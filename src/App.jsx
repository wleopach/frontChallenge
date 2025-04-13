import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeatureSelector from "./components/FeatureSelector";
import PredictionMessage from "./components/PredictionMessage";
function App() {

    return (
       <>
           <Router>
               <Routes>
                   <Route path="/" element={<FeatureSelector/>} />
                   <Route path="/predictions" element={<PredictionMessage/>} />
               </Routes>
           </Router>
       </>

        )

}

export default App
