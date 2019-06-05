// node_modules
import React from 'react';
import 'antd/dist/antd.css';

// me
import './App.css';
import AisPageHeader from './component/AisPageHeader';
import AisPatientInfo from './component/AisPatientInfo';
import AisOnlineViewer from './AisOnlineViewer';
import InfoAisSample from './info_ais_sample.json';
import AppContext from './AppContext';

function App() {
  const testContext = {infoAis: InfoAisSample};
  return (
    <div className="App"><AppContext.Provider value={testContext}>
      <AisPageHeader></AisPageHeader>
      <AisPatientInfo></AisPatientInfo>
      <AisOnlineViewer></AisOnlineViewer>
    </AppContext.Provider></div>
  );
}

App.contexType = AppContext;
export default App;
