import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
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

type BudgetPlanDetailProps = {
  item: {
    name: string,
    price: number,
    date: string,
  },
}

const BudgetPlanDetail = (props: BudgetPlanDetailProps) => (
  <View style={styles.itemDetail}>
    <Text style={[styles.detailText, { fontWeight: 'bold', width: '50%' }]}>
      {props.item.name}
    </Text>
    <Text style={[styles.detailText, { width: '20%' }]}>
      {props.item.price}
    </Text>
    <Text style={[styles.detailText, { width: '30%' }]}>
      {props.item.date}
    </Text>
  </View>
);

export default BudgetPlanDetail;
