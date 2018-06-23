import React from 'react';
import { View, Picker } from 'react-native';
import colors from '../../constants/colors';

const styles = {
  container: {
    borderColor: colors.primaryLight,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  categoryPicker: {
    backgroundColor: colors.primaryDark,
    color: 'white',
  },
};

type Props = {
  items: Array,
  selectedValue: string,
  onValueChange: Function,
};

const DefaultPicker = (props: Props) => {
  const pickerItems = props.items.map(i => (
    <Picker.Item key={i} label={i} value={i} />
  ));

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={props.selectedValue}
        style={styles.categoryPicker}
        onValueChange={props.onValueChange}
      >
        {pickerItems}
      </Picker>
    </View>
  );
};

export default DefaultPicker;
