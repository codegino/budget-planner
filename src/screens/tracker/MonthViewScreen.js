import React, { PureComponent } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import dateformat from 'dateformat';

import { fetchExpenses, updateMonth } from '../../store/actions/expenses';
import TotalPrice from '../../components/item/TotalPrice';
import RoundAddButton from '../../components/button/RoundAddButton';
import styles from './monthViewScreenStyle';
import ItemsForEachDay from '../../components/item/ItemsForEachDay';

type Props = {
  navigator: Function,
  fetchExpenses: Function,
  expenses: Array,
  isLoading: boolean,
  changeMonthView: Function,
}

class MonthViewScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.changeMonthView(dateformat(new Date(), 'mmm-yyyy'));
    this.props.fetchExpenses();
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        });
      }
    }
  };

  onButtonPressHandler = () => {
    this.props.navigator.showModal({
      screen: 'expenses.AddUpdateItemModal',
      title: 'Add new item',
      animationType: 'slide-up',
    });
  }

  render() {
    const dailyExpenses = [];
    _.forEach(this.props.expenses, (item) => {
      const expenses = _.find(dailyExpenses, o => o.date === item.date);
      if (expenses) {
        expenses.list.push(item);
      } else {
        dailyExpenses.push({
          date: item.date,
          list: [item],
        });
      }
    });

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <FlatList
            data={dailyExpenses}
            renderItem={({ item }) => <ItemsForEachDay items={item} />}
            keyExtractor={item => item.date}
            contentContainerStyle={styles.dayItems}
          />
          <View style={styles.totalPrice}>
            <TotalPrice items={this.props.expenses} />
          </View>
        </ScrollView>
        <View style={styles.floatingButton}>
          <RoundAddButton onPress={this.onButtonPressHandler} size={50} />
        </View>
        <Spinner visible={this.props.isLoading} textContent="Loading..." textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  expenses: _.reverse(_.sortBy(_.filter(state.expenses.expenses, o => (
    state.expenses.selectedMonth === dateformat(new Date(o.date), 'mmm-yyyy')
  )), 'date')),
  isLoading: state.ui.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchExpenses: () => dispatch(fetchExpenses()),
  changeMonthView: month => dispatch(updateMonth(month)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthViewScreen);
