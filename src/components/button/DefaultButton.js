import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: 50,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});

type Props = {
  style: Object,
  title: string,
};

const buttonWithBackground = (props: Props) => (
  <TouchableNativeFeedback {...props}>
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  </TouchableNativeFeedback>
);

export default buttonWithBackground;
