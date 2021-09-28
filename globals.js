const { createAudioPlayer } = require("@discordjs/voice")
const play = require('play-dl')
const fs = require('fs');

const Globals = {
	isLooping: false,
	queue: [],
	player: createAudioPlayer(),
	volume: 0.5
}

function seeList(path){
    const list = fs.readFileSync(path, 'utf-8')
    return list
}

function add_entry(url, listObject, path) {
    let check = play.yt_validate(url)
    if (!check) return false
    if (check === "playlist") return false
    let data = play.stream(url)
    listObject.history[url] = data
    let gest = JSON.stringify(listObject)
    console.log("New song added to cache")
    fs.writeFileSync(path, gest)
    return data
}
function has_key(url, listObject, path) {
    if (Object.keys(listObject.history).filter(key => key === url)) {
        if (listObject.history[url] === undefined){
            console.log("Nothing found in videos")
            let data = add_entry(url, listObject, path)
            return data
        }else {
            console.log("Found video in cache")
            return listObject.history[url] 
}}
}
function checkDataBase(url, path){
    let videoDB = seeList(path)
    let videoObject = JSON.parse(videoDB)
    let value = has_key(url, videoObject, path)
    return value
}


function add_title(url, listObject, path) {
    let check = play.yt_validate(url)
    if (!check) return false
    if (check === "playlist") return false
    let data = play.video_basic_info(url)
    listObject.history[url] = data
    let gest = JSON.stringify(listObject)
    console.log("New song title added to cache")
    fs.writeFileSync(path, gest)
    return data
}
function has_title(url, listObject, path) {
    if (Object.keys(listObject.history).filter(key => key === url)) {
        if (listObject.history[url] === undefined){
            console.log("Nothing found for title")
            let data = add_title(url, listObject, path)
            return data
        }else {
            console.log("Found title in cache")
            return listObject.history[url] 
}}
}
function checkTitleDB(url, path){
	let titleDB = seeList(path)
    let titleObject = JSON.parse(titleDB)
	let name = has_title(url, titleObject, path)
	return name
}

module.exports = { Globals, checkDataBase, checkTitleDB }

