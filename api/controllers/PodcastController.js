/**
 * PodcastController
 *
 * @description :: Server-side logic for managing podcasts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var promise = require('promised-io/promise');
var Deferred = promise.Deferred;

module.exports = {

	"create" : function(req, res, next){
		var getId3Data = require("../modules/id3.js")
		var pictuRecord = require("../modules/pictuRecord.js")
		var deferred = new Deferred();
		var address = req.param("address");
		var request = require('request');

		request
		.get(address)
		.on('response', function(response) {
			if(response.statusCode != 200 || response.headers['content-type'] != "audio/mpeg") return res.forbidden();

			Podcast
			.add({
				address : address
			})
			.then(function(podcast){
				if(! podcast.created){
					return res.json(podcast);
				}
				getId3Data(podcast.address)
				.then(function(data){
					Tag
					.add({
						title : data.tag ? data.tag.toLowerCase() : ""
					})
					.then(function(tag){
						podcast.title = data.title;
						podcast.artist = data.artist;
						podcast.album = data.album;
						podcast.year = data.year;
						if(tag){
							podcast.tag.add(tag.id);
						}
						podcast.save(function(err){
							if(err) return next(err);

							if(_.isObject(data.image)){
								data.image.destination = sails.config.podcast.thumbnail.path;
								pictuRecord(data.image)
								.then(function(imageSrc){
									podcast.image = imageSrc;
									podcast.save();
									return res.json(podcast);
								}, function(err){
									return res.json(podcast);
								});
							}
							else{
								return res.json(podcast);
							}
						});
					})
					.catch(function(err){
						return next(err);
					})
				})
			})
			.catch(function(err){
				return next(err);
			});
		});
	}
};