import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const validateInput = () => {
    setErrors("");
    if (!email) {
      setErrors("Username is required");
      return false;
    }
    if (!password) {
      setErrors("Password is required");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Signing in");

    resetFields();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign Up" }} />

      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button
        text={loading ? "Creating Account..." : "Create Account"}
        onPress={signUpWithEmail}
        disabled={loading}
      />

      <Link href="/(auth)/sign-in" style={styles.textButton}>
        Sign In
      </Link>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
