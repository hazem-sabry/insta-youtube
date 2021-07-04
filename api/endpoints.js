// Our Request Tuples are here.
export const GET_CHANNEL = [
  'get',
  `/channels?part=snippet,statistics,brandingSettings`,
]

export const GET_CHANNEL_VIDEOS = [
  'get',
  `/search?channelId={channel_id_here}&part=snippet,id&order=date`,
]

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
