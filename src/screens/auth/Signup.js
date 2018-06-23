import React from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { authSignup } from '../../../src/store/actions/auth';
import styles from './signupStyle';
import DefaultTextInput from '../../components/input/DefaultInput';
import DefaultButton from '../../components/button/DefaultButton';

type Props = {
  onSignup: Function,
}

class SignupScreen extends React.Component<Props> {
  componentWillMount() {
    this.resetState();
  }

  onSignupHandler = () => {
    if (this.state.password === this.state.confirmPassword) {
      const authData = {
        email: this.state.email,
        password: this.state.password,
      };

      this.props.onSignup(authData);
    } else {
      // TODO handle validation
    }
  }

  onEmailChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      email: value,
    }));
  }

  onPasswordChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      password: value,
    }));
  }

  onConfirmPasswordChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      confirmPassword: value,
    }));
  }

  resetState = () => {
    this.setState(() => ({
      email: '',
      password: '',
      confirmPassword: '',
    }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Signup</Text>
        <View style={styles.inputContainer}>
          <DefaultTextInput placeholder="Enter email address" value={this.state.email} onChangeText={this.onEmailChangeHandler} />
          <DefaultTextInput placeholder="Enter password" secureTextEntry value={this.state.password} onChangeText={this.onPasswordChangeHandler} />
          <DefaultTextInput placeholder="Repeat password" secureTextEntry value={this.state.confirmPassword} onChangeText={this.onConfirmPasswordChangeHandler} />
        </View>
        <DefaultButton title="Sign up" onPress={this.onSignupHandler} />
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSignup: authData => dispatch(authSignup(authData)),
});

export default connect(null, mapDispatchToProps)(SignupScreen);
