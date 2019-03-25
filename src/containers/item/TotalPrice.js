import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import colors from '../../constants/colors';

const styles = {
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryLight,
    borderWidth: 3,
    paddingLeft: 5,
  },
  price: {
    color: 'white',
    fontSize: 40,
  },
};

type Props = {
  items: Array,
}

const totalPrice = (props: Props) => {
  const total = _.sumBy(props.items, 'price');
  const displayedTotal = Math.round(total * 100) / 100;

  return (
    <View style={styles.container}><Text style={styles.price}>Total: {displayedTotal}</Text></View>
  );
};

export default totalPrice;
