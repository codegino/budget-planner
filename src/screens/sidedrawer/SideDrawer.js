import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './sideDrawerStyle';
import { updateMonth } from '../../store/actions/expenses';
import { authLogout } from '../../store/actions/auth';
import colors from '../../constants/colors';
import MonthPicker from '../../components/datepicker/MonthPicker';

type Props = {
  updateMonth: Function,
  logout: Function,
  navigator: {
    toggleDrawer: Function,
  },
  selectedMonth: string,
};

const sideDrawer = (props: Props) => {
  const showAddNewitemModal = () => {
    Navigation.showModal({
      screen: 'expenses.AddUpdateItemModal',
      title: 'Add New Item',
      animationType: 'slide-up',
    });
  };

  const showAddEditBudgetPlanModal = () => {
    Navigation.showModal({
      screen: 'expenses.AddUpdateBudgetPlanModal',
      title: 'Add New BudgetPlan',
      animationType: 'slide-up',
      passProps: { date: props.selectedMonth },
    });
  };

  const onMonthChangeHandler = (value) => {
    props.updateMonth(value);
    props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'closed',
    });
  };

  const onLogoutHandler = () => {
    props.logout();
  };

  return (
    <View
      style={[
        styles.container,
        { width: Dimensions.get('window').width * 0.8 },
      ]}
    >
      <TouchableOpacity onPress={showAddNewitemModal}>
        <View style={styles.drawerItem}>
          <Icon
            name="plus-circle-outline"
            size={30}
            color={colors.primaryLight}
            style={styles.drawerItemIcon}
          />
          <Text style={styles.label}>Add Item</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={showAddEditBudgetPlanModal}>
        <View style={styles.drawerItem}>
          <Icon
            name="plus-circle-outline"
            size={30}
            color={colors.primaryLight}
            style={styles.drawerItemIcon}
          />
          <Text style={styles.label}>Add BudgetPlan</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[styles.drawerItem, { justifyContent: 'space-between' }]}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="calendar"
              size={30}
              color={colors.primaryLight}
              style={styles.drawerItemIcon}
            />
            <Text style={styles.label}>Change month</Text>
          </View>
          <View style={{ width: '50%' }}>
            <MonthPicker date={props.selectedMonth} onDateChange={onMonthChangeHandler} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogoutHandler}>
        <View style={styles.drawerItem}>
          <Icon
            name="logout"
            size={30}
            color={colors.primaryLight}
            style={styles.drawerItemIcon}
          />
          <Text style={styles.label}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  selectedMonth: state.expenses.selectedMonth,
});

const mapDispatchToProps = dispatch => ({
  updateMonth: month => dispatch(updateMonth(month)),
  logout: () => dispatch(authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
