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
              <td><label className="l1">{t('Patient ID')}:</label></td>
              <td>{this.context.infoAis.Patient_ID}</td>
              <td><label className="l2">{t('Gender')}:</label></td>
              <td>{this.context.infoAis.Patient_Gender}</td>
              <td><label className="l2">{t('Age')}:</label></td>
              <td>{this.context.infoAis.Patient_Age}</td>
            </tr>
            <tr>
              <td><label className="l4">{t('Name')}:</label></td>
              <td>{this.context.infoAis.Patient_Name}</td>
              <td><label className="l5">{t('Scan time')}:</label></td>
              <td>{this.context.infoAis.Scan_Time}</td>
              {/* <td><label className="l3">{t('Acute Cerebrovascular Lesion Side')}:</label></td> */}
              {/* <td>{t(this.context.infoAis.Affected_Side)}</td> */}
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