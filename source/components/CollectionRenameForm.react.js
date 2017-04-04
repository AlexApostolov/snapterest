import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.react';
import Button from './Button.react';

const inputStyle = {
  marginRight: '5px'
};

// renders a form to change the collection name
class CollectionRenameForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
  }

  // initial collection's name from parent component
  componentWillMount() {
    this.setState({
      inputValue: this.props.name
    });
  }

  // pass value property string typed by user, then update state,
  // which in turn will re-render the <input> element with an updated value
  setInputValue(inputValue) {
    this.setState({
      inputValue
    });
  }

  handleInputValueChange(event) {
      const inputValue = event.target.value;
      this.setInputValue(inputValue);
  }

  // and pass it to the
  handleFormSubmit(event) {

    // cancel the "submit" event
    event.preventDefault();

    // then get the collection name from component's state
    const collectionName = this.state.inputValue;

    // and pass it to the "onChangeCollectionName" function in the parent "CollectionControls"
    this.props.onChangeCollectionName(collectionName);
  }

  handleFormCancel(event) {

    event.preventDefault();

    // get the original collection name that's passed as a property by parent "CollectionControls"
    const collectionName = this.props.name;

    // then pass it to "setInputValue" function

    this.setInputValue(collectionName);
    // and hide the collection controls

    this.props.onCancelCollectionNameChange();
  }

  // set focus on the input field so that the user can start editing the collection's name straightaway after component is mounted
  componentDidMount() {
    this.refs.collectionName.focus();
  }

  render() {
    return (

      // "form" element wraps 4 elements: one "Header" component, one "input" element, two "Button" components
      <form className="form-inline" onSubmit={this.handleFormSubmit.bind(this)}>

        <Header text="Collection name:" />

        // "value" property is set to a current value stored in the component's state
        // listen to user input with "onChange" property that references a method/handler
        // which in turn will re-render the input field with an updated value
        <div className="form-group">

          <input
            className="form-control"
            style={inputStyle}
            onChange={this.handleInputValueChange.bind(this)}
            value={this.state.inputValue}
            ref="collectionName"
          />
        </div>

          // submit form and change collection name
          <Button label="Change" onClick={this.handleFormSubmit.bind(this)} />

          // submit form without changing collection name
          <Button label="Cancel" onClick={this.handleFormCancel.bind(this)} />
      </form>
    );
  }
}

export default CollectionRenameForm;
