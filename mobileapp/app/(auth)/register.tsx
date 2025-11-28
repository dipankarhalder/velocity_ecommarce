import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { pathItem } from "../../constant/routes";
import { splash_banner_image_data } from "../../constant/static";
import { Eye, CloseEye, Phone, Email, User } from "../../constant/icon";

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    .required("Phone number is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    router.replace({
      pathname: pathItem.otp as any,
      params: {
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-1 bg-black">
          {/* Banner Section */}
          <ImageBackground
            source={splash_banner_image_data.splash_image_7}
            resizeMode="cover"
            className="absolute top-0 left-0 right-0 h-[52%] flex items-start justify-center px-8"
          >
            <LinearGradient
              colors={["transparent", "#000000"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                position: "absolute",
                bottom: 60,
                left: 0,
                right: 0,
                height: 310,
                zIndex: 1,
              }}
            />
            <View className="relative z-[2]">
              <Text className="text-white text-2xl mb-3 font-nunitosans-semibold">
                Hey there!
              </Text>
              <Text className="text-white text-4xl font-nunitosans-bold">
                Create your account
              </Text>
            </View>
          </ImageBackground>

          {/* Form Container */}
          <View className="absolute bottom-0 left-0 right-0 px-8 pt-6 bg-white h-[66%] rounded-[36px] z-[3]">
            <View className="flex-1 items-center justify-start bg-white">
              <Text className="text-gray-700 text-[18px] mt-2 mb-1 font-nunitosans-bold w-full leading-tight">
                Let&#39;s get started!{" "}
              </Text>
              <Text className="text-[#ff8d08] w-full text-[13px] mt-1 mb-3 font-nunitosans-medium leading-tight">
                Kindly take a moment to fill in the following details to help us
                proceed.
              </Text>

              {/* Name Field */}
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`flex-row items-center border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-[10px] gap-4 px-4 mt-4 ${
                      Platform.OS === "ios" ? "h-[46px]" : "h-[50px]"
                    }`}
                  >
                    <User />
                    <TextInput
                      placeholder="Full name"
                      value={value}
                      onChangeText={onChange}
                      className="flex-1 text-black font-nunitosans-semibold text-[16px]"
                      placeholderTextColor="#999"
                    />
                  </View>
                )}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm mt-1 w-full">
                  {errors.name.message}
                </Text>
              )}

              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`flex-row items-center border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-[10px] gap-4 px-4 mt-4 ${
                      Platform.OS === "ios" ? "h-[46px]" : "h-[50px]"
                    }`}
                  >
                    <Email />
                    <TextInput
                      placeholder="Email address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      className="flex-1 text-black font-nunitosans-semibold text-[16px]"
                      placeholderTextColor="#999"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1 w-full">
                  {errors.email.message}
                </Text>
              )}

              {/* Phone Field */}
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`flex-row items-center border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-[10px] gap-4 px-4 mt-4 ${
                      Platform.OS === "ios" ? "h-[46px]" : "h-[50px]"
                    }`}
                  >
                    <Phone />
                    <TextInput
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={value}
                      onChangeText={(text) =>
                        onChange(text.replace(/[^0-9]/g, ""))
                      }
                      className="flex-1 text-black font-nunitosans-semibold text-[16px]"
                      placeholderTextColor="#999"
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text className="text-red-500 text-sm mt-1 w-full">
                  {errors.phone.message}
                </Text>
              )}

              {/* Password Field */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View
                    className={`flex-row items-center border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-[10px] gap-4 px-4 mt-4 ${
                      Platform.OS === "ios" ? "h-[46px]" : "h-[50px]"
                    }`}
                  >
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <CloseEye /> : <Eye />}
                    </TouchableOpacity>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      className="flex-1 text-black font-nunitosans-semibold text-[16px]"
                      placeholderTextColor="#999"
                    />
                  </View>
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1 w-full">
                  {errors.password.message}
                </Text>
              )}

              {/* Submit Button */}
              <View className="absolute bottom-[110px] w-full px-[50px]">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  className={`py-[12px] rounded-lg items-center ${
                    isValid ? "bg-[#ff8d08]" : "bg-gray-300"
                  }`}
                  style={{
                    shadowColor: isValid ? "#ff8d08" : "#cccccc",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.4,
                    shadowRadius: 4.65,
                    elevation: 8,
                  }}
                >
                  <Text className="text-white text-[16px] font-nunitosans-bold">
                    Create an account
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Already have account */}
              <View className="absolute bottom-[54px] w-full flex-row justify-center">
                <Text className="text-gray-500 text-md font-nunitosans-semibold">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(pathItem.login as any)}
                >
                  <Text className="text-[#ff8d08] text-md underline font-nunitosans-bold">
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
