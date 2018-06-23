import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import _ from 'lodash';

import { deleteExpenses } from '../../store/actions/expenses';
import { updateBudgetPlan } from '../../store/actions/budgetPlan';
import ItemSubMenu from '../../components/menu/ItemSubMenu';
import styles from './itemDisplayStyle';

type Props = {
  item: {
    name: string,
    price: number,
    date: string,
    category: string,
  },
  deleteExpenses: Function,
  getBudgetPlan: Function,
  updateBudgetPlan: Function,
};

class ItemDisplay extends React.Component<Props> {
  state = {
    isMenuVisible: false,
  }

  onPressHandler = () => {
    // TODO add viewing of individual item
  }

  onLongPressHandler = () => {
    this.setState(prevState => ({
      ...this.state,
      isMenuVisible: !prevState.isMenuVisible,
    }));
  }

  onEditItemHandler = () => {
    Navigation.showModal({
      screen: 'expenses.AddUpdateItemModal',
      title: 'Update item',
      animationType: 'slide-up',
      passProps: { item: this.props.item, mode: 'edit' },
    });

    this.setState(prevState => ({
      ...prevState,
      isMenuVisible: false,
    }));
  }

  onDeleteItemHandler = () => {
    const { item } = this.props;
    this.props.deleteExpenses(item);

    const budgetPlan = this.props.getBudgetPlan(item.date.substring(3, 11), item.category);
    budgetPlan.expenses -= item.price;
    this.props.updateBudgetPlan(budgetPlan);

    this.setState(prevState => ({
      ...prevState,
      isMenuVisible: false,
    }));
  }

  onCloseHanlder = () => {
    this.setState(() => ({
      ...this.state,
      isMenuVisible: false,
    }));
  }

  render() {
    let menu = null;

    if (this.state.isMenuVisible) {
      menu = (
        <ItemSubMenu
          onEdit={this.onEditItemHandler}
          onDelete={this.onDeleteItemHandler}
          onClose={this.onCloseHanlder}
        />
      );
    }
    return (
      <TouchableNativeFeedback onPress={this.onPressHandler} onLongPress={this.onLongPressHandler}>
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <View style={styles.inline}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{this.props.item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.inline}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{this.props.item.price.toString()}</Text>
              </View>
              <View style={styles.inline}>
                <Text style={styles.label}>Category:</Text>
                <Text style={styles.value}>{this.props.item.category}</Text>
              </View>
            </View>
            {menu}
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteExpenses: item => dispatch(deleteExpenses(item)),
  updateBudgetPlan: budgetPlan => dispatch(updateBudgetPlan(budgetPlan)),
});

const mapStateToProps = state => ({
  getBudgetPlan: (date, category) => _.find(state.budgetPlan.budgetPlans, { date, category }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemDisplay);
