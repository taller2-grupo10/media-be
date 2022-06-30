import { Song } from "../models/song.js";
import { fileUpload } from "../helpers/fileUploadHelper.js";

const songCreate = async (req, res) => {
  let data = req.files.filter((file) => file.fieldname === "data");
  data = data.length > 0 ? data[0] : null;
  if (!data)
    return res
      .status(400)
      .send({ message: "Error creating Song. No song data was sent." });

  data = JSON.parse(data.buffer.toString());

  let files = req.files.filter((file) => file.fieldname === "files");
  let file = files.length > 0 ? files[0] : null;
  if (!file)
    return res
      .status(400)
      .send({ message: "Error creating Song. No song file was sent." });

  let songUrl = await fileUpload(file.buffer, file.originalname);
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
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
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

const songGetByAlbumId = (req, res) => {
  const albumId = req.params.albumId;
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Song.find({
    $and: [
      { "album.album": albumId },
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

// song get by name with contains
const songGetByName = (req, res) => {
  const name = req.params.name;
  let subscriptionLevelQuery = null;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Song.find({
    $and: [
      {
        title: { $regex: name, $options: "i" },
      },
      { isDeleted: false },
      { isActive: true },
      {
        subscriptionLevel: subscriptionLevelQuery ?? { $lte: 0 },
      },
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
  Song.find({ _id: id, isDeleted: false, isActive: true })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const songGetAll = (req, res) => {
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Song.find({
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

const songGetByGenre = (req, res) => {
  const genre = req.params.genre;
  let subscriptionLevelQuery;
  if (Object.keys(req.query).length > 0) {
    subscriptionLevelQuery = { $lte: +req.query.subscriptionLevel };
  }
  Song.find({
    $and: [
      { genres: genre },
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

const songGetAllNoFilter = (req, res) => {
  Song.find({})
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
};
