import React, { useState } from "react";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/use-fetch";
import { images } from "@/constants/images";
import { fetchmovies } from "@/services/tmdb";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { getTrendingMovies } from "@/services/appwrite";
import {
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  View,
  FlatList,
  RefreshControl,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingMovies,
    loading: pending,
    error: trendingMoviesError,
    refetch: refetchTrendingMovies,
  } = useFetch<Array<TrendingMovie> | undefined>({
    fetchAction: getTrendingMovies as any,
    autoFetch: true,
  });

  const {
    data: movies,
    loading,
    error,
  } = useFetch<Array<Movie>>({
    fetchAction: () => fetchmovies({}),
    autoFetch: true,
  });

  // Handle refreshing
  const onRefresh = () => {
    setRefreshing(true);

    refetchTrendingMovies();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image className="w-full absolute" source={images.bg} />

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            className="pt-20"
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      >
        <Image className="w-12 h-10 mt-20 mb-5 mx-auto" source={images.logo} />

        {loading || pending ? (
          <ActivityIndicator
            className="mt-10 self-center"
            size="large"
            color="#0000ff"
          />
        ) : error || trendingMoviesError ? (
          <Text className="text-gray-500 px-5 my-3">
            Error: {error?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search through 300+ movies online..."
              onSearch={() => router.push("/(tabs)/search")}
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  className="mb-4 mt-3"
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) =>
                    `${item.searchTerm.toString()}-${item.movie_id.toString()}`
                  }
                  data={trendingMovies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="mt-5 mb-3 text-lg text-white font-bold">
                Latest Movies
              </Text>

              <FlatList
                className="mt-2 pb-32"
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
