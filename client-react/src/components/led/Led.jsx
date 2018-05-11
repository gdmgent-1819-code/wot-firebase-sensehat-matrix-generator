import React, { Component } from 'react';

import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

import PropTypes from 'prop-types';

import './Led.css';

class Led extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    this.props.onClick(this.props.id, this.props.on, `(${ this.state.color.r },${ this.state.color.g },${ this.state.color.b })`);
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      'default': {
        swatch: {
          padding: '5px',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } className="Led" onClick={(ev) => this.handleClick(ev) }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }
      </div>
    );
  }
}

Led.propTypes = {
  color: PropTypes.string,
  id: PropTypes.number,
  on: PropTypes.bool,
  onClick: PropTypes.func
}

export default Led;
