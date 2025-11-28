import { View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Back } from "../../constant/icon";

export default function ExtraLayout() {
  const router = useRouter();

  return (
    <>
      <View className="absolute top-[60px] left-[20px] z-10">
        <TouchableOpacity
          className="bg-[#FF0000] w-[36px] h-[36px] rounded-full flex-row justify-center items-center"
          onPress={() => router.back()}
        >
          <Back size={20} />
        </TouchableOpacity>
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
