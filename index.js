import React, { Component } from 'react';
import { Animated, StyleSheet, Easing, View, ToastAndroid } from 'react-native';


export default class HSNZ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeRender: true,
      scrollValue: null,
    }
    this.isPlay = false;
    this.width = null;
    this.contentWidth = null;
    this.startWaiting = true;
    this.direction = "rtl";
    this.speed = 40;
    this.animation = null;
    this.loop = 1;
    this.content = this.props.children;
    this.isAminEnded = true;
    this.puaseWaiting = false;
    this.stopWaiting = false;
    this.reUpdate = this.reUpdate.bind(this)
  }



  start() {
    this.startWaiting = true;
    if (this.startWaiting && this.width != null && this.contentWidth != null) {
      this.startAnim();
    }
  }



  puase() {
    if (this.isPlay) {
      this.isAminEnded = false;
      this.animation.stop();
      this.isPlay = false;
    }
  }


  //doesn't works
  stop() {
    if (this.isPlay) {
      this.animation.stop();
      this.setState({ scrollValue: -this.contentWidth });
      this.isPlay = false;
    }
  }


  reUpdate(){
    if (this.props.autoPlay == false) {
      this.startWaiting = false;
    }
    if (this.props.direction == "ltr") {
      this.direction = "ltr";
    } else if (this.props.direction == "ttb") {
      this.direction = "ttb"
    } else if (this.props.direction == "btt") {
      this.direction = "btt"
    }
    if (this.props.speed != null) {
      this.speed = this.props.speed;
    }
    if (this.props.loop != null) {
      this.loop = this.props.loop;
    }
  }


  resume() {
    if (this.animation != null&&!this.isPlay) {
      this.animation.start(() => { this.end() });
      this.isPlay = true;
    }
    this.isAminEnded = true;
  }


  end() {
    if (this.isAminEnded) {
      if (this.loop >= 0) this.loop--;
      if (this.loop > 0 || this.loop == -1) {
        this.startAnim();
      } else {
        this.props.onEnd();
      }
    }
  }



  setContent(content) {
    this.content = content;
  }


  parentLayout(e) {
    if (this.width == null) {
      if (this.direction == "rtl" || this.direction == "ltr") {
        this.width = e.nativeEvent.layout.width;
      } else {
        this.width = e.nativeEvent.layout.height;
      }
    }
    if (this.width != null && this.contentWidth != null && this.startWaiting) {
      this.startAnim();
    }
  }


  contentLayout(e) {
    if (this.contentWidth == null) {
      if (this.direction == "rtl" || this.direction == "ltr") {
        this.contentWidth = e.nativeEvent.layout.width;
      } else {
        this.contentWidth = e.nativeEvent.layout.height;
      }
    }
    if (this.width != null && this.contentWidth != null && this.startWaiting) {
      this.startAnim();
    }
  }



  startAnim() {
    this.setState({ fakeRender: false, scrollValue: new Animated.Value(-this.contentWidth) }, () => {
      this.animation = Animated.timing(this.state.scrollValue, { toValue: this.width, easing: Easing.linear, duration: (this.width + this.contentWidth) * this.speed })
      this.animation.start(() => { this.end() });
    });
    this.isPlay = true;
  }

  render() {
    this.reUpdate();
    return (
      <View
        style={[this.props.style, { position: 'relative', overflow: 'hidden' }]}
        onLayout={this.parentLayout.bind(this)}>
        {this.state.fakeRender &&
          <View style={{ position: 'absolute', opacity: 0 }}
            onLayout={this.contentLayout.bind(this)}
          >
            {this.content}
          </View>
        }
        {!this.state.fakeRender && this.direction == "rtl" &&
          <Animated.View
            style={{ position: 'absolute', right: this.state.scrollValue }}
          >
            {this.content}
          </Animated.View>
        }
        {!this.state.fakeRender && this.direction == "ltr" &&
          <Animated.View
            style={{ position: 'absolute', left: this.state.scrollValue }}
          >
            {this.content}
          </Animated.View>
        }
        {!this.state.fakeRender && this.direction == "ttb" &&
          <Animated.View
            style={{ position: 'absolute', top: this.state.scrollValue }}
          >
            {this.content}
          </Animated.View>
        }
        {!this.state.fakeRender && this.direction == "btt" &&
          <Animated.View
            style={{ position: 'absolute', bottom: this.state.scrollValue }}
          >
            {this.content}
          </Animated.View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
