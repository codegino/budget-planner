import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import dateformat from 'dateformat';
import _ from 'lodash';

import DefaultInput from '../../components/input/DefaultInput';
import DefaultDatePicker from '../../components/datepicker/DefaultDatepicker';
import DefaultButton from '../../components/button/DefaultButton';
import { addExpenses, updateExpenses } from '../../store/actions/expenses';
import styles from './addUpdateItemStyle';
import DefaultPicker from '../../components/picker/DefaultPicker';
import { updateBudgetPlan } from '../../store/actions/budgetPlan';

type Props = {
  addExpenses: Function,
  updateExpenses: Function,
  item: {
    name: string,
    price: number,
    date: string,
    id: string,
    category: string,
  },
  categories: Function,
  navigator: Object,
  mode: string,
  getBudgetPlan: Function,
  updateBudgetPlan: Function,
};

class AddNewItemModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    if (props.mode === 'edit') {
      this.state = {
        name: props.item.name,
        price: props.item.price.toString(),
        date: props.item.date,
        mode: props.mode,
        category: props.item.category,
      };
    } else {
      const categories = this.props.categories(this.state.date.substring(3, 11));
      this.state.category = categories.length > 0 ? categories[0] : '';
    }
  }

  state = {
    name: '',
    price: '',
    date: dateformat(new Date(), 'dd-mmm-yyyy'),
    category: '',
    mode: 'add',
  }

  onNameChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      name: value,
    }));
  };

  onPriceChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      price: value,
    }));
  };

  onDateChangeHandler = (value) => {
    const categories = this.props.categories(value.substring(3, 11));
    this.setState(prevState => ({
      ...prevState,
      date: value,
      category: categories.length > 0 ? categories[0] : '',
    }));
  };

  onCategoryChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      category: value,
    }));
  };

  onAddItemHandler = () => {
    if (this.validate() === false) {
      return;
    }

    const item = {
      name: this.state.name,
      price: parseFloat(this.state.price),
      date: this.state.date,
      category: this.state.category,
    };

    const budgetPlan = this.props.getBudgetPlan(item.date.substring(3, 11), item.category);
    budgetPlan.expenses += item.price;
    this.props.updateBudgetPlan(budgetPlan);
    this.props.addExpenses(item);
  }

  onUpdateItemHandler = () => {
    if (this.validate() === false) {
      return;
    }

    const item = {
      name: this.state.name,
      price: parseFloat(this.state.price),
      date: this.state.date,
      category: this.state.category,
      id: this.props.item.id,
    };

    this.props.updateExpenses(item);

    const hasChangeInPrice = this.props.item.price !== item.price;
    const hasChangeInCategory = this.props.item.category !== item.category;

    if (hasChangeInCategory || hasChangeInPrice) {
      const date = item.date.substring(3, 11);

      const currentBudgetPlan = this.props.getBudgetPlan(date, item.category);

      if (this.props.item.category !== item.category) {
        const previousBudgetPlan = this.props.getBudgetPlan(date, this.props.item.category);
        previousBudgetPlan.expenses -= this.props.item.price;
        this.props.updateBudgetPlan(previousBudgetPlan);

        currentBudgetPlan.expenses += item.price;
      } else {
        currentBudgetPlan.expenses += (item.price - this.props.item.price);
      }

      this.props.updateBudgetPlan(currentBudgetPlan);
    }
  }

  validate = () => {
    if (this.state.name === '' || this.state.price === '') {
      return false;
    }

    if (this.state.category === undefined || this.state.category === '') {
      return false;
    }

    if (Number.isNaN(parseFloat(this.state.price))) {
      return false;
    }

    return true;
  }

  addNewCategory = () => {
    this.props.navigator.showModal({
      screen: 'expenses.AddUpdateBudgetPlanModal',
      title: 'Add new category',
      animationType: 'slide-up',
      passProps: { date: this.state.date.substring(3, 11) },
    });
  }

  render() {
    let submitButton = <DefaultButton title="Add" onPress={this.onAddItemHandler} />;

    if (this.state.mode === 'edit') {
      submitButton = <DefaultButton title="Update" onPress={this.onUpdateItemHandler} />;
    }

    let categoryPicker = (
      <TouchableNativeFeedback onPress={this.addNewCategory}>
        <View >
          <Text style={styles.addNewCategoryWrapper}>Click to add new BudgetPlan</Text>
        </View>
      </TouchableNativeFeedback>
    );

    if (this.props.categories(this.state.date.substring(3, 11)).length > 0) {
      categoryPicker = (
        <DefaultPicker
          items={this.props.categories(this.state.date.substring(3, 11))}
          selectedValue={this.state.category}
          onValueChange={this.onCategoryChangeHandler}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Name</Text>
            <DefaultInput value={this.state.name} onChangeText={this.onNameChangeHandler} placeholder="Enter item name" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Price</Text>
            <DefaultInput keyboardType="numeric" value={this.state.price} onChangeText={this.onPriceChangeHandler} placeholder="Enter price" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Category</Text>
            {categoryPicker}
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Date</Text>
            <DefaultDatePicker
              date={this.state.date}
              format="DD-MMM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.onDateChangeHandler}
            />
          </View>
        </View>
        <View style={styles.addButtonWrapper}>
          {this.validate() ? submitButton : null}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addExpenses: item => dispatch(addExpenses(item)),
  updateExpenses: item => dispatch(updateExpenses(item)),
  updateBudgetPlan: budgetPlan => dispatch(updateBudgetPlan(budgetPlan)),
});

const mapStateToProps = state => ({
  categories: date => _.map(
    _.filter(state.budgetPlan.budgetPlans, o => o.date === date),
    o => o.category,
  ),
  getBudgetPlan: (date, category) => _.find(state.budgetPlan.budgetPlans, { date, category }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewItemModal);
