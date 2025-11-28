import { useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIc } from "../../constant/icon";
import Header from "../../components/Header";
import OfferList from "../../components/OfferList";
import { productListCat } from "../../constant/static";

export default function Categories() {
  const router = useRouter();
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
        <View className="w-full flex-col mb-[40px] px-5">
          <View className="w-full mb-3">
            <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
              Popular Categories
            </Text>
          </View>
          <View className="flex-row flex-wrap w-full gap-6 mb-[30px]">
            {productListCat.map((item) => (
              <TouchableOpacity
                className="w-full flex-col bg-white rounded-[10px] relative overflow-hidden"
                onPress={() => router.push(`/category/${item.category}`)}
                key={item.id}
              >
                <Image
                  source={item.imgUrl}
                  className="h-[200px] w-full rounded-lg"
                />
                <Text className="text-[15px] text-white font-nunitosans-bold absolute bottom-[16px] left-[22px] z-[3]">
                  {item.title}
                </Text>
                <LinearGradient
                  colors={["#000000", "rgba(0, 0, 0, 0)"]}
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 150,
                    zIndex: 1,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <OfferList />
        </View>
      </Animated.ScrollView>
    </View>
  );
}
