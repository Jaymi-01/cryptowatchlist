import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Coin } from "../services/coinGecko";

interface CoinItemProps {
  coin: Coin;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange > 0;
  const favorited = isFavorite(coin.id);

  return (
    <View style={styles.coinItem}>
      <TouchableOpacity
        onPress={() => toggleFavorite(coin.id)}
        style={styles.favoriteButton}
      >
        <FontAwesome
          name={favorited ? "star" : "star-o"}
          size={20}
          color={favorited ? "#FFD700" : "#888888"}
        />
      </TouchableOpacity>
      <Image source={{ uri: coin.image }} style={styles.coinImage} />
      <View style={styles.coinInfo}>
        <Text style={styles.coinName}>{coin.name}</Text>
        <Text style={styles.coinSymbol}>{coin.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.coinPrice}>
        <Text style={styles.priceText}>
          ${coin.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text
          style={[
            styles.changeText,
            { color: isPositive ? "#4caf50" : "#ff5252" },
          ]}
        >
          {isPositive ? "+" : ""}
          {priceChange.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coinItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    alignItems: "center",
  },
  favoriteButton: {
    marginRight: 10,
    padding: 5,
  },
  coinImage: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  coinInfo: {
    flex: 1,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  coinSymbol: {
    fontSize: 14,
    color: "#888888",
    marginTop: 2,
  },
  coinPrice: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  changeText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
});

export default CoinItem;