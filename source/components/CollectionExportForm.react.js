import React from 'react';

const formStyle = {
  display: 'inline-block'
};

class CollectionExportForm extends React.Component {
  render() {
    return (
      <form action="http://codepen.io/pen/define" method="POST" target="_blank" style={formStyle}>
        // input that is hidden from user and its value is set to an HTML markup string from parent component
        <input type="hidden" name="data" value={this.props.htmlMarkup} />
        // only element in this form visible to user, when clicked a collection is submitted to CodePen.io that is opened in a new window
        <button type="submit" className="btn btn-default">Export as HTML</button>
      </form>
    );
  }
}

export default CollectionExportForm;
