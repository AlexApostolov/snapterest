import React from 'react';
import Header from './Header.react';
import Button from './Button.react';
import CollectionRenameForm from './CollectionRenameForm.react';
import CollectionExportForm from './CollectionExportForm.react';

class CollectionControls extends React.Component {
  constructor() {
    super();
    // a collection has a name, by default, it's "new" and users can change it,
    // so a re-render will require storing it in the state object
    this.state = {
      name: 'new',
      // by default don't show form to change collection name but collection control elements instead
      isEditingName: false
    };
  }

  // returns a string for a header based on number of tweets in collection
  // with a tree of React elements that encapsulate that string
  getHeaderText() {
    const {numberOfTweetsInCollection} = this.props;
    // "text" variable stores integer value of tweets in a collection
    let text = numberOfTweetsInCollection;

    // concatenate a string to the "text" based on what that integer value is
    if (numberOfTweetsInCollection === 1) {
      text += ' tweet in your';
    } else {
      text += ' tweets in your';
    }

    return (
      <span>
        {text} <strong>{this.state.name}</strong> collection
      </span>
    );
  }

  // called when user clicks on the Rename/Cancel buttons
  // to show/hide collection's name editing form
  toggleEditCollectionName() {
    this.setState({
      // set "isEditingName" to the opposite of its current Boolean value
      isEditingName: !this.state.isEditingName
    });
  }

  // update the collection's name and hide a form to edit the collection name
  // called when user submits a new collection name
  setCollectionName(name) {
    this.setState({
      name,
      // update state to to hide form
      isEditingName: false
    });
  }

  render() {
    // if "isEditingName" set to true, then return "CollectionRenameForm"
    if (this.state.isEditingName) {
      return (
        <CollectionRenameForm
          name={this.state.name}
          onChangeCollectionName={this.setCollectionName.bind(this)}
          onCancelCollectionNameChange={this.toggleEditCollectionName.bind(this)}
        />
      );
    }

    return (
      <div>
        // call to the "getHeaderText" function instead of passing text string directly
        <Header text={this.getHeaderText()} />

        <Button
          label="Rename collection"
          handleClick={this.toggleEditCollectionName.bind(this)}
        />

        <Button
          label="Empty collection"
          handleClick={this.props.onRemoveAllTweetsFromCollection}
        />

        <CollectionExportForm htmlMarkup={this.props.htmlMarkup} />
      </div>
    );
  }
}

export default CollectionControls;
