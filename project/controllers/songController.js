import { Song } from "../models/song.js";

const songCreate = (req, res) => {
  const song = new Song(req.body);
  song
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songDelete = (req, res) => {
  const id = req.params.id;
  Song.findById(id)
    .updateOne({ $set: { isDeleted: true } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songUpdate = (req, res) => {
  const id = req.params.id;
  Song.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByArtistId = (req, res) => {
  const artistId = req.params.artistId;
  Song.find({ "artist.artist": artistId })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByAlbumId = (req, res) => {
  const albumId = req.params.albumId;
  Song.find({ "album.album": albumId })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// song get by name with contains
const songGetByName = (req, res) => {
  const name = req.params.name;
  Song.find({ title: { $regex: name, $options: "i" } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByID = (req, res) => {
  const id = req.params.id;
  Song.findById(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetAll = (req, res) => {
  Song.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

export {
  songCreate,
  songDelete,
  songUpdate,
  songGetByArtistId,
  songGetByAlbumId,
  songGetByName,
  songGetByID,
  songGetAll,
};
