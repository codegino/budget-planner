import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
  },
  dateDisplayWrapper: {
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerWrapper: {
    width: '100%',
    height: 300,
    justifyContent: 'space-between',
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    padding: 10,
  },
  yearSection: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderColor: colors.lightGray1,
    borderWidth: 1,
  },
  yearLabel: {
    fontSize: 40,
  },
  monthSection: {
    height: 200,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  monthWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: '25%',
    backgroundColor: 'white',
    borderColor: colors.lightGray1,
    borderWidth: 1,
  },
  month: {
    fontSize: 20,
  },
  selectedWrapper: {
    backgroundColor: colors.primaryDark,
  },
  selectedMonth: {
    color: 'white',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  pickerFooter: {
    width: '100%',
  },
});

export default styles;
