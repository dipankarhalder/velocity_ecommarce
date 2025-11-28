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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { pathItem } from "../../constant/routes";
import { auth_bg } from "../../constant/static";
import { Phone } from "../../constant/icon";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required.")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits."),
});

type LoginFormInputs = {
  phone: string;
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorPhone, setErrorPhone] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      if (data.phone === "9038716512") {
        router.replace({
          pathname: pathItem.otp as any,
          params: { phone: data.phone },
        });
      } else {
        setErrorPhone(
          `The user is not found with this phone no - ${data.phone}`
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            source={auth_bg}
            resizeMode="cover"
            className="absolute top-0 left-0 right-0 h-[54%] flex items-start justify-center px-8"
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
              <Text className="text-white text-4xl mb-1 font-nunitosans-bold">
                Welcome back
              </Text>
              <Text className="text-white text-2xl font-nunitosans-semibold">
                Login to Continue
              </Text>
            </View>
          </ImageBackground>

          {/* Form Container */}
          <View className="absolute bottom-0 left-0 right-0 px-8 pt-6 bg-white h-[60%] rounded-[36px] z-[3]">
            <View className="flex-1 items-center justify-start bg-white">
              <Text className="text-gray-700 text-[20px] mt-2 mb-1 font-nunitosans-bold w-full leading-tight">
                Let&#39;s get you signed in.
              </Text>
              <Text className="text-[#FF0000] w-full text-[13px] mt-0 mb-3 font-nunitosans-medium leading-tight">
                Please enter your phone no to continue.
              </Text>

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
                    <Text className="text-[16px] text-black font-nunitosans-semibold">
                      +91
                    </Text>
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={10}
                      value={value}
                      onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, "");
                        onChange(numericText);
                      }}
                      className="flex-1 text-black font-nunitosans-semibold text-[16px]"
                      placeholderTextColor="#999"
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text className="text-red-500 font-nunitosans-semibold text-sm mt-1 w-full">
                  {errors.phone.message}
                </Text>
              )}

              {errorPhone && (
                <Text className="text-red-700 font-nunitosans-semibold text-sm mt-1 w-full">
                  {errorPhone}
                </Text>
              )}

              {/* Submit Button */}
              <View className="absolute bottom-[110px] w-full px-[70px]">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid || loading}
                  className={`py-[12px] rounded-lg items-center ${
                    isValid && !loading ? "bg-[#FF0000]" : "bg-gray-300"
                  }`}
                  style={{
                    shadowColor: isValid && !loading ? "#FF0000" : "#cccccc",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.4,
                    shadowRadius: 4.65,
                    elevation: 8,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white text-[16px] font-nunitosans-bold">
                      Continue
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              {/* <View className="absolute bottom-[54px] w-full flex-row justify-center">
                <Text className="text-gray-500 text-md font-nunitosans-semibold">
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(pathItem.register as any)}
                >
                  <Text className="text-[#FF0000] text-md underline font-nunitosans-bold">
                    Create an account
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
