import React from 'react';
import { TextInput } from 'react-native';
import styles from './defaultInputStyle';
import colors from '../../constants/colors';

type Props = {
  style: Object,
};

const defaultInput = (props: Props) => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style: Object]}
    placeholderTextColor={colors.primaryLight}
  />
);

export default defaultInput;
