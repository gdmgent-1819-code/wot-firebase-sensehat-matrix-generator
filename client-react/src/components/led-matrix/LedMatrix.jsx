import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import reactCSS from 'reactcss';

/*
State management via Redux
*/
import { connect } from 'react-redux';
import { fetchMatrices, fetchMatrixById, updateMatrix } from '../../actions';


import './LedMatrix.css';

import Led from '../led';

class LedMatrix extends Component {
  static contextTypes = {
    matrix: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      pickedColor: null,
      matrix: {
        nCols: (this.props.nCols)?this.props.nCols:8,
        nRows: (this.props.nRows)?this.props.nRows:8,
        ledOffColor: (this.props.ledOffColor)?this.props.ledOffColor:'(0,0,0)',
        pattern: this.generateDefaultPattern((this.props.nCols)?this.props.nCols:8, (this.props.nRows)?this.props.nRows:8, (this.props.ledOffColor)?this.props.ledOffColor:'(0,0,0)')
      }
    }
  }

  generateDefaultPattern = (nRows, nCols, ledOffColor) => {
    const pattern = [];
    for (let r = 0; r < nRows; r++) {
      for(let c = 0; c < nCols; c++) {
        pattern.push(ledOffColor);
      }
    }
    return pattern;
  }

  componentWillMount() {
    this.props.fetchMatrices().then(data => console.log(data));
    this.props.fetchMatrixById('2eUypCyuAFOY6Kt0rM3k');
  }

  onLedClick = (ledId, ledOn, ledColor) => {
    const matrix = this.state.matrix;
    matrix.pattern[parseInt(ledId)] = (ledOn)?ledColor:matrix.ledOffColor;
    this.setState({
      matrix: matrix
    });
    const obj = {
      id: '2eUypCyuAFOY6Kt0rM3k',
      pattern: this.state.matrix.pattern
    }
    this.props.updateMatrix(obj);
  }

  generateMatrix = () => {
    const leds = [];
    for (let r = 0; r < this.state.matrix.nRows; r++) {
      for(let c = 0; c < this.state.matrix.nCols; c++) {
        leds.push(<Led key={ c + this.state.matrix.nRows * r } id={ c + this.state.matrix.nRows * r } on={true} color="rgba(255,0,0,1)" onClick={ (ledId, ledOn, ledColor) => this.onLedClick(ledId, ledOn, ledColor) }></Led>);
      }
    }
    return leds;
  }

  render() {
    const styles = reactCSS({
      'default': {
        ledmatrix: {
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${this.state.matrix.nCols}, 1fr)`,
          gridGap: '2px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.ledmatrix } >
          { this.generateMatrix() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    matrices: state.firebase.matrices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMatrices: () => dispatch(fetchMatrices()),
    fetchMatrixById: (id) => dispatch(fetchMatrixById(id)),
    updateMatrix: (obj) => dispatch(updateMatrix(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LedMatrix);
