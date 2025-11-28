import { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, ImageBackground } from "react-native";

const comboBanners = [
  require("../assets/images/cat_advt_1.jpg"),
  require("../assets/images/cat_advt_2.jpg"),
  require("../assets/images/cat_advt_3.jpg"),
  require("../assets/images/cat_advt_4.jpg"),
];
const { width: screenWidth } = Dimensions.get("window");

export default function SpclComboPack() {
  const sliderRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <View className="flex w-full mb-[40px]">
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
      <View className="flex-row justify-center mt-2">
        {comboBanners.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i === currentIndex ? "bg-[#ff0000]" : "bg-gray-300"}`}
          />
        ))}
      </View>
    </View>
  );
}
