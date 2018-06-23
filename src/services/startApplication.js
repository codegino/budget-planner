import configureStore from '../../src/store/configureStore';
import { authAutoLoginStart } from '../../src/store/actions/auth';

import firebase from '../services/firebase';

const store = configureStore();

function startApplication() {
  firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(authAutoLoginStart(user));
  });
}

export default startApplication;
