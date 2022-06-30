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
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Playlist.find({ _id: id, isDeleted: false, isActive: true })
    .then((result) => {
      result
        .populate("songs", null, {
          $and: [
            { isDeleted: false },
            { isActive: true },
            { subscriptionLevel: subscriptionLevelQuery ?? { $lte: 0 } },
          ],
        })
        .then((result) => {
          res.status(200).send(result);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetByUserId = (req, res) => {
  const userId = req.params.userId;
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Playlist.find({
    $or: [{ owner: userId }, { collaborators: userId }],
    isDeleted: false,
    isActive: true,
  })
    .populate("songs", null, {
      $and: [
        { isDeleted: false },
        { isActive: true },
        { subscriptionLevel: subscriptionLevelQuery ?? { $lte: 0 } },
      ],
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
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetAll = (req, res) => {
  Playlist.find({
    isDeleted: false,
    isActive: true,
  })
    .populate("songs", null, {
      isDeleted: false,
      isActive: true,
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const playlistGetAllNoFilter = (req, res) => {
  Playlist.find({})
    .populate("songs", null, {})
    .then((result) => {
      res.status(200).send(result);
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
  playlistGetAllNoFilter,
};
