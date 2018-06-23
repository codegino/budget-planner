import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 5,
    backgroundColor: colors.lightGray1,
  },
  content: {
    width: '100%',
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  totalPrice: {
    width: '100%',
    paddingHorizontal: 5,
  },
  dayItems: {
    paddingHorizontal: 5,
    width: '100%',
  },
});

export default styles;
