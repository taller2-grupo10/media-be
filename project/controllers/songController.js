import { Song } from "../models/song.js";
import { getFileUrl } from "../helpers/fileUrlHelper.js";

const songCreate = async (req, res) => {
  let data = JSON.parse(req.body.data);
  let songUrl = await getFileUrl(data.filename);
  data.url = songUrl;

  const song = new Song(data);
  song
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songUpdate = (req, res) => {
  const id = req.params.id;
  Song.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByArtistId = (req, res) => {
  const artistId = req.params.artistId;
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Song.find({
    $and: [
      {
        $or: [
          { "artists.artist": artistId },
          { "artists.collaborators": artistId },
        ],
      },
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByAlbumId = (req, res) => {
  const albumId = req.params.albumId;
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Song.find({
    $and: [
      { "album.album": albumId },
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByAlbumIdNoFilter = (req, res) => {
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
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Song.find({
    $and: [
      { title: { $regex: name, $options: "i" } },
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  })
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
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Song.find({
    $and: [
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetAllNoFilter = (req, res) => {
  Song.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetByGenre = (req, res) => {
  const genre = req.params.genre;
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Song.find({
    $and: [
      { genres: genre },
      { isDeleted: false },
      { isActive: true },
      { subscriptionLevel: subscriptionLevelQuery },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetBySubscriptionLevel = (req, res) => {
  const subscriptionLevel = req.params.subscriptionLevel;
  Song.find({
    $and: [
      { subscriptionLevel: subscriptionLevel },
      { isDeleted: false },
      { isActive: true },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

export {
  songCreate,
  songUpdate,
  songGetByArtistId,
  songGetByAlbumId,
  songGetByName,
  songGetByID,
  songGetAll,
  songGetByGenre,
  songGetAllNoFilter,
  songGetBySubscriptionLevel,
  songGetByAlbumIdNoFilter,
};
