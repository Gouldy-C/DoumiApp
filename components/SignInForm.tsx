import React from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, View, Text, Pressable, StyleSheet } from "react-native";


type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignInForm() {
  const [email, onChangeEmail] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [confirmPassword, onChangeConfirmPassword] = React.useState('')

  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("IT WORKED", data);
  };

  return (
    <View>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        {...register("email")}
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <Text style={styles.inputError}>{errors.email && errors.email.message}</Text>

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        
        {...register("password")}
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        keyboardType="visible-password"
        secureTextEntry={true}
      />
      <Text style={styles.inputError}>{errors.password && errors.password.message}</Text>

      <Text style={styles.inputLabel}>Confirm Password</Text>
      <TextInput
        {...register("confirmPassword")}
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm"
        keyboardType="visible-password"
        secureTextEntry={true}
      />
      <Text style={styles.inputError}>{errors.confirmPassword && errors.confirmPassword.message}</Text>

      <Pressable
        onPress={handleSubmit(submitData)}>
        <Text style={{fontSize: 20, margin: 10, padding: 10}}>Sign up</Text>
      </Pressable>
    </View>
  );
}

export default SignInForm;


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputError: {
    color: 'red'
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});