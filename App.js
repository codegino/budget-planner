import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import AuthScreen from './src/screens/auth/Auth';
import HomeScreen from './src/screens/home/Home';
import MonthViewScreen from './src/screens/tracker/MonthViewScreen';
import BudgetViewScreen from './src/screens/tracker/BudgetViewScreen';
import SideDrawer from './src/screens/sidedrawer/SideDrawer';
import AddUpdateBudgetPlanModal from './src/screens/modals/AddUpdateBudgetPlanModal';
import AddUpdateItemModal from './src/screens/modals/AddUpdateItemModal';
import ConfirmationModal from './src/screens/modals/ConfirmationModal';
import configureStore from './src/store/configureStore';
import startApplication from './src/services/startApplication';

const store = configureStore();

// Register Screens
Navigation.registerComponent('expenses.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('expenses.HomeScreen', () => HomeScreen);
Navigation.registerComponent('expenses.MonthViewScreen', () => MonthViewScreen, store, Provider);
Navigation.registerComponent('expenses.BudgetViewScreen', () => BudgetViewScreen, store, Provider);
Navigation.registerComponent('expenses.SideDrawer', () => SideDrawer, store, Provider);

// Register Modals
Navigation.registerComponent('expenses.AddUpdateItemModal', () => AddUpdateItemModal, store, Provider);
Navigation.registerComponent('expenses.AddUpdateBudgetPlanModal', () => AddUpdateBudgetPlanModal, store, Provider);
Navigation.registerComponent('expenses.ConfirmationModal', () => ConfirmationModal);

// Start App
startApplication();
