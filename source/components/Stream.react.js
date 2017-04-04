import React from 'react';
import StreamTweet from './StreamTweet.react';
import Header from './Header.react';
import SnapkiteStreamClient from 'snapkite-stream-client';

class Stream extends React.Component {
  constructor() {
    super();
    this.state = {
      tweet: null
    };
  }

  componentDidMount() {
    SnapkiteStreamClient.initializeStream(this.handleNewTweet.bind(this));
  }

  componentWillUnmount() {
    SnapkiteStreamClient.destroyStream();
  }

  handleNewTweet(tweet) {
    // take "tweet" object and set it as a new value for the component state's "tweet" property
    // "tweet" comes from "SnapkiteStreamClient" object in "componentDidMount"
    this.setState({
      tweet
    });
  }

  render() {
    const {tweet} = this.state;

    // check whether "tweet" variable has a reference to an actual "tweet" object
    // if so render "StreamTweet" component, else only "Header" component
    if (tweet) {
      return (
        <StreamTweet
          tweet={tweet}
          onAddTweetToCollection={this.props.onAddTweetToCollection}
        />
      );
    }

    return (
      <Header text="Waiting for public photos from Twitter..." />
    );
  }
}

export default Stream;
