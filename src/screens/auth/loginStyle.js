import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: colors.primary1,
    borderBottomWidth: 2,
  },
});

export default styles;
