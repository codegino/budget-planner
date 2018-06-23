import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../constants/colors';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'menu' : 'menu', 30),
    Icon.getImageSource('calendar-today', 30),
    Icon.getImageSource('bank', 30),
  ]).then((sources) => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'expenses.MonthViewScreen',
          label: 'Month View',
          title: 'Month View',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[0],
                title: 'Menu',
                id: 'sideDrawerToggle',
              },
            ],
          },
        },
        {
          screen: 'expenses.BudgetViewScreen',
          label: 'Budget View',
          title: 'Budget View',
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[0],
                title: 'Menu',
                id: 'sideDrawerToggle',
              },
            ],
          },
        },
      ],
      drawer: {
        left: {
          screen: 'expenses.SideDrawer',
        },
      },
      tabsStyle: {
        tabBarSelectedButtonColor: colors.primaryLight,
        tabBarBackgroundColor: colors.primaryDark,
      },
      appStyle: {
        tabBarSelectedButtonColor: colors.primaryLight,
        tabBarBackgroundColor: colors.primaryDark,
      },
    });
  });
};

export default startTabs;
