import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryDark,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    color: 'white',
  },
});

export default styles;
