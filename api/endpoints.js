// Our Request Tuples are here.
export const GET_CHANNEL = ['get', `/channels?part=snippet`]

export const GET_PLAYLIST = ['get', `/channels?part=snippet`]

export const GET_VIDEO = [
  'get',
  `/videos?part=snippet,contentDetails,statistics`,
]

export const GET_SEARCH = ['get', `/search?part=snippet`]

export const GET_RELATED_VIDEOS_BY_ID = [
  'get',
  `/search?part=snippet&type=video`,
]
