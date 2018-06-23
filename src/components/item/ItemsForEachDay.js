import React, { PureComponent } from 'react';
import { View, Text, TouchableNativeFeedback, FlatList } from 'react-native';
import ItemDisplay from './ItemDisplay';
import DailyTotalExpenses from './DailyTotalExpenses';
import colors from '../../constants/colors';

const styles = {
  container: {
    width: '100%',
    borderColor: colors.primary1,
    backgroundColor: colors.primary2,
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  bottom: {
    marginBottom: 5,
  },
  bottomText: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    color: 'white',
  },
};

type Props = {
  items: Array,
}

class ItemsForEachDay extends PureComponent<Props> {
  state = {
    isExpanded: false,
  }

  onToggleExpandHandler = () => {
    this.setState(prevState => ({
      ...prevState,
      isExpanded: !prevState.isExpanded,
    }));
  };

  render() {
    let items = null;

    if (this.state.isExpanded) {
      items = (<FlatList
        data={this.props.items.list}
        renderItem={({ item }) => <ItemDisplay item={item} />}
        keyExtractor={item => item.id}
      />);
    }

    const bottomText = this.state.isExpanded ? 'Show less' : 'Show more';

    return (
      <View style={styles.container}>
        <DailyTotalExpenses items={this.props.items.list} />
        {items}
        <TouchableNativeFeedback onPress={this.onToggleExpandHandler}>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>{bottomText}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ItemsForEachDay;
