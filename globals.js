const { createAudioPlayer } = require("@discordjs/voice")
const play = require('play-dl')
const fs = require('fs');
const ytdl = require('ytdl-core');

const Globals = {
	isLooping: false,
	queue: [],
	player: createAudioPlayer(),
	volume: 0.5
}


async function checkTitleDB(url, path){
	let titleDB = fs.readFileSync(path, 'utf-8')
    let obj = JSON.parse(titleDB)

	for (let object in obj.hist){
		if (obj.hist[object].url == url){

            console.log("Found video in cache");

            return { title: obj.hist[object].title, author: obj.hist[object].author, length: obj.hist[object].length }
	} else if (object == obj.hist.length-1){
		let video = await play.video_basic_info(url)

        let title = video.video_details.title
        let author = video.video_details.channel.name
        let length = video.video_details.durationRaw

		obj.hist.push({url: url, title: title, author: author, length: length})

		let str = JSON.stringify(obj)

		fs.writeFileSync(path, str)
		object = parseInt(object) + 1
		return { title: obj.hist[object].title, author: obj.hist[object].author, length: obj.hist[object].length }
		}
	}
}


function cacheVideo(url, path){

    let list = fs.readFileSync(path, 'utf-8');
    let obj = JSON.parse(list);

    for (let object in obj.hist){
        if (obj.hist[object].url == url){

            console.log("Found video in cache");

            obj.hist[object].times_played++

            return obj.hist[object].path

        } else if (object == obj.hist.length-1){
            let id = play.extractID(url)

            let file = "./storage/" + id + ".mp4"

            obj.hist.push({url: url, path: file, times_played:1})

            ytdl(url).pipe(fs.createWriteStream(file));

            let str = JSON.stringify(obj)

            fs.writeFileSync(path, str)

            return obj.hist[object].path
        }
    }
}

module.exports = { Globals, cacheVideo, checkTitleDB }

