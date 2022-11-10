import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
export default class ButtonPrimary extends Component {
  render() {
    return (
      <Button
        size={this.props.size}
        onClick={() => {this.props.onClick()}}
        variant= "contained"
        color={this.props.color}
        disabled={this.props.disabled}
        startIcon={this.props.startIcon}>
       
        {this.props.text}
      </Button>
    )
  }
}
  