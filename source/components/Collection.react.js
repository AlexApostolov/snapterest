import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import CollectionControls from './CollectionControls.react';
import TweetList from './TweetList.react';
import Header from './Header.react';

// Collection component is responsible for rendering
// 1) tweets that a user has collected
// 2) user interface control elements for manipulating that collection
class Collection extends Component {
  createHtmlMarkupStringOfTweetList() {

    // create a string that represents the HTML markup created by rendering the "TweetList" component
    // pass the "TweetList" component as an argument
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.props.tweets} />
    );

    // then create an object with an "html" property that references your "htmlString" variable
    const htmlMarkup = {
      html: htmlString
    };

    // Finally convert your "htmlMarkup" object to a JSON string
    // the result of which is what "createHtmlMarkupStringOfTweetList" function returns
    return JSON.stringify(htmlMarkup);
    }

  getListOfTweetIds() {
    return Object.keys(this.props.tweets);
  }

  getNumberOfTweetsInCollection() {
    // return an array of tweet IDs, and then the length of that array
    return this.getListOfTweetIds().length;
  }

  render() {
    const numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

    // if collection is not empty, then render the "CollectionControls" and "TweetList" compoents
    // otherwise, render the "Header" component
    if (numberOfTweetsInCollection > 0) {
      const {tweets} = this.props;
      const htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      const removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection.bind(this);
      const handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection.bind(this);

      return (
        <div>
          // A component which renders a header with a collection name
          // and a set of buttons that allow users to rename, empty, and export a collection
          <CollectionControls
            numberOfTweetsInCollection={numberOfTweetsInCollection}
            htmlMarkup={htmlMarkup}
            onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection}
          />

          <TweetList
            tweets={tweets}
            onRemoveTweetFromCollection={handleRemoveTweetFromCollection}
          />
        </div>
      );
    }

    return (
      <Header text="Your collection is empty." />
    );
  }
}

export default Collection;
