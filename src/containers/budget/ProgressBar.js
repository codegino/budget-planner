import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryDark,
    borderWidth: 2,
    borderRadius: 5,
    padding: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    width: '100%',
  },
  progress: {
    minHeight: 20,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  labelWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

type ProgressBarProps = {
  numerator: number,
  denominator: number,
}

const ProgressBar = (props: ProgressBarProps) => {
  const progress = (props.numerator / props.denominator) * 100;

  let color = colors.success;
  let textColor = 'white';

  if (progress >= 90) {
    color = colors.danger;
    textColor = colors.darkGray3;
  } else if (progress >= 70) {
    color = colors.warning;
    textColor = colors.darkGray2;
  } else if (progress >= 50) {
    color = colors.notify;
    textColor = colors.darkGray2;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
      <View style={styles.labelWrapper}>
        <Text style={[styles.label, { color: textColor }]}>
          {props.numerator}/{props.denominator}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
