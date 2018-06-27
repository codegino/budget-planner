import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import _ from 'lodash';
import dateformat from 'dateformat';
import Spinner from 'react-native-loading-spinner-overlay';

import { fetchBudgetPlan } from '../../store/actions/budgetPlan';
import { updateMonth } from '../../store/actions/expenses';
import Budget from '../../containers/budget/BudgetPlan';
import colors from '../../constants/colors';

type Props = {
  navigator: Function,
  fetchBudgetPlan: Function,
  budgetPlans: Array,
  isLoading: boolean,
  changeMonthView: Function,
}

const styles = {
  container: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.lightGray1,
  },
};

class BudgetViewScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.changeMonthView(dateformat(new Date(), 'mmm-yyyy'));
    this.props.fetchBudgetPlan();
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

  render() {
    return (
      <View contentContainerStyle={styles.content}>
        <FlatList
          data={this.props.budgetPlans}
          renderItem={({ item }) => <Budget budgetPlan={item} />}
          keyExtractor={item => item.id}
        />
        <Spinner visible={this.props.isLoading} textContent="Loading..." textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  budgetPlans: _.sortBy(_.filter(state.budgetPlan.budgetPlans, o => (
    state.expenses.selectedMonth === dateformat(new Date(`01-${o.date}`), 'mmm-yyyy')
  )), 'date'),
  isLoading: state.ui.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchBudgetPlan: () => dispatch(fetchBudgetPlan()),
  changeMonthView: month => dispatch(updateMonth(month)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetViewScreen);
