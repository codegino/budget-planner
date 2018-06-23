import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: colors.lightGray1,
    paddingHorizontal: 2,
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primaryDark,
    marginBottom: 2,
    borderColor: colors.primaryLight,
  },
  drawerItemIcon: {
    marginRight: 10,
  },
  label: {
    color: 'white',
  },
});
