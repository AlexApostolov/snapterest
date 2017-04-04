import React from 'react';

const tweetStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '300px',
  height: '400px',
  margin: '10px'
};

const imageStyle = {
  maxHeight: '400px',
  boxShadow: '0px 1px 1px 0px #aaa',
  border: '1px solid #fff'
};

class Tweet extends React.Component {
  handleImageClick() {
    const {tweet, onImageClick} = this.props;

    if (onImageClick) {
      onImageClick(tweet);
    }
  }

  render() {
    const {tweet} = this.props;
    const tweetMediaUrl = tweet.media[0].url;

    return (
      <div style={tweetStyle}>
        <img src={tweetMediaUrl} onClick={this.handleImageClick.bind(this)} style={imageStyle} />
      </div>
    );
  }
}

Tweet.propTypes = {

  // custom validator function for "tweet"
  tweet(properties, propertyName, componentName) {
    const tweet = properties[propertyName];

    if (!tweet) {
      return new Error('Tweet must be set!');
    }

    // assume the "tweet" property is an object
    // check if it is missing the "media" property
    if (!tweet.media) {
      return new Error('Tweet must have an image.');
    }
  },

  // React validator function to check that "onImageClick" is function
  onImageClick: React.PropTypes.func
};

export default Tweet;
