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
// class Video {
//   constructor(id, title, thumb, desc, thumbMedium, pubdate, stats) {
//     this.id = id
//     this.title = title
//     this.thumb = thumb
//     this.desc = desc
//     this.thumb_md = thumbMedium
//     this.stats = stats // index : 0 viewcount, 1 likes , 2 dislikes , 3 commentcount
//     this.channelid = 0
//     this.channeltitle = ''
//     this.pubdate = new Date(pubdate)
//   }

//   get views() {
//     return this.getViews()
//   }

//   get likes() {
//     return this.getLikes()
//   }

//   get dislikes() {
//     return this.getDislikes()
//   }

//   get comments() {
//     return this.getComments()
//   }

//   getViews() {
//     return this.stats[0].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }

//   getLikes() {
//     return this.stats[1].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }

//   getDislikes() {
//     return this.stats[2].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }

//   getComments() {
//     return this.stats[3].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }
// }

// class Channel {
//   constructor(id, name, thumb, desc, pubDate, stats) {
//     this.id = id
//     this.name = name
//     this.desc = desc
//     this.thumb = thumb
//     this.pubdate = new Date(pubDate)
//     this.stats = stats // "viewCount": "43008105", "subscriberCount": "103668", "videoCount": "123"
//     this.videos = []
//   }

//   get pubdate() {
//     return this.getPubdate()
//   }

//   get views() {
//     return this.getViews()
//   }

//   get subscribers() {
//     return this.getSubscribers()
//   }

//   get videos() {
//     return this.getVideos()
//   }

//   getPubdate() {
//     return this.pubDate.toDateString()
//   }

//   getViews() {
//     return this.stats[0].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }

//   getSubscribers() {
//     return this.stats[1].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }

//   getVideos() {
//     return this.stats[2].value.toLocaleString('en-US', {
//       minimumFractionDigits: 0,
//     })
//   }
// }

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
