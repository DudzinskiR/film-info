export const getBackdropPath = (imgPath: string) => {
  return `https://image.tmdb.org/t/p/w1000_and_h450_multi_faces${imgPath}`;
};

export const getPosterPath = (imgPath: string) => {
  return `https://image.tmdb.org/t/p/w500${imgPath}`;
};

export const getProfilePath = (imgPath: string) => {
  return `https://image.tmdb.org/t/p/w138_and_h175_face${imgPath}`;
};
