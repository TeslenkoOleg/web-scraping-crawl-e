// RedditResponseParser.js

const { BaseHtmlParser, ValueGrabber } = require('crawl-e')

class RedditResponseParser extends BaseHtmlParser {
  constructor() {
    super()

    // setup ValueGrabbers  // <<< [1]

    this.postTitleGrabber = new ValueGrabber('section')  // <<< [1.1]

    this.postImageUrlGraber = new ValueGrabber('img @src')  // <<< [1.1]

    // this.postScoreGrabber = new ValueGrabber({  // <<< [1.2]
    //   selector: 'div.score.unvoted',
    //   attribute: 'title',
    //   mapper: parseInt
    // })
    //
    // this.postAuthorGrabber = new ValueGrabber((box, context) => {  // <<< [1.3]
    //   let authorTag = box.find('a.author')
    //   return {
    //     name: authorTag.text(),
    //     profileUrl: authorTag.attr('href')
    //   }
    // })
  }

  parsePostsList(response, context, callback) {
    let { container, parsingContext } = this.prepareHtmlParsing(response.text, context)
    this.parseList(
      container,
      parsingContext,
      'posts',
      { box: 'article.Z9dd1d' },
      (box, context, cb) => {
        cb(null, this.parsePostBox(box, context)) // <<< [3]
      },
      callback
    )
  }

  parsePostBox (box, context) { // <<< [2]
    return {
      title: this.postTitleGrabber.grabFirst(box, context),
      imageUrl: this.postImageUrlGraber.grabFirst(box, context),
      // score: this.postScoreGrabber.grabFirst(box, context),
      // author: this.postAuthorGrabber.grabFirst(box, context)
    }
  }
}


module.exports = RedditResponseParser
