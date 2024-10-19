import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://6459b1e995624ceb21edb04a.mockapi.io/api/tranchibao/users";
const INITIAL_SUBMIT_STATE = {
  email: "bewchan06@gmail.com",
  password: "",
};

const Screen01 = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submit, setSubmit] = useState(INITIAL_SUBMIT_STATE);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error", "Không thể lấy dữ liệu người dùng. Vui lòng thử lại sau.");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    const { email, password } = submit;
    if (!email || !password) {
      alert("Lỗi rỗng", "vui lòng điền vào chỗ trống");
      // Alert.alert("Lỗi rỗng", "vui lòng điền vào chỗ trống");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("lỗi sai email ", "Vui lòng nhập địa chỉ email hợp lệ");
      // Alert.alert("lỗi sai email ", "Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      navigation.navigate("Screen02");
    } else {
      alert("Lỗi đăng nhập", "Email hoặc mật khẩu không hợp lệ.");
      // Alert.alert("lỗi sai email ", "Vui lòng nhập địa chỉ email hợp lệ");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require("../assets/Data/icon.png")} />
          <Text style={styles.title}>Hello Again!</Text>
          <Text style={styles.subtitle}>Log into your account</Text>

          <View style={styles.inputContainer}>
            <Pressable style={styles.inputBox}>
              <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="#c6c9d1"
                style={[styles.textInput, {outline: "none"}]}
                value={submit.email}
                onChangeText={text => setSubmit({ ...submit, email: text })}
                accessibilityLabel="Email input"
              />
            </Pressable>
            <Pressable style={styles.inputBox}>
              <Image source={require("../assets/Data/lock.png")} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#c6c9d1"
                style={[styles.textInput, {outline: "none"}]}
                value={submit.password}
                onChangeText={text => setSubmit({ ...submit, password: text })}
                secureTextEntry={!isPasswordVisible}
                accessibilityLabel="Password input"
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Image source={require("../assets/Data/eye.png")} />
              </TouchableOpacity>
            </Pressable>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider}></View>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Image source={require("../assets/Data/google.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/Data/face.png")} />
 </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/Data/apple.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#c6c9d1",
  },
  inputContainer: {
    marginTop: 30,
    gap: 16,
    width: "100%",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderColor: "#c6c9d1",
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
  },
  forgotPassword: {
    color: "#519ca6",
    textAlign: "right",
  },
  continueButton: {
    marginTop: 20,
    height: 40,
    width: "100%",
    backgroundColor: "#00bdd6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  dividerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#c6c9d1",
  },
  orText: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
});

export default Screen01;
