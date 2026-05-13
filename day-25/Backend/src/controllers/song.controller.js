const songModel = require("../models/song.model")
const id3 = require("node-id3")

const storageService = require("../services/storage.service")

async function uploadSong(req, res) {

    const songBuffer = req.file.buffer

    const { mood } = req.body

    console.log(songBuffer);

    const tags = id3.read(songBuffer)

    console.log(tags);
    /**
     * @description == this part was taking more time so we resolved it using promise.all in one go
     */
    // const songFile = await storageService.uploadFile({
    //     buffer: songBuffer,
    //     filename: tags.title + ".mp3",
    //     folder: "Moodify/songs"
    // })

    // const posterFile = await storageService.uploadFile({
    //     buffer: tags.image.imageBuffer,
    //     filename: tags.title + ".jpeg",
    //     folder: "Moodify/posters"
    // })

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "Moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "Moodify/posters"
        })
    ])

    console.log("This is songFile", songFile);


    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood // or we can write mood:mood
    })

    res.status(201).json({
        message: "song saved successfully",
        song
    })

}

async function getSong(req, res) {

    const { mood } = req.query

    const song = await songModel.findOne({ mood })

    res.status(200).json({
        message: "Song fetched successfully.",
        song
    })
}

module.exports = { uploadSong, getSong }