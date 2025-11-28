import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  FlatList,
  ImageBackground,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIc } from "../../constant/icon";
import Header from "../../components/Header";
import { listOfProducts } from "../../constant/static";
import AddToCartButton from "../../components/AddToCartButton";

const comboBanners = [
  require("../../assets/images/cat_advt_1.jpg"),
  require("../../assets/images/cat_advt_2.jpg"),
  require("../../assets/images/cat_advt_3.jpg"),
  require("../../assets/images/cat_advt_4.jpg"),
];
const { width: screenWidth } = Dimensions.get("window");
const itemWidth = (screenWidth - 48) / 2;

export default function BookaTable() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [170, 170],
    extrapolate: "clamp",
  });

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (!isMounted) return;
      const nextIndex = (currentIndex + 1) % comboBanners.length;
      setCurrentIndex(nextIndex);
      sliderRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={{
          height: headerHeight,
          width: "100%",
          backgroundColor: "#6b98e3",
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
          <View className="w-full flex-col mb-[40px]">
            <View className="w-full mb-3">
              <Text className="text-[16px] text-gray-600 font-nunitosans-bold">
                List of Products
              </Text>
            </View>
            <View className="flex-row flex-wrap justify-between">
              {listOfProducts.map((foodItem) => (
                <View
                  style={{ width: itemWidth }}
                  className="rounded-[10px] border border-gray-300 px-3 pt-3 pb-5 mb-4"
                  key={foodItem.id}
                >
                  <TouchableOpacity
                    className="flex-col items-center"
                    onPress={() => router.push(`/details/${foodItem.id}`)}
                  >
                    <View className="overflow-hidden rounded-[10px]">
                      <Image
                        source={foodItem.imgUrl}
                        className="w-[80px] h-[80px]"
                      />
                    </View>
                    <View className="py-2">
                      <Text
                        className="text-[13px] text-black text-center font-nunitosans-semibold mb-3"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {foodItem.title}
                      </Text>
                      <Text className="text-[15px] text-[#ff0000] text-center font-nunitosans-bold">
                        ₹ {foodItem.price} /-
                      </Text>
                      <Text className="text-[13px] text-gray-400 text-center font-nunitosans-bold line-through">
                        ₹ {foodItem.mainPrice} /-
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View className="w-full flex-row justify-center relative mt-1">
                    <AddToCartButton product={foodItem} />
                  </View>
                </View>
              ))}

              <View className="flex w-full mb-[24px] mt-[20px]">
                <View className="w-full rounded-[10px] overflow-hidden">
                  <FlatList
                    ref={sliderRef}
                    data={comboBanners}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                      <ImageBackground
                        source={item}
                        resizeMode="cover"
                        style={{
                          width: screenWidth,
                          height: 180,
                          justifyContent: "center",
                        }}
                      />
                    )}
                    getItemLayout={(_, index) => ({
                      length: screenWidth,
                      offset: screenWidth * index,
                      index,
                    })}
                    initialScrollIndex={currentIndex}
                  />
                </View>
              </View>

              {listOfProducts.map((foodItem) => (
                <View
                  style={{ width: itemWidth }}
                  className="rounded-[10px] border border-gray-300 px-3 pt-3 pb-5 mb-4"
                  key={foodItem.id}
                >
                  <TouchableOpacity
                    className="flex-col items-center"
                    onPress={() => router.push(`/details/${foodItem.id}`)}
                  >
                    <View className="overflow-hidden rounded-[10px]">
                      <Image
                        source={foodItem.imgUrl}
                        className="w-[80px] h-[80px]"
                      />
                    </View>
                    <View className="py-2">
                      <Text
                        className="text-[13px] text-black text-center font-nunitosans-semibold mb-3"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {foodItem.title}
                      </Text>
                      <Text className="text-[15px] text-[#ff0000] text-center font-nunitosans-bold">
                        ₹ {foodItem.price} /-
                      </Text>
                      <Text className="text-[13px] text-gray-400 text-center font-nunitosans-bold line-through">
                        ₹ {foodItem.mainPrice} /-
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View className="w-full flex-row justify-center relative mt-1">
                    <AddToCartButton product={foodItem} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
