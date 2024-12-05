import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

const baseUrl = "https://reqres.in";

function User({ userObject }) {
  return (
    <View>
      <Image
        source={{ uri: userObject.avatar }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Text
        style={{ textAlign: "center", fontSize: 20 }}
      >{`${userObject.first_name} ${userObject.last_name}`}</Text>
    </View>
  );
}

const UserScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  const ChangeUserIdHandler = () => {
    setUserId((userId) => (userId === 10 ? 1 : userId + 1));
  };

  useEffect(() => {
    const abortController = new AbortController();
    const url = `${baseUrl}/api/users/${userId}`;
    console.log("Fetching data for user with id: ", userId);
    console.log("fetching data for user with user", user);

    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(url, {
          signal: abortController.signal,
        });

        if (response.status === 200) {
          setUser(response.data.data);
          setIsLoading(false);

          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => abortController.abort("Data fetching cancelled");
  }, [userId]);

  return (
    <View
      style={{
        flexGrow: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {!isLoading && !hasError && user && <User userObject={user} />}
        </View>
        <View style={styles.wrapperStyle}>
          {isLoading && <Text> Loading </Text>}
          {!isLoading && hasError && <Text> An error has occurred </Text>}
        </View>
        <View>
          <TouchableHighlight
            onPress={ChangeUserIdHandler}
            disabled={isLoading}
            style={styles.buttonStyles}
          >
            <Text style={styles.textStyles}>Get New User</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#aaa",
          padding: 10,
          borderRadius: 5,
          marginTop: 30,
          alignSelf: "center",
          marginBottom: 20,
        }}
        onPress={() => {
          navigation.navigate("login");
        }}
      >
        <Text>Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    backgroundColor: "dodgerblue",
  },
  textStyles: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});

export default UserScreen;
