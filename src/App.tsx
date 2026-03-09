import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ParticleCanvas, Vignette, PageTransition, LoadingScreen } from './components/shared';
import {
  HomePage,
  MapPage,
  TimelinePage,
  CharactersPage,
  FactionsPage,
  EconomyPage,
  LorePage,
} from './pages';

const WORLD_TAGLINE = 'Where darkness reigns and legends are forged in shadow';

// Wrapper component to apply PageTransition within BrowserRouter
function AppContent() {
  // LoadingScreen manages its own visibility via localStorage
  // This component just needs to exist for the loading screen to work

  return (
    <>
      {/* First Visit Loading Screen */}
      <LoadingScreen 
        onComplete={() => {}} 
        worldName="Misthold"
        tagline={WORLD_TAGLINE}
      />

      {/* Background Layer - Particles */}
      <ParticleCanvas particleCount={100} connectionDistance={150} speed={0.25} />

      {/* Atmosphere Layer - Vignette */}
      <Vignette />

      {/* Main Layout */}
      <Layout>
        <PageTransition mode="fade" duration={0.35}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/factions" element={<FactionsPage />} />
            <Route path="/economy" element={<EconomyPage />} />
            <Route path="/lore" element={<LorePage />} />
          </Routes>
        </PageTransition>
      </Layout>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
