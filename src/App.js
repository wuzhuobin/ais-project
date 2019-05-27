// node_modules
import React from 'react';
import 'antd/dist/antd.css';
// me
import './App.css';
import AisPageHeader from './component/AisPageHeader';
import AisPatientInfo from './component/AisPatientInfo';
import AisOnlineViewer from './AisOnlineViewer';

function App() {
  return (
    <div className="App">
      <AisPageHeader></AisPageHeader>
      <AisPatientInfo></AisPatientInfo>
      <AisOnlineViewer></AisOnlineViewer>
    </div>
  );
}

export default App;
