import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";

export type AppStackRoutesParamList = {
  SignIn: undefined;
  home: { currentUser: string };
};

const { Screen, Navigator } =
  createNativeStackNavigator<AppStackRoutesParamList>();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
