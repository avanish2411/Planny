import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './redux/myStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SafeAreaProvider>
          <PaperProvider>
            <RootNavigation />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;