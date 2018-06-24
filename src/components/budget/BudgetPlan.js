import React, { PureComponent } from 'react';
import { Text, View, TouchableNativeFeedback, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import ItemSubMenu from '../../components/menu/ItemSubMenu';
import ProgressBar from './ProgressBar';
import colors from '../../constants/colors';
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
  budgetPlan: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetPlanWrapper: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryDark,
  },
  detailText: {
    fontSize: 15,
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

    const itemDetail = ({ item }) => (
      <View style={styles.itemDetail}>
        <Text style={[styles.detailText, { fontWeight: 'bold', width: '50%' }]}>{item.name}</Text>
        <Text style={[styles.detailText, { width: '20%' }]}>{item.price}</Text>
        <Text style={[styles.detailText, { width: '30%' }]}>{item.date}</Text>
      </View>
    );

    if (this.state.isExpanded) {
      details = (<FlatList
        data={this.props.budgetPlanItems(
          this.props.budgetPlan.date,
          this.props.budgetPlan.category,
        )}
        renderItem={itemDetail}
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

    let color = colors.success;
    let emoticon = <Icon name="emoticon-excited" size={50} color={color} />;

    const progress = (this.props.budgetPlan.expenses / this.props.budgetPlan.budget) * 100;

    if (progress >= 90) {
      color = colors.danger;
      emoticon = <Icon name="emoticon-dead" size={50} color={color} />;
    } else if (progress >= 70) {
      color = colors.warning;
      emoticon = <Icon name="emoticon-sad" size={50} color={color} />;
    } else if (progress >= 50) {
      color = colors.notify;
      emoticon = <Icon name="emoticon-neutral" size={50} color={color} />;
    }

    const content = (
      <View style={styles.container}>
        <View style={styles.budgetPlanWrapper}>
          <View style={styles.budgetPlan}>
            <View style={{ width: '90%', justifyContent: 'space-between' }}>
              <Text style={styles.label}>{this.props.budgetPlan.category}</Text>
              <ProgressBar
                numerator={this.props.budgetPlan.expenses}
                denominator={this.props.budgetPlan.budget}
                proress={progress}
                color={color}
              />
            </View>
            <View>
              {emoticon}
            </View>
          </View>
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
