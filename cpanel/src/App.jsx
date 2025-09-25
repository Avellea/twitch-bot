import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home.jsx';
import Panel from './pages/Panel.jsx';
import Moderation from './pages/Moderation.jsx';
import Database from './pages/Database.jsx';


// Components
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/panel" element={<Panel/>}/>
                    <Route path="/moderation" element={<Moderation/>}/>
                    <Route path="/database" element={<Database/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App