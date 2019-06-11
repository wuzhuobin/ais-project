// node_modules
import React from 'react';
//

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

var user = GetUrlParam("user");
var number = GetUrlParam("number");
var path = GetUrlParam("path");

console.log(user)
console.log(number)
console.log(path)

var currentDir = "/home/sharefolder/websiteFiles/Data/ProgramData/Dg/" + user + "/" + number + "/CT/" + path
var jsonPath   = "/home/sharefolder/websiteFiles/Data/ProgramData/Dg/" + user + "/" + number + "/CT/" + path + "/info_ais.json"
console.log(jsonPath)

export default React.createContext({
  infoAis: jsonPath,
  workingDir: currentDir
});