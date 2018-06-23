import React from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultButton from '../../components/button/DefaultButton';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  onYes: Function,
  onNo: Function,
}

const ConfirmationModal = (props: Props) => (
  <View style={styles.container}>
    <DefaultButton title="Yes" onPress={props.onYes} />
    <DefaultButton title="No" onPress={props.onNo} />
  </View>
);

export default ConfirmationModal;
