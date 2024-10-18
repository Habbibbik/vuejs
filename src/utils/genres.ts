const genreImages: { [key: string]: string } = {
    action: 'src/assets/images/genres/action.jpg',
    history: 'src/assets/images/genres/history.jpg',
    horror: 'src/assets/images/genres/horror.jpg',
    scifi: 'src/assets/images/genres/scifi.jpg',
    'stand-up': 'src/assets/images/genres/stand-up.jpg',
    fantasy: 'src/assets/images/genres/fantasy.jpg',
    drama: 'src/assets/images/genres/drama.jpg',
    mystery: 'src/assets/images/genres/mystery.jpg',
    family: 'src/assets/images/genres/family.jpg',
    comedy: 'src/assets/images/genres/comedy.jpg',
    romance: 'src/assets/images/genres/romance.jpg',
    music: 'src/assets/images/genres/music.jpg',
    crime: 'src/assets/images/genres/crime.jpg',
    'tv-movie': 'src/assets/images/genres/tv-movie.jpg',
    documentary: 'src/assets/images/genres/documentary.jpg',
    thriller: 'src/assets/images/genres/thriller.jpg',
    western: 'src/assets/images/genres/western.jpg',
    animation: 'src/assets/images/genres/animation.jpg',
    war: 'src/assets/images/genres/war.jpg',
    adventure: 'src/assets/images/genres/adventure.jpg',
};

export interface Genre {
    name: string;
    image: string;
}

export const transformGenres = (genres: string[]): Genre[] => {
    return genres.map(genre => ({
        name: genre,
        image: genreImages[genre] || 'src/assets/images/genres/default.jpg',
    }));
};

