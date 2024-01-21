import React, { useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchSchools from "./SearchSchools";
import SchoolDetail from "./SchoolDetail";
import logo from "./assets/logo.png";

interface AppProps {}

const Stack = createStackNavigator();

interface AppState {
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    // Simulate an asynchronous loading task
    const fakeLoadingTask = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000); // Adjust loading duration as needed

    // Ensure the timer is cleared when the component is unmounted
    return () => clearTimeout(fakeLoadingTask);
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoading ? (
          // Display loading bar with a black background
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Image
              source={logo}
              style={{ width: 250, height: 250, marginBottom: 20 }}
            />
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          // Application has finished loading, display normal navigation
          <Stack.Navigator initialRouteName="SearchSchools">
            <Stack.Screen
              name="SearchSchools"
              component={SearchSchools}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SchoolDetail"
              component={SchoolDetail}
              options={{
                headerShown: true,
                headerTitle: "Details",
                headerBackTitle: "Retour",
                headerStyle: { backgroundColor: "black" },
                headerTintColor: "white",
                cardStyle: { backgroundColor: "black" },
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default App;
