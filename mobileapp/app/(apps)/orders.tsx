import { useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIc, EmptyOrder } from "../../constant/icon";
import Header from "../../components/Header";
import OfferList from "../../components/OfferList";
import { productListCat } from "../../constant/static";

export default function Orders() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [170, 170],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={{
          height: headerHeight,
          width: "100%",
          backgroundColor: "#f07828ff",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          zIndex: 10,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        }}
      >
        <SafeAreaView className="w-full flex-col rounded-[20px] z-[3]">
          <Header />
          <View className="flex px-5">
            <TouchableOpacity
              className={`flex-row items-center border border-white bg-white rounded-[10px] gap-4 px-4 mb-0 ${
                Platform.OS === "ios" ? "h-[44px]" : "h-[48px]"
              }`}
            >
              <SearchIc />
              <Text className="text-gray-500 flex-1 font-nunitosans-semibold text-[15px]">
                Search here...
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 190, paddingBottom: 0 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full flex-col px-5">
          <View className="w-full mt-10 bg-white border border-gray-200 flex-col justify-center items-center rounded-[12px] px-4 py-8">
            <EmptyOrder size={54} color="#dddddd" />
            <Text className="text-[17px] text-gray-700 font-nunitosans-bold mb-2 mt-7">
              No order placed yet
            </Text>
            <Text className="text-[13px] text-gray-400 font-nunitosans-semibold">
              There is no order history available
            </Text>
            <Text className="text-[13px] text-gray-400 font-nunitosans-semibold">
              at this moment
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
