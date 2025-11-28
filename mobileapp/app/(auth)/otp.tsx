import { useState, useRef, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { useAuthStore } from "../../store/auth";

const schema = yup.object().shape({
  otp1: yup.string().required(),
  otp2: yup.string().required(),
  otp3: yup.string().required(),
  otp4: yup.string().required(),
});

type FormInputs = {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
};

export default function Otp() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpError, setOtpError] = useState("");

  const { control, handleSubmit } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (value: string, index: number, onChange: any) => {
    const numeric = value.replace(/[^0-9]/g, "");
    onChange(numeric);

    if (numeric && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (!numeric && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const onSubmit = async (data: FormInputs) => {
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;

    try {
      setLoading(true);
      setOtpError("");

      if (otp !== "1234") {
        setOtpError("Incorrect OTP. Please try again.");
        return;
      }

      const fakeToken = "demotoken1234alwaysnew";

      await login(fakeToken);
      router.replace(pathItem.home as any);
    } catch (error) {
      console.error("OTP Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
                Input 4 digits
              </Text>
              <Text className="text-white text-2xl font-nunitosans-semibold">
                OTP Validation
              </Text>
            </View>
          </ImageBackground>

          {/* Form Container */}
          <View className="absolute bottom-0 left-0 right-0 px-8 pt-6 bg-white h-[60%] rounded-[36px] z-[3]">
            <View className="flex-1 items-center justify-start bg-white">
              <Text className="text-gray-700 text-[18px] mt-2 mb-1 font-nunitosans-bold w-full leading-tight">
                Sent a 4-digit code
              </Text>
              <Text className="text-[#FF0000] w-full text-[13px] mt-1 mb-10 font-nunitosans-medium leading-tight">
                Please enter the OTP sent to{" "}
                {phone ? `+91-${phone}` : "your number"}.
              </Text>

              {/* OTP Inputs */}
              <View className="flex-col w-full  mb-8">
                <View className="flex-row justify-center gap-5 w-full px-0 mb-2">
                  {["otp1", "otp2", "otp3", "otp4"].map((field, index) => (
                    <Controller
                      key={field}
                      control={control}
                      name={field as keyof FormInputs}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          ref={inputRefs[index]}
                          value={value}
                          onChangeText={(val) =>
                            handleChange(val, index, onChange)
                          }
                          keyboardType="number-pad"
                          maxLength={1}
                          className={`w-14 h-14 border ${otpError ? "border-red-500" : "border-gray-300"} rounded-[10px] text-black text-center font-nunitosans-semibold text-[16px]`}
                        />
                      )}
                    />
                  ))}
                </View>

                {/* Error message */}
                {otpError ? (
                  <Text className="text-red-500 text-sm mb-3 w-full text-center">
                    {otpError}
                  </Text>
                ) : null}
              </View>

              <View className="mb-4">
                <Text className="text-gray-800 text-sm font-nunitosans-bold">
                  Demo OTP: 1234
                </Text>
              </View>

              {/* Resend OTP Section */}
              <View className="flex-row justify-center items-center mb-8">
                {timer > 0 ? (
                  <Text className="text-gray-500 text-sm">
                    Resend code in {timer}s
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setTimer(30);
                      setOtpError("");
                      // Optionally: resend OTP API call here
                      console.log("OTP resent to", phone);
                    }}
                  >
                    <Text className="text-[#FF0000] font-nunitosans-bold underline text-sm">
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Submit Button */}
              <View className="absolute bottom-[80px] w-full px-[70px]">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                  className={`py-[12px] rounded-lg items-center ${
                    loading ? "bg-gray-300" : "bg-[#FF0000]"
                  }`}
                  style={{
                    shadowColor: !loading ? "#FF0000" : "#cccccc",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.4,
                    shadowRadius: 4.65,
                    elevation: 8,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-bold text-lg">
                      Verify OTP
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
