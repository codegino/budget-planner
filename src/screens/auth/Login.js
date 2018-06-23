import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { authLogin } from '../../store/actions/auth';
import styles from './loginStyle';
import DefaultInput from '../../components/input/DefaultInput';
import DefaultButton from '../../components/button/DefaultButton';

type Props = {
  onLogin: Function,
}

class LoginScreen extends React.Component<Props> {
  state = {
    email: '',
    password: '',
  }

  onLoginHandler = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.onLogin(authData);
  }

  onChangeEmailHandler = (email) => {
    this.setState(prevState => ({
      ...prevState,
      email,
    }));
  };

  onChangePasswordHandler = (password) => {
    this.setState(prevState => ({
      ...prevState,
      password,
    }));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Email" value={this.state.email} onChangeText={this.onChangeEmailHandler} />
          <DefaultInput placeholder="Password" secureTextEntry value={this.state.password} onChangeText={this.onChangePasswordHandler} />
        </View>
        <DefaultButton title="Login" onPress={this.onLoginHandler} />
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: authData => dispatch(authLogin(authData)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
