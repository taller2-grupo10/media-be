import { Album } from "../models/album.js";
import { getFileUrl } from "../helpers/fileUrlHelper.js";

const albumCreate = async (req, res) => {
  let data = JSON.parse(req.body.data);
  let photoUrl = await getFileUrl(data.filename);
  data.photoUrl = photoUrl;

  const album = new Album(data);
  album
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumUpdate = (req, res) => {
  const id = req.params.id;
  Album.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumGetByArtistId = (req, res) => {
  const artistId = req.params.artistId;
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  Album.find({
    $and: [
      { "artist.artist": artistId },
      { isDeleted: false },
      { subscriptionLevel: subscriptionLevelQuery },
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

const albumGetByID = (req, res) => {
  const id = req.params.id;
  Album.findById(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumGetAll = (req, res) => {
  Album.find({
    $and: [{ isDeleted: false }, { isActive: true }],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumGetAllNoFilter = (req, res) => {
  Album.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumGetByGenre = (req, res) => {
  let subscriptionLevelQuery = req.query.subscriptionLevel
    ? { $lte: +req.query.subscriptionLevel }
    : { $lte: 0 };
  const genre = req.params.genre;
  Album.find({
    $and: [
      { genres: genre },
      { isDeleted: false },
      { subscriptionLevel: subscriptionLevelQuery },
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

const albumGetBySubscriptionLevel = (req, res) => {
  const subscriptionLevel = req.params.subscriptionLevel;
  Album.find({
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
  albumCreate,
  albumUpdate,
  albumGetByArtistId,
  albumGetByID,
  albumGetAll,
  albumGetByGenre,
  albumGetAllNoFilter,
  albumGetBySubscriptionLevel,
};
