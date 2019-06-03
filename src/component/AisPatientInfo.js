// node_modules
import React from 'react';
// me
import './AisPatientInfo.css';
import AppContex from '../AppContext';

export default class AisPatientInfo extends React.Component {
  render() {
    return (
      <div className="AisPatientInfo">
        <table>
          <tbody>
            <tr>
              <td>Patient ID:</td>
              <td>{this.context.infoAis.Patient_ID}</td>
              <td>Gender:</td>
              <td>{this.context.infoAis.Patient_Gender}</td>
              <td>Affected side:</td>
              <td>{this.context.infoAis.Affected_Side}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{this.context.infoAis.Patient_Name}</td>
              <td>Scan time:</td>
              <td>{this.context.infoAis.Scan_Time}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

AisPatientInfo.contextType = AppContex; 