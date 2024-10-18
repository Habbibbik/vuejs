export interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    language: string;
    releaseYear: number;
    releaseDate: string;
    genres: string[];
    plot: string;
    runtime: string;
    budget: number;
    revenue: number;
    homepage: string;
    status: string;
    posterUrl: string;
    backdropUrl: string;
    trailerUrl: string;
    trailerYoutubeId: string;
    tmdbRating: number;
    searchL: string;
    keywords: string[];
    countriesOfOrigin: string[];
    languages: string[];
    cast: string[];
    director: string;
    production: string;
    awardsSummary: string;
}