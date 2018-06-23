import React, { Component } from 'react';
import { Text, View, Modal, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import dateformat from 'dateformat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../constants/colors';
import styles from './monthPickerStyle';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

type MonthPickerProps = {
  date: string,
  onDateChange: Function,
}

class MonthPicker extends Component<MonthPickerProps> {
  constructor(props) {
    super(props);
    if (props.date) {
      this.state.date = props.date;
    }
  }

  state = {
    isPickerVisible: false,
    date: dateformat(new Date(), 'mmm-yyyy'),
    pickerMonth: dateformat(new Date(), 'mmm'),
    pickerYear: parseInt(dateformat(new Date(), 'yyyy'), 10),
  }

  onChangeDateHandler = (month) => {
    const date = `${month}-${this.state.pickerYear}`;
    this.props.onDateChange(date);
    this.setState(prevState => ({
      ...prevState,
      pickerMonth: date.substring(0, 3),
      pickerYear: date.substring(4, 9),
      date,
      isPickerVisible: false,
    }));
  };

  toggleMonthPicker = () => {
    this.setState(prevState => ({
      ...prevState,
      isPickerVisible: !prevState.isPickerVisible,
      date: this.props.date,
      pickerMonth: this.props.date.substring(0, 3),
      pickerYear: parseInt(this.props.date.substring(4, 9), 10),
    }));
  };

  updatePickerYear = (change) => {
    this.setState(prevState => ({
      ...prevState,
      pickerYear: prevState.pickerYear + change,
    }));
  }

  render() {
    let monthPicker = null;

    const isSelected = month => this.state.pickerMonth === month;

    const displayMonths = months.map(month => (
      <TouchableNativeFeedback key={month} onPress={() => this.onChangeDateHandler(month)}>
        <View style={[styles.monthWrapper, isSelected(month) ? styles.selectedWrapper : null]}>
          <Text
            style={[styles.month, isSelected(month) ? styles.selectedMonth : null]}
          >{month}
          </Text>
        </View>
      </TouchableNativeFeedback>
    ));

    if (this.state.isPickerVisible) {
      monthPicker = (
        <Modal
          animationType="fade"
          transparent
          visible={this.state.isPickerVisible}
          onRequestClose={() => {
            this.toggleMonthPicker();
          }}
        >
          <TouchableWithoutFeedback onPress={this.toggleMonthPicker}>
            <View style={styles.modal}>
              <TouchableWithoutFeedback>
                <View style={styles.datePickerWrapper}>
                  <View style={styles.yearSection}>
                    <TouchableNativeFeedback onPress={() => this.updatePickerYear(-1)}>
                      <Icon
                        name="arrow-left-bold-box"
                        size={70}
                        color={colors.primaryDark}
                      />
                    </TouchableNativeFeedback>
                    <Text style={styles.yearLabel}>{this.state.pickerYear}</Text>
                    <TouchableNativeFeedback onPress={() => this.updatePickerYear(1)}>
                      <Icon
                        name="arrow-right-bold-box"
                        size={70}
                        color={colors.primaryDark}
                      />
                    </TouchableNativeFeedback>
                  </View>
                  <View style={styles.monthSection}>
                    {displayMonths}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
    return (
      <View>
        <View style={styles.container}>
          <TouchableNativeFeedback onPress={this.toggleMonthPicker}>
            <View style={styles.dateDisplayWrapper}>
              <Text>{this.state.date}</Text>
              <Icon
                name="calendar"
                size={30}
                color={colors.primaryDark}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        {monthPicker}
      </View>
    );
  }
}

export default MonthPicker;
