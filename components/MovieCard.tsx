import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          className="w-full h-52 rounded-lg"
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {movie.title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Ionicons name="star" size={16} color="gold" />

          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(movie.vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {movie.release_date?.split("-")[0]}
          </Text>

          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
