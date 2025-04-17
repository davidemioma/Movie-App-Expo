import React, { useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { images } from "@/constants/images";
import { fetchmovies } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";
import { updateSearchCount } from "@/services/appwrite";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch<Array<Movie>>({
    fetchAction: () => fetchmovies({ query: searchQuery }),
    autoFetch: true,
  });

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount({
            query: searchQuery,
            movie: movies[0],
          });
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      updateSearchCount({
        query: searchQuery,
        movie: movies[0],
      });
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute flex-1 w-full z-0" source={images.bg} />

      <FlatList
        className="px-5"
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={images.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                value={searchQuery}
                placeholder="Search for a movie"
                onChangeText={setSearchQuery}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-gray-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
