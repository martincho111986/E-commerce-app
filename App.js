import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

//context api
import Auth from "./Context/store/Auth";

//redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navogators
import Main from "./Navigations/Main";

//Screen
import ProductContainer from "./screens/Products/ProductContainer";
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
