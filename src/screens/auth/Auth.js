import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Login from './Login';
import Signup from './Signup';
import styles from './authStyle';
import DefaultButton from '../../components/button/DefaultButton';

type Props = {
  isLoading: boolean,
}

class AuthScreen extends Component<Props> {
  state = {
    mode: 'login',
    buttonTitle: 'Switch to signup',
  }

  onSwitchModeHandler = () => {
    this.setState(prevState => ({
      ...this.prevState,
      mode: prevState.mode === 'login' ? 'signup' : 'login',
      buttonTitle: prevState.mode === 'login' ? 'Switch to Login' : 'Switch to Signup',
    }));
  }

  render() {
    let layout = <Login />;

    if (this.state.mode === 'signup') {
      layout = <Signup />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {layout}
        </View>
        <View style={styles.footer}>
          <DefaultButton title={this.state.buttonTitle} onPress={this.onSwitchModeHandler} />
        </View>
        <Spinner visible={this.props.isLoading} textContent="Loading..." textStyle={{ color: 'white' }} />
      </View>);
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.loading,
});

export default connect(mapStateToProps)(AuthScreen);
