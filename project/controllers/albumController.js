import { Album } from "../models/album.js";

const albumCreate = (req, res) => {
  const album = new Album(req.body);
  album
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumDelete = (req, res) => {
  const id = req.params.id;
  Album.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const albumUpdate = (req, res) => {
  const id = req.params.id;
  Album.findByIdAndUpdate(id, req.body)
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
    .populate("artist")
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
    .populate("artist")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

export { albumCreate, albumDelete, albumUpdate, albumGetByName, albumGetByID };
