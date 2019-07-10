// node_modules
import React from 'react';
import { withTranslation } from 'react-i18next';
//
import './AisCta3DView.css';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

class AisCta3DView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imagePath = [
      this.props.imagePrefix, 
      this.props.roi, 
      this.props.imageName1
    ].join('/');
    imagePath = (this.props.invFlag ?
      [imagePath, 'inv', this.props.imageName2, this.props.index] :
      [imagePath, this.props.imageName2, this.props.index]).join('_');
    imagePath = imagePath + '.' + this.props.imageExtensionName;
    return (
      <div className="AisCta3DView">
        <img className="Img" src={imagePath} alt={imagePath}></img>
      </div>
    );
  }
}
AisCta3DView.contextType = AppContext;
AisCta3DView.ROI = {
  LEFT: 'left',
  BOTH: 'both',
  RIGHT: 'right',
};
AisCta3DView.defaultProps = {
  imagePrefix: 'CTA_Output',
  roi: AisCta3DView.ROI.BOTH,
  imageName1: 'cta',
  invFlag: false,
  imageName2: 'mip',
  index: 1,
  imageExtensionName: 'png'
};
AisCta3DView.propTypes = {
  imagePrefix: PropTypes.string,
  roi: PropTypes.string,
  imageName1: PropTypes.string,
  invFlag: PropTypes.bool,
  imageName2: PropTypes.string,
  index: PropTypes.number,
  imageExtensionName: PropTypes.string
};
const AisCta3DViewT = withTranslation()(AisCta3DView);
AisCta3DViewT.ROI = AisCta3DView.ROI;
export default AisCta3DViewT;