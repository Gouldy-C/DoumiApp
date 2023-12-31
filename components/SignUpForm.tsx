import React from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import ControlledTextInput from "@components/ControlledTextInput";
import { signUpEmailPassword } from "@utils/auth/emailPasswordAuth";
import { userStore } from "@utils/stores/userStore";
import auth from "@react-native-firebase/auth";
import { checkAndCreateFirestoreUser } from "@utils/firestore/firestoreFunctions";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
const lowercaseRe = new RegExp(`[a-z]`);
const uppercaseRe = new RegExp(`[A-Z]`);
const numberRe = new RegExp(`[0-9]`);
const specialRe = new RegExp(`[!#$%&*+-.:;<=>?@^_]`);

function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { user, setUser } = userStore((state) => state);

  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(20)
        .regex(lowercaseRe, "Must contain a lowercase letter.")
        .regex(uppercaseRe, "Must contain a uppercase letter.")
        .regex(numberRe, "Must contain a number.")
        .regex(specialRe, "Must contain a special character."),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: FormData) => {
    await signUpEmailPassword(data.email, data.password);
  };

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        placeholder={"Email Address"}
        name={"email"}
        label={"Email"}
      />

      <View style={styles.passBox}>
        <ControlledTextInput
          control={control}
          placeholder={"Password"}
          name={"password"}
          label={"Password"}
          secureTextEntry={!passwordVisible}
        />
        <Pressable
          style={styles.passVisIcon}
          onPress={() => setPasswordVisible((prev) => !prev)}>
          {!passwordVisible ? (
            <Entypo name="eye" color={"black"} size={28} />
          ) : (
            <Entypo name="eye-with-line" color={"black"} size={28} />
          )}
        </Pressable>
      </View>

      <View style={styles.passBox}>
        <ControlledTextInput
          control={control}
          placeholder={"Confirm"}
          name={"confirmPassword"}
          label={"Confirm Password"}
          secureTextEntry={!passwordVisible}
        />
        <Pressable
          style={styles.passVisIcon}
          onPress={() => setPasswordVisible((prev) => !prev)}>
          {!passwordVisible ? (
            <Entypo name="eye" color={"black"} size={28} />
          ) : (
            <Entypo name="eye-with-line" color={"black"} size={28} />
          )}
        </Pressable>
      </View>

      <Pressable onPress={handleSubmit(submitData)}>
        <Text style={styles.button}>Sign Up</Text>
      </Pressable>
      <Text style={{ textAlign: "right", fontSize: 16, marginVertical: 15 }}>
        Need to Sign In -{" "}
        <Link href={"/(auth)/sign-in"} style={{ fontSize: 17, textDecorationLine: "underline" }}>
          Click Here
        </Link>
      </Text>
    </View>
  );
}

export default SignUpForm;

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  container: {
    width: "80%",
    marginVertical: 20,
    alignSelf: "center",
  },
  passBox: {
    position: "relative",
    marginVertical: 10,
  },
  passVisIcon: {
    position: "absolute",
    right: 0,
    top: -6,
    padding: 10,
  },
});
