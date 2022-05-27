import { Playlist } from "../models/playlist.js";

const playlistCreate = (req, res) => {
  const playlist = new Playlist(req.body);
  playlist
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetByID = (req, res) => {
  const id = req.params.id;
  Playlist.findById(id)
    .then((result) => {
      result.populate("songs").then((result) => {
        res.status(200).send(result);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetByUserId = (req, res) => {
  const userId = req.params.userId;
  Playlist.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistUpdate = (req, res) => {
  const id = req.params.id;
  Playlist.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetAll = (req, res) => {
  Playlist.find()
    .then((result) => {
      result.populate("songs").then((result) => {
        res.status(200).send(result);
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

export {
  playlistCreate,
  playlistGetByID,
  playlistGetByUserId,
  playlistUpdate,
  playlistGetAll,
};
