import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SkeletonItem from "./SkeletonItem";

const SkeletonLoader = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <SkeletonItem />}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default SkeletonLoader;
