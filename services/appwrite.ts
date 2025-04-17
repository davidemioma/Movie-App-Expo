import { Client, Databases, Query, ID } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "";

const METRICS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_METRICS_COLLECTION_ID || "";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "");

const db = new Databases(client);

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await db.listDocuments(DATABASE_ID, METRICS_COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("getTrendingMovies Error", error);

    return undefined;
  }
};

export const updateSearchCount = async ({
  query,
  movie,
}: {
  query: string;
  movie: Movie | null;
}) => {
  try {
    // Check if movie exists
    const res = await db.listDocuments(DATABASE_ID, METRICS_COLLECTION_ID, [
      Query.equal("searchTerm", query.toLocaleLowerCase()),
    ]);

    // if movie exists increase the count
    if (res.documents.length > 0) {
      const existingMovie = res.documents[0];

      await db.updateDocument(
        DATABASE_ID,
        METRICS_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      // Else create a new one and set count to 1.
      await db.createDocument(DATABASE_ID, METRICS_COLLECTION_ID, ID.unique(), {
        searchTerm: query.toLowerCase(),
        movie_id: movie?.id,
        title: movie?.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
      });
    }
  } catch (err) {
    console.log("updateSearchCount Err", err);

    throw err;
  }
};
