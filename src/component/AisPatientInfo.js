// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
// me
import './AisPatientInfo.css';
import AppContex from '../AppContext';

class AisPatientInfo extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div className="AisPatientInfo">
        <table>
          <tbody>
            <tr>
              <td>{t('Patient ID')}:</td>
              <td>{this.context.infoAis.Patient_ID}</td>
              <td>{t('Gender')}:</td>
              <td>{this.context.infoAis.Patient_Gender}</td>
              <td>{t('Affected side')}:</td>
              <td>{this.context.infoAis.Affected_Side}</td>
            </tr>
            <tr>
              <td>{t('Name')}:</td>
              <td>{this.context.infoAis.Patient_Name}</td>
              <td>{t('Scan time')}:</td>
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
export default withTranslation()(AisPatientInfo);