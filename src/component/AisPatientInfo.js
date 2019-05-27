// node_modules
import React from 'react';
// me
import './AisPatientInfo.css';

export default class AisPatientInfo extends React.Component {
  render() {
    return (
      <table className="AisPatientInfo">
        <tbody>
          <tr>
            <td>Patient ID:</td>
            <td>A123456</td>
            <td>Gender:</td>
            <td>M</td>
            <td>Affected side:</td>
            <td>left</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>Chai Tai Man</td>
            <td>Scan time:</td>
            <td>May 14 2019 11:26</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
};