import { Artist } from "../models/artist.js";

const artistCreate = (req, res) => {
  const artist = new Artist(req.body);
  artist
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const artistDelete = (req, res) => {
  const id = req.params.id;
  Artist.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const artistUpdate = (req, res) => {
  const id = req.params.id;
  Artist.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// artist get by name with contains
const artistGetByName = (req, res) => {
  const name = req.params.name;
  Artist.find({ name: { $regex: name, $options: "i" } })
    .populate("songs")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const artistGetByID = (req, res) => {
  const id = req.params.id;
  Artist.findById(id)
    .populate("songs")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

export {
  artistCreate,
  artistDelete,
  artistUpdate,
  artistGetByName,
  artistGetByID,
};