import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';
import colors from '../../constants/colors';

const styles = {
  container: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  wrapper: {
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    borderColor: colors.primary1,
    borderWidth: 2,
    height: '100%',
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: 'white',
  },
  date: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  entries: {
    color: 'white',
    fontSize: 15,
  },
};

type Props = {
  items: Array,
}

const DailyTotalPrice = (props: Props) => {
  const total = _.sumBy(props.items, 'price');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.date}>{props.items[0].date}</Text>
        <Text style={styles.entries}>Entries: {props.items.length}</Text>
        <Text style={styles.price}>Total: {total}</Text>
      </View>
    </View>
  );
};

export default DailyTotalPrice;
