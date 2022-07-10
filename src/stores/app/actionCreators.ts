import { changeCurrentSong } from './constants';

export const changeCurrentSongAction = (currentSong) => ({
  type: changeCurrentSong,
  currentSong,
});
