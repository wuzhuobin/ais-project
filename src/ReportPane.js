// node_modules
import React from 'react';
// me
import reportPDF from './asset/I am pdf en-us.pdf';
import './ReportPane.css'
export default class ReportPane extends React.Component {
  render() {
    return (
      <embed className="ReportPane" src={reportPDF}></embed>
    );
  }
}