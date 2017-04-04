import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.react';
import Tweet from './Tweet.react';

export default class StreamTweet extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    };
  }

  componentWillMount() {
    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    // global object for demonstrations purposes ONLY!
    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  }

  componentDidMount() {

    // reference the DOM that represents your "StreamTweet" component with a React method
    // and pass it a reference to the current component (i.e. "StreamTweet")
    const componentDOMRepresentation = ReactDOM.findDOMNode(this);

    // reference the DOM tree that you can traverse and access its various properties
    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  }

  componentWillReceiveProps(nextProps) {
    const currentTweetLength = this.props.tweet.text.length;
    const nextTweetLength = nextProps.tweet.text.length;

    // compare the lengths of current and next tweet,
    // if next one is longer store result
    const numberOfCharactersIsIncreasing = (nextTweetLength > currentTweetLength);
    let headerText;

    // if next tweet is longer set the header to "Number of characters is increasing"
    if (numberOfCharactersIsIncreasing) {
      headerText = 'Number of characters is increasing';
    } else {
      headerText = 'Latest public photo from Twitter';
    }

    this.setState({
      numberOfCharactersIsIncreasing,
      headerText
    });

    window.snapterest.numberOfReceivedTweets++;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // only render if the next tweet is longer than 1 character
    return nextProps.tweet.text.length > 1;
  }

  // interact with the updated DOM and perform any post-render operations
  componentDidUpdate(prevProps, prevState) {
    window.snapterest.numberOfDisplayedTweets++;
  }

  // clean up any data created during the component's mounting or updating phases
  componentWillUnmount() {
    delete window.snapterest;
  }

  render() {
    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet
          tweet={this.props.tweet}
          onImageClick={this.props.onAddTweetToCollection}
        />
      </section>
    );
  }
}
