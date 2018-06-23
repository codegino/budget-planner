import React from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderColor: colors.primary1,
    borderWidth: 1,
    backgroundColor: colors.primaryDark,
    overflow: 'hidden',
  },
});

const customStyles = {
  dateInput: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryLight,
    overflow: 'hidden',
  },
  dateText: {
    color: 'white',
  },
  dateTouchBody: {
    backgroundColor: colors.primaryDark,
  },
};

type Props = {
  date: string,
  confirmBtnText: string,
  cancelBtnText: string,
  onDateChange: Function,
}

const DefaultDatepicker = (props: Props) => (
  <DatePicker
    style={styles.container}
    date={props.date}
    mode="date"
    placeholder="select date"
    format="DD-MMM-YYYY"
    customStyles={customStyles}
    {...props}
  />
);

export default DefaultDatepicker;
