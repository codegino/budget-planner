import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProgressBar from './ProgressBar';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  label: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  budgetPlan: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type BudgetPlanSummaryProps = {
  budgetPlan: {
    expenses: number,
    budget: number,
    category: string,
  },
}

const BudgetPlanSummary = (props: BudgetPlanSummaryProps) => {
  let color = colors.success;
  let emoticon = <Icon name="emoticon-excited" size={50} color={color} />;

  const progress = (props.budgetPlan.expenses / props.budgetPlan.budget) * 100;

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

  const numerator = Math.round(props.budgetPlan.expenses * 100) / 100;
  const denominator = Math.round(props.budgetPlan.budget * 100) / 100;

  return (
    <View style={styles.budgetPlan}>
      <View style={{ width: '90%', justifyContent: 'space-between' }}>
        <Text style={styles.label}>{props.budgetPlan.category}</Text>
        <ProgressBar
          numerator={numerator}
          denominator={denominator}
          proress={progress}
          color={color}
        />
      </View>
      <View>
        {emoticon}
      </View>
    </View>
  );
};

export default BudgetPlanSummary;
