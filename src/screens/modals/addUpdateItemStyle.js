import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray2,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  fieldWrapper: {
    width: '100%',
  },
  addButtonWrapper: {
    width: '80%',
    margin: 20,
  },
  categoryPicker: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryLight,
    borderRadius: 10,
    borderWidth: 1,
    color: 'white',
  },
  label: {
    fontSize: 20,
  },
  addNewCategoryWrapper: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryDark,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    fontSize: 25,
    color: 'white',
  },
});

export default styles;
