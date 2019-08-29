// node_modules
import React, { Component } from 'react';
import 'antd/dist/antd.css';

//
import './App.css';
import AisPageHeader from './component/AisPageHeader';
import AisPatientInfo from './component/AisPatientInfo';
import AisOnlineViewer from './AisOnlineViewer';
import InfoAisSample from './info_ais_sample.json';
import AppContext from './AppContext';

class App extends Component {
	constructor() {
		super();
		this.state = { testContext: { infoAis: InfoAisSample, workingDir: "" } };
	}

	async componentWillMount() {
		var user = this.GetUrlParam("user");
		var path = this.GetUrlParam("path");

		console.log(user)
		console.log(path)

		const currentDir = "http://file.accubraintx.com/ais/" + user + "/" + path
		const jsonPath = "http://file.accubraintx.com/ais/" + user + "/" + path + "/info_ais.json"
		console.log(jsonPath)


		const json = await fetch(jsonPath)
			.then(response => response.json());

		this.setState({ testContext: { infoAis: json, workingDir: currentDir } });
		console.log(json)
	}

	GetUrlParam(paraName) {
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


	render() {
		return (
			<div className="App"><AppContext.Provider value={this.state.testContext}>
				<AisPageHeader></AisPageHeader>
				<AisPatientInfo></AisPatientInfo>
				<AisOnlineViewer></AisOnlineViewer>
			</AppContext.Provider></div>
		);
	}

}


App.contexType = AppContext;
export default App;
