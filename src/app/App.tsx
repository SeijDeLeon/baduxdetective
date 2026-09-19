import { Route, Routes } from 'react-router';

import './App.css';
import './pages/WorkshopPages.css';
import './pages/WorkshopPages2.css';
import Case2Page from './pages/Case2Page';
import Case2SolutionPage from './pages/Case2SolutionPage';
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import Page8 from './pages/Page8';
import PatternTrainingPage from './pages/PatternTrainingPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/page-1" element={<Page1 />} />
            <Route path="/page-2" element={<Page2 />} />
            <Route path="/page-3" element={<Page3 />} />
            <Route path="/page-4" element={<Page4 />} />
            <Route path="/page-5" element={<Page5 />} />
            <Route path="/page-6" element={<Page6 />} />
            <Route path="/page-7" element={<Page7 />} />
            <Route path="/page-8" element={<Page8 />} />
            <Route path="/pattern-training" element={<PatternTrainingPage />} />
            <Route path="/case-2" element={<Case2Page />} />
            <Route path="/case-2-solution" element={<Case2SolutionPage />} />
        </Routes>
    );
}

export default App;
