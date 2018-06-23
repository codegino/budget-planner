import React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 2,
    flex: 1,
  },
  menuButton: {
    marginHorizontal: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    borderWidth: 1,
  },
  menuButtonText: {
    fontSize: 25,
  },
});

type Props = {
  onEdit: Function,
  onDelete: Function,
  onClose: Function,
};

const ItemSubMenu = (props: Props) => {
  const onYes = () => {
    props.onDelete();
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  };

  const onNo = () => {
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  };

  const onDeleteHandler = () => {
    Navigation.showModal({
      screen: 'expenses.ConfirmationModal',
      title: 'Confirm delete?',
      animationType: 'slide-up',
      passProps: { onYes, onNo },
    });
  };

  const menuButton = (color, label, icon, onPressHandler) => (
    <TouchableNativeFeedback onPress={onPressHandler}>
      <View style={[styles.menuButton, { borderColor: color }]}>
        <Text style={[styles.menuButtonText, { color }]}>{label}</Text>
        <Icon
          name={icon}
          size={40}
          color={color}
        />
      </View>
    </TouchableNativeFeedback>
  );
  return (
    <View style={styles.menu}>
      {menuButton(colors.primaryLight, 'Edit', 'pencil', props.onEdit)}
      {menuButton(colors.danger, 'Delete', 'delete', onDeleteHandler)}
      {menuButton(colors.warning, 'Close', 'close', props.onClose)}
    </View>
  );
};

export default ItemSubMenu;
