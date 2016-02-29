/**
 * Object of transform functions for each openshare api
 * Transform functions passed into OpenShare instance when instantiated
 * Return object containing URL and key/value args
 */
module.exports = {

	// set Twitter share URL
	twitter: function(data, mobile = false) {
		// if iOS user and ios data attribute defined
		// build iOS URL scheme as single string
		if (mobile) {

			let message = ``;

			if (data.text) {
				message += data.text;
			}

			if (data.url) {
				message += ` - ${data.url}`;
			}

			if (data.hashtags) {
				let tags = data.hashtags.split(',');
				tags.forEach(function(tag) {
					message += ` #${tag}`;
				});
			}

			if (data.via) {
				message += ` via ${data.via}`;
			}

			return {
				url: 'twitter://post?',
				data: {
					message: message
				}
			};
		}

		return {
			url: 'https://twitter.com/share?',
			data: data
		};
	},

	// set Twitter retweet URL
	twitterRetweet: function(data, mobile = false) {
		// if iOS user and ios data attribute defined
		if (mobile && data.mobile) {
			return {
				url: 'twitter://status?',
				data: {
					id: data.tweetId
				}
			};
		}

		return {
			url: 'https://twitter.com/intent/retweet?',
			data: {
				tweet_id: data.tweetId,
				related: data.related
			}
		};
	},

	// set Twitter like URL
	twitterLike: function(data, mobile = false) {
		// if iOS user and ios data attribute defined
		if (mobile && data.mobile) {
			return {
				url: 'twitter://status?',
				data: {
					id: data.tweetId
				}
			};
		}

		return {
			url: 'https://twitter.com/intent/favorite?',
			data: {
				tweet_id: data.tweetId,
				related: data.related
			}
		};
	},

	// set Twitter follow URL
	twitterFollow: function(data, mobile = false) {
		// if iOS user and ios data attribute defined
		if (mobile && data.mobile) {
			let mobileData = data.screenName ? {
				'screen_name': data.screenName
			} : {
				'id': data.userId
			};

			return {
				url: 'twitter://user?',
				data: mobileData
			};
		}

		return {
			url: 'https://twitter.com/intent/user?',
			data: {
				screen_name: data.screenName,
				user_id: data.userId
			}
		};
	},

	// set Facebook share URL
	facebook: function(data) {
		return {
			url: 'https://www.facebook.com/dialog/feed?app_id=961342543922322&redirect_uri=http://facebook.com&',
			data: data
		};
	},

	// set Facebook send URL
	facebookSend: function(data) {
		return {
			url: 'https://www.facebook.com/dialog/send?app_id=961342543922322&redirect_uri=http://facebook.com&',
			data: data
		};
	},

	// set YouTube play URL
	youtube: function(data, mobile = false) {
		// if iOS user
		if (mobile && data.mobile) {
			return {
				url: `youtube:${data.video}/`
			};
		} else {
			return {
				url: `https://www.youtube.com/watch?v=${data.video}/`
			};
		}
	},

	// set YouTube subcribe URL
	youtubeSubscribe: function(data, mobile = false) {
		// if iOS user
		if (mobile && data.mobile) {
			return {
				url: `youtube://www.youtube.com/user/${data.user}/`
			};
		} else {
			return {
				url: `https://www.youtube.com/user/${data.user}/`
			};
		}
	},

	// set Instagram follow URL
	instagram: function(data, mobile = false) {
		// if iOS user
		if (mobile && data.mobile) {
			return {
				url: 'instagram://user?',
				data: data
			};
		} else {
			return {
				url: `http://www.instagram.com/${data.username}/`
			};
		}
	},

	// set Snapchat follow URL
	snapchat: function(data) {
		return {
			url: `snapchat://add/${data.username}/`
		};
	},

	// set Google share URL
	google: function(data) {
		return {
			url: 'https://plus.google.com/share?',
			data: data
		};
	},

	// set Pinterest share URL
	pinterest: function(data) {
		return {
			url: 'https://pinterest.com/pin/create/bookmarklet/?',
			data: data
		};
	},

	// set LinkedIn share URL
	linkedin: function(data) {
		return {
			url: 'http://www.linkedin.com/shareArticle?',
			data: data
		};
	},

	// set Buffer share URL
	buffer: function(data) {
		return {
			url: 'http://bufferapp.com/add?',
			data: data
		};
	},

	// set Tumblr share URL
	tumblr: function(data) {
		return {
			url: 'https://www.tumblr.com/widgets/share/tool?',
			data: data
		};
	},

	// set Reddit share URL
	reddit: function(data) {
		return {
			url: 'http://reddit.com/submit?',
			data: data
		};
	},

	// set Flickr follow URL
	flickr: function(data, mobile = false) {
		// if iOS user
		if (mobile && data.mobile) {
			return {
				url: `flickr://photos/${data.username}/`
			};
		} else {
			return {
				url: `http://www.flickr.com/photos/${data.username}/`
			};
		}
	},

	// set WhatsApp share URL
	whatsapp: function(data) {
		return {
			url: 'whatsapp://send?',
			data: data
		};
	},

	// set sms share URL
	sms: function(data, mobile = false) {
		return {
			url: mobile ? 'sms:&' : 'sms:?',
			data: data
		};
	},

	// set Email share URL
	email: function(data) {

		var url = `mailto:`;

		// if to address specified then add to URL
		if (data.to !== null) {
			url += `${data.to}`;
		}

		url += `?`;

		return {
			url: url,
			data: {
				subject: data.subject,
				body: data.body
			}
		};
	}
};