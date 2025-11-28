import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { pathItem } from "../../constant/routes";
import { slides, splash_banner_image_data } from "../../constant/static";
import { useSplashStore } from "../../store/splash";
import { Prev, Next } from "../../constant/icon";

const { width: screenWidth } = Dimensions.get("window");
const cardHorizontalPadding = 16;

type Slide = {
  quote: string;
  qtext: string;
  desc: string;
};

export default function Splash() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setHasSeenSplash = useSplashStore((state) => state.setHasSeenSplash);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(index);
  };

  const scrollToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    setHasSeenSplash(true);
    router.replace(pathItem.login as any);
  };

  const SlideCard = ({ slide }: { slide: Slide }) => (
    <View
      style={{ width: screenWidth }}
      className="items-center justify-center"
    >
      <View
        className="bg-white rounded-xl py-2 px-2"
        style={{ width: screenWidth - cardHorizontalPadding * 2 }}
      >
        <View className="flex-col">
          <Text className="text-[#ff8d08] text-[23px] text-center font-nunitosans-bold leading-tight">
            {slide.quote}
          </Text>
          <Text className="text-black text-[19px] text-center font-nunitosans-bold leading-tight">
            {slide.qtext}
          </Text>
        </View>
        <Text className="text-lg text-center text-gray-400 mt-4 font-nunitosans-semibold leading-tight">
          {slide.desc}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* top gradient */}
      <LinearGradient
        colors={["#ffffff", "rgba(255, 255, 255, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: 1,
        }}
      />

      {/* Background Pattern */}
      <View className="flex-1 bg-white gap-3">
        <View className="flex-row gap-3 w-full justify-center">
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_1}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_2}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_3}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_4}
              style={{ width: "100%", height: 164 }}
            />
          </View>
        </View>
        <View className="flex-row gap-3 w-full justify-center">
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_5}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_6}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_7}
              style={{ width: "100%", height: 164 }}
            />
          </View>
        </View>
        <View className="flex-row gap-3 w-full justify-center">
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_8}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_9}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_10}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_11}
              style={{ width: "100%", height: 164 }}
            />
          </View>
        </View>
        <View className="flex-row gap-3 w-full justify-center">
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_4}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_8}
              style={{ width: "100%", height: 164 }}
            />
          </View>
          <View className="w-[31%] rounded-2xl overflow-hidden">
            <Image
              source={splash_banner_image_data.splash_image_6}
              style={{ width: "100%", height: 164 }}
            />
          </View>
        </View>
      </View>

      {/* bottom gradient */}
      <View className="absolute bottom-0 left-0 right-0 h-[260px] bg-white"></View>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "#ffffff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          bottom: 260,
          left: 0,
          right: 0,
          height: 200,
          zIndex: 1,
        }}
      />

      {/* Onboarding slides */}
      <View className="absolute bottom-[140px] left-0 right-0 z-[2]">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          {slides.map((slide, index) => (
            <SlideCard key={index} slide={slide} />
          ))}
        </ScrollView>
      </View>

      {/* Dots */}
      {currentSlide !== 2 && (
        <View className="absolute bottom-[64px] w-full flex-row items-center justify-center space-x-2">
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToSlide(index)}
              activeOpacity={0.6}
            >
              <View
                className={`mx-1 w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-[#ff8d08]" : "bg-gray-300"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Navigation Buttons */}
      {currentSlide !== slides.length - 1 && (
        <View className="absolute bottom-[50px] px-12 w-full flex-row justify-between">
          {currentSlide > 0 ? (
            <TouchableOpacity
              onPress={handlePrevious}
              className="rounded-full bg-white border border-[#ff8d08] border-solid w-[40px] h-[40px] flex justify-center items-center"
            >
              <Prev size={20} color={"#ff8d08"} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 100 }} />
          )}

          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#ff8d08] w-[40px] h-[40px] flex justify-center items-center rounded-full"
          >
            <Next size={20} />
          </TouchableOpacity>
        </View>
      )}

      {/* Get Started Button */}
      {currentSlide === slides.length - 1 && (
        <View className="absolute bottom-[70px] w-full px-[100px]">
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-[#ff8d08] py-[12px] rounded-lg items-center"
            style={{
              shadowColor: "#ff8d08",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 4.65,
              elevation: 8,
            }}
          >
            <Text className="text-white text-[16px] font-nunitosans-bold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
