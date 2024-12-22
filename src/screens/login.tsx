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

  // POST REQUEST

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
        // alert(` You have created: ${JSON.stringify(response.data)}`);
        navigation.navigate("Home");
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

  //PUT REQUEST
  //   const onSubmitFormHandler = (event) => {
  //     if (!fullName.trim() || !email.trim()) {
  //       alert("Name or Email is invalid");
  //       return;
  //     }
  //     setIsLoading(true);

  //     const configurationObject = {
  //       url: `${baseUrl}/api/users/2`,
  //       method: "PUT",
  //       data: { fullName, email },
  //     };

  //     axios(configurationObject)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           alert(` You have updated: ${JSON.stringify(response.data)}`);
  //           setIsLoading(false);
  //           setFullName("");
  //           setEmail("");
  //         } else {
  //           throw new Error("An error has occurred");
  //         }
  //       })
  //       .catch((error) => {
  //         alert("An error has occurred");
  //         setIsLoading(false);
  //       });
  //   };

  //DELETE REQUEST
  //   const onSubmitFormHandler = async (event) => {
  //     if (!fullName.trim() || !email.trim()) {
  //       alert("Name or Email is invalid");
  //       return;
  //     }
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.delete(`${baseUrl}/api/users/2`, {
  //         fullName,
  //         email,
  //       });
  //       if (response.status === 204) {
  //         alert(` You have deleted: ${JSON.stringify(response.data)}`);
  //         setIsLoading(false);
  //         setFullName("");
  //         setEmail("");
  //       } else {
  //         throw new Error("Failed to delete resource");
  //       }
  //     } catch (error) {
  //       alert("Failed to delete resource");
  //       setIsLoading(false);
  //     }
  //   };

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
            keyboardType="email-address"
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
    marginTop: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    borderRadius: 5,
    color: "#ffffff",
    height: 40,
  },
});

export default Login;
