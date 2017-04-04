import React, { Component } from 'react';
import Tweet from './Tweet.react';

const listStyle = {
  padding: '0'
};

const listItemStyle = {
  display: 'inline-block',
  listStyle: 'none'
};

class TweetList extends Component {
  getListOfTweetIds() {
    return Object.keys(this.props.tweets);
  }

  getTweetElement(tweetId) {
    const tweet = this.props.tweets[tweetId];

    // store property passed by a parent "Collection" component
    const handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
    let tweetElement;

    // if the "this.props.onRemoveTweetFromCollection" property is provided
    // by a "Collection" component
    // create a "Tweet" component with an "onImageClick" property
    if (handleRemoveTweetFromCollection) {
      tweetElement = (
        <Tweet
          tweet={tweet}
          onImageClick={handleRemoveTweetFromCollection}
        />
      );
    } else {
      tweetElement = (
        <Tweet tweet={tweet} />
      );
    }

    // Once "Tweet" element is created and put into "tweetElement" variable
    // then return the <li> element with an inline style
    return <li style={listItemStyle} key={tweet.id}>{tweetElement}</li>;
  }

  render() {
    // first, create a list of "Tweet" elements
    // "this.getListOfTweetIds()" method returns an array of tweet IDs
    // then create a "Tweet" component for each tweet ID by calling the map() method
    // and pass the "this.getTweetElement" method as a callback function
    const tweetElements = this.getListOfTweetIds().map(this.getTweetElement.bind(this));
    
    return (
      <ul listStyle={listStyle}>
        {tweetElements}
      </ul>
    );
  }
}

export default TweetList;
