import { Album } from "../models/album.js";
import { fileUpload } from "../helpers/musicUploadHelper.js";

const albumCreate = async (req, res) => {
  let data = req.files.filter((file) => file.fieldname === "data");
  data = data.length > 0 ? data[0] : null;
  if (!data)
    return res
      .status(400)
      .send({ message: "Error creating Album. No album data was sent." });

  data = JSON.parse(data.buffer.toString());

  let files = req.files.filter((file) => file.fieldname === "files");
  let file = files.length > 0 ? files[0] : null;
  if (!file)
    return res
      .status(400)
      .send({ message: "Error creating Album. No album file was sent." });

  let albumPhotoUrl = await fileUpload(file.buffer, file.originalname);
  data.photoURL = albumPhotoUrl;

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
  Album.find({ "artist.artist": artistId })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// album get by name with contains
const albumGetByName = (req, res) => {
  const name = req.params.name;
  Album.find({ title: { $regex: name, $options: "i" } })
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
  Album.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumGetByGenre = (req, res) => {
  const genre = req.params.genre;
  Album.find({ genres: genre })
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
  albumGetByName,
  albumGetByID,
  albumGetAll,
  albumGetByGenre,
};
