import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();
import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="signin" component={SignIn} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
