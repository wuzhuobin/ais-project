// node_modules
import React from 'react';
import 'antd/dist/antd.css';

// me
import './App.css';
import AisPageHeader from './component/AisPageHeader';
import AisPatientInfo from './component/AisPatientInfo';
import AisOnlineViewer from './AisOnlineViewer';
//import InfoAisSample from './info_ais_sample.json';
import AppContext from './AppContext';

function GetUrlParam(paraName) {
	var url = document.location.toString();
	var arrObj = url.split("?");

	if (arrObj.length > 1) {
	　　var arrPara = arrObj[1].split("&");
	　　var arr;

	　　for (var i = 0; i < arrPara.length; i++) {
		arr = arrPara[i].split("=");

		if (arr != null && arr[0] == paraName) {
		　　return arr[1];
		}
	　　}
	　　return "";
	}
	else {
	　　return "";
	}
}


function App() {
	//const testContext = {infoAis: InfoAisSample};
	//const context =  React.createContext()};
	//console.log(context);

 	var user = GetUrlParam("user");
	var number = GetUrlParam("number");
	var path = GetUrlParam("path");

	console.log(user)
	console.log(number)
	console.log(path)

	const currentDir = "/home/sharefolder/websiteFiles/Data/ProgramData/Dg/" + user + "/" + number + "/CT/" + path
	const jsonPath   = require("/home/sharefolder/websiteFiles/Data/ProgramData/Dg/" + user + "/" + number + "/CT/" + path + "/info_ais.json")
	console.log(jsonPath)

	const testContext = {infoAis: jsonPath, workingDir :currentDir};
	console.log(testContext)


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
