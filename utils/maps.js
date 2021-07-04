// class constructors for Video, Channel, and PlayList

class SearchItem {
  constructor(
    id,
    title,
    channelId,
    channelTitle,
    thumb,
    thumbMedium,
    desc,
    pubDate
  ) {
    this.idObj = id
    this.channel = {
      id: channelId,
      title: channelTitle,
    }
    this.title = title
    this.desc = desc
    this.thumb = thumb
    this.thumbMedium = thumbMedium
    this.pubdate = new Date(pubDate)
  }

  get type() {
    return this.getType()
  }

  get id() {
    return this.getId()
  }

  get publishDate() {
    return this.getPubdate()
  }

  getType() {
    return this.idObj.kind.split('#')[1]
  }

  getId() {
    const idString = `${this.type}Id`
    return this.idObj[idString]
  }

  getPubdate() {
    return this.pubdate.toDateString()
  }
}
class Video {
  constructor(
    id,
    title,
    channelId,
    channelTitle,
    thumb,
    thumbMedium,
    desc,
    pubdate,
    duration,
    dimension,
    definition,
    stats
  ) {
    this.id = id
    this.title = title
    this.channel = {
      id: channelId,
      title: channelTitle,
    }
    this.thumb = thumb
    this.thumbMedium = thumbMedium
    this.desc = desc
    this.views = Number(stats[0]).toLocaleString('en-US', {
      minimumFractionDigits: 0,
    })
    this.likes = Number(stats[1]).toLocaleString('en-US', {
      minimumFractionDigits: 0,
    })
    this.dislikes = Number(stats[2]).toLocaleString('en-US', {
      minimumFractionDigits: 0,
    })
    this.comments = Number(stats[3]).toLocaleString('en-US', {
      minimumFractionDigits: 0,
    })
    this.pubdate = new Date(pubdate)
    this.duration = duration
    this.dimension = dimension
    this.definition = definition
  }
}

class Channel {
  constructor(
    id,
    name,
    thumb,
    cover,
    desc,
    pubDate,
    subscribers,
    videos,
    views
  ) {
    this.id = id
    this.name = name
    this.desc = desc
    this.thumb = thumb
    this.cover = cover
    this.pubdate = new Date(pubDate)
    this.statistics = {
      subscribers: Number(subscribers).toLocaleString('en-US', {
        minimumFractionDigits: 0,
      }),
      videos: Number(videos).toLocaleString('en-US', {
        minimumFractionDigits: 0,
      }),
      views: Number(views).toLocaleString('en-US', {
        minimumFractionDigits: 0,
      }),
    }
  }
}

// class PlayList {
//   constructor(id, title, desc, pubdate, thumbnail) {
//     this.id = id
//     this.title = title
//     this.desc = desc
//     this.pubdate = new Date(pubdate)
//     this.thumb = thumbnail
//   }
// }

// Maps functions
export function mapSearchItem(apiItem) {
  if (!apiItem.snippet) return
  const item = new SearchItem(
    apiItem.id,
    apiItem.snippet.title,
    apiItem.snippet.channelId,
    apiItem.snippet.channelTitle,
    apiItem.snippet.thumbnails.default.url,
    apiItem.snippet.thumbnails.medium.url,
    apiItem.snippet.description,
    apiItem.snippet.publishedAt
  )

  return item
}

export function mapVideo(apiItem) {
  const stats = []

  stats.push(apiItem.statistics.viewCount)
  stats.push(apiItem.statistics.likeCount)
  stats.push(apiItem.statistics.dislikeCount)
  stats.push(apiItem.statistics.commentCount)

  const item = new Video(
    apiItem.id,
    apiItem.snippet.title,
    apiItem.snippet.channelId,
    apiItem.snippet.channelTitle,
    apiItem.snippet.thumbnails.default.url,
    apiItem.snippet.thumbnails.medium.url,
    apiItem.snippet.description,
    apiItem.snippet.publishedAt,
    apiItem.contentDetails.duration,
    apiItem.contentDetails.dimension,
    apiItem.contentDetails.definition,
    stats
  )

  return item
}
export function mapChannelDetails(apiItem) {
  const item = new Channel(
    apiItem.id,
    apiItem.snippet.title,
    apiItem.snippet.thumbnails.default.url,
    apiItem.brandingSettings.image.bannerExternalUrl,
    apiItem.snippet.description,
    apiItem.snippet.publishedAt,
    apiItem.statistics.subscriberCount,
    apiItem.statistics.videoCount,
    apiItem.statistics.viewCount
  )

  return item
}
