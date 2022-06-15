import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './AddCampaigns';

import CampaignListFilterWithTable from './pages/home/CampaignListFilterWithTable';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CampaignListFilterWithTable/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
