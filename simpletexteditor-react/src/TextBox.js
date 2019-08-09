import React, { Component } from 'react';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    var str = event.target.value;
    document.getElementById("characters").innerHTML = str.replace(/\s/g, "").length + " characters";
    document.getElementById("wordcount").innerHTML = str.split(/\s/g).filter(function(w){ return w !== '' }).length + " words";
  }

  render(){
    return (
      <textarea class="textbox" value={this.state.value} onChange={this.handleChange} >
      </textarea>
    );
  }
}

export default TextBox;
