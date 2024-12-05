import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Platform,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
const baseUrl = "https://reqres.in";

const Login = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeNameHandler = (fullName) => {
    setFullName(fullName);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onSubmitFormHandler = async (event) => {
    if (!fullName.trim() || !email.trim()) {
      alert("Name or Email is invalid");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/users`, {
        fullName,
        email,
      });

      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFullName("");
        setEmail("");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#252526" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {isLoading ? (
            <Text style={styles.formHeading}> Creating resource </Text>
          ) : (
            <Text style={styles.formHeading}>Create new user</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={fullName}
            editable={!isLoading}
            onChangeText={onChangeNameHandler}
          />
        </View>
        <View style={{ height: 20 }}></View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={onChangeEmailHandler}
          />
        </View>
        <View>
          <Button
            title="Submit"
            onPress={onSubmitFormHandler}
            disabled={isLoading}
          />
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
          navigation.navigate("Home");
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
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  formHeading: {
    color: "#ffffff",
    fontSize: 20,
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    borderRadius: 20,
    color: "#ffffff",
  },
});

export default Login;
