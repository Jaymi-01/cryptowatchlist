import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonItem = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatar, { opacity }]} />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.line, { width: "40%", opacity }]} />
        <Animated.View style={[styles.line, { width: "20%", marginTop: 8, opacity }]} />
      </View>
      <View style={styles.priceContainer}>
        <Animated.View style={[styles.line, { width: "60%", opacity }]} />
        <Animated.View style={[styles.line, { width: "40%", marginTop: 8, opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333",
    marginRight: 15,
    marginLeft: 35, // Match padding for favorite icon
  },
  textContainer: {
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
    width: 80,
  },
  line: {
    height: 12,
    backgroundColor: "#333",
    borderRadius: 6,
  },
});

export default SkeletonItem;
