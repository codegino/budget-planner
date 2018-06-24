import React, { PureComponent } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';

import ItemSubMenu from '../../components/menu/ItemSubMenu';
import colors from '../../constants/colors';
import BudgetPlanSummary from '../../components/budget/BudgetPlanSummary';
import BudgetPlanDetail from '../../components/budget/BudgetPlanDetail';
import { updateBudgetPlan, deleteBudgetPlan } from '../../store/actions/budgetPlan';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primaryDark,
    backgroundColor: colors.primary3,
    marginTop: 3,
    marginBottom: 3,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetPlanWrapper: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  bottom: {
    marginTop: 3,
    marginBottom: 3,
  },
  bottomText: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    color: 'white',
  },
});

type BudgetProps = {
  budgetPlan: {
    category: string,
    budget: number,
    expenses: number,
    date: string,
  },
  deleteBudgetPlan: Function,
  budgetPlanItems: Function,
}

class Budget extends PureComponent<BudgetProps> {
  state = {
    isMenuVisible: false,
    isExpanded: false,
  }

  onLongPressHandler = () => {
    this.setState(prevState => ({
      ...this.state,
      isMenuVisible: !prevState.isMenuVisible,
    }));
  }

  onEditItemHandler = () => {
    Navigation.showModal({
      screen: 'expenses.AddUpdateBudgetPlanModal',
      title: 'Update budget plan',
      animationType: 'slide-up',
      passProps: { budgetPlan: this.props.budgetPlan, mode: 'edit' },
    });

    this.setState(prevState => ({
      ...prevState,
      isMenuVisible: false,
    }));
  }

  onDeleteItemHandler = () => {
    const { budgetPlan } = this.props;
    this.props.deleteBudgetPlan(budgetPlan);

    this.setState(prevState => ({
      ...prevState,
      isMenuVisible: false,
    }));
  }

  onCloseHandler = () => {
    this.setState(() => ({
      ...this.state,
      isMenuVisible: false,
    }));
  }

  onToggleExpandHandler = () => {
    this.setState(prevState => ({
      ...prevState,
      isExpanded: !prevState.isExpanded,
    }));
  };


  render() {
    let menu = null;
    let details = null;

    const bottomText = this.state.isExpanded ? 'Show less' : 'Show more';

    if (this.state.isExpanded) {
      details = (<FlatList
        data={this.props.budgetPlanItems(
          this.props.budgetPlan.date,
          this.props.budgetPlan.category,
        )}
        renderItem={({ item }) => <BudgetPlanDetail item={item} />}
        keyExtractor={item => item.id}
      />);
    }

    if (this.state.isMenuVisible) {
      menu = (
        <ItemSubMenu
          onEdit={this.onEditItemHandler}
          onDelete={this.onDeleteItemHandler}
          onClose={this.onCloseHandler}
        />
      );
    }

    const content = (
      <View style={styles.container}>
        <View style={styles.budgetPlanWrapper}>
          <BudgetPlanSummary budgetPlan={this.props.budgetPlan} />
          {details}
          <TouchableNativeFeedback onPress={this.onToggleExpandHandler}>
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>{bottomText}</Text>
            </View>
          </TouchableNativeFeedback>
          {menu}
        </View>
      </View>
    );

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onLongPress={this.onLongPressHandler} >
          {content}
        </TouchableNativeFeedback>
      );
    }
    return <TouchableOpacity onLongPress={this.onLongPressHandler}>{content}</TouchableOpacity>;
  }
}

const mapStateToProps = state => ({
  budgetPlanItems: (month, category) => _.sortBy(_.filter(state.expenses.expenses, o => (
    month === o.date.substring(3, 11) && category === o.category
  )), 'date'),
});

const mapDispatchToProps = dispatch => ({
  deleteBudgetPlan: item => dispatch(deleteBudgetPlan(item)),
  updateBudgetPlan: budgetPlan => dispatch(updateBudgetPlan(budgetPlan)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Budget);
