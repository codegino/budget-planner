import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import dateformat from 'dateformat';

import DefaultInput from '../../components/input/DefaultInput';
import MonthPicker from '../../components/datepicker/MonthPicker';
import DefaultButton from '../../components/button/DefaultButton';
import { addBudgetPlan, updateBudgetPlan } from '../../store/actions/budgetPlan';
import styles from './addUpdateItemStyle';

type Props = {
  addBudgetPlan: Function,
  updateBudgetPlan: Function,
  budgetPlan: {
    category: string,
    budget: number,
    expenses: string,
    date: string,
    id: string,
  },
  date: string,
  mode: string,
}

class AddNewBudgetPlanModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    if (props.mode === 'edit') {
      this.state = {
        category: props.budgetPlan.category,
        budget: props.budgetPlan.budget.toString(),
        expenses: props.budgetPlan.expenses.toString(),
        date: props.budgetPlan.date,
        mode: props.mode,
      };
    } else {
      this.state.date = props.date;
    }
  }

  state = {
    category: '',
    budget: '',
    expenses: '0',
    date: dateformat(new Date(), 'mmm-yyyy'),
    mode: 'add',
  }

  onCategoryChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      category: value,
    }));
  };

  onBudgetChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      budget: value,
    }));
  };

  onDateChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      date: value,
    }));
  };

  onAddBudgetPlanHandler = () => {
    if (this.validate() === false) {
      return;
    }

    const budgetPlan = {
      category: this.state.category,
      budget: parseFloat(this.state.budget),
      expenses: parseFloat(this.state.expenses),
      date: this.state.date,
    };

    this.props.addBudgetPlan(budgetPlan);
  }

  onUpdateBudgetPlanHandler = () => {
    if (this.validate() === false) {
      return;
    }

    const budgetPlan = {
      category: this.state.category,
      budget: parseFloat(this.state.budget),
      date: this.state.date,
      expenses: parseFloat(this.state.expenses),
      id: this.props.budgetPlan.id,
    };

    this.props.updateBudgetPlan(budgetPlan);
  }

  validate = () => {
    if (this.state.category === '' || this.state.budget === '' || this.state.date === '') {
      return false;
    }

    if (
      Number.isNaN(parseFloat(this.state.budget)) ||
      Number.isNaN(parseFloat(this.state.expenses))) {
      return false;
    }

    return true;
  }

  render() {
    let submitButton = <DefaultButton title="Add" onPress={this.onAddBudgetPlanHandler} />;

    if (this.state.mode === 'edit') {
      submitButton = <DefaultButton title="Update" onPress={this.onUpdateBudgetPlanHandler} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Category</Text>
            <DefaultInput value={this.state.category} onChangeText={this.onCategoryChangeHandler} placeholder="Enter item name" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Budget</Text>
            <DefaultInput keyboardType="numeric" value={this.state.budget} onChangeText={this.onBudgetChangeHandler} placeholder="Enter budget" />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Date</Text>
            <MonthPicker date={this.state.date} onDateChange={this.onDateChangeHandler} />
          </View>
        </View>
        <View style={styles.addButtonWrapper}>
          {submitButton}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addBudgetPlan: item => dispatch(addBudgetPlan(item)),
  updateBudgetPlan: item => dispatch(updateBudgetPlan(item)),
});

export default connect(null, mapDispatchToProps)(AddNewBudgetPlanModal);
