import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getMarkets, Coin } from "../services/coinGecko";
import CoinItem from "../components/CoinItem";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Index() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "watchlist">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useFavorites();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await getMarkets();
      setCoins(data);
      setError(null);
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchData(true);
  }, []);

  const filteredCoins = coins.filter((coin) => {
    const matchesFilter =
      filter === "all" || favorites.includes(coin.id);
    const matchesSearch =
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading && !refreshing) {
    return <SkeletonLoader />;
  }

  if (error && coins.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search coins..."
          placeholderTextColor="#888888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#888888" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All Coins
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "watchlist" && styles.activeFilterButton,
          ]}
          onPress={() => setFilter("watchlist")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "watchlist" && styles.activeFilterText,
            ]}
          >
            My Watchlist
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CoinItem coin={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={["#ffffff"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {filter === "watchlist" && favorites.length === 0
                ? "No favorites yet."
                : "No coins found."}
            </Text>
          </View>
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    margin: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeFilterButton: {
    backgroundColor: "#1a1a1a",
  },
  filterText: {
    color: "#888888",
    fontWeight: "bold",
  },
  activeFilterText: {
    color: "#ffffff",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#888888",
    fontSize: 16,
  },
});


