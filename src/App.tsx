import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import {
  HomePage,
  MapPage,
  TimelinePage,
  CharactersPage,
  FactionsPage,
  EconomyPage,
  LorePage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/factions" element={<FactionsPage />} />
          <Route path="/economy" element={<EconomyPage />} />
          <Route path="/lore" element={<LorePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
