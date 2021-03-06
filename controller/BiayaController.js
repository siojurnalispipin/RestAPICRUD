var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Biaya = require("../model/biaya");

router.post("/biaya", function(req, res) {
  Biaya.create(
    {
      nomorbiaya: req.body.nomorbiaya,
      penerima: req.body.penerima,
      email: req.body.email,
      alamatpenagihan: req.body.alamatpenagihan,
      tanggal_transaksi: req.body.tanggaltransaksi,
      bayarnanti: req.body.bayarnanti,
      bayardari: req.body.bayardari,
      metodepembayaran: req.body.metodepembayaran,
      subtotal: req.body.subtotal,
      total: req.body.total,
      pemotongan: req.body.pemotongan,
      sisatagihan: req.body.sisatagihan,
      catatan: req.body.catatan
    },
    function(err, data) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(data);
    }
  );
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get("/biaya", function(req, res) {
  Biaya.find({}, function(err, data) {
    if (err)
      return res.status(500).send("There was a problem finding the data.");
    res.status(200).send(data);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get("/biaya/:id", function(req, res) {
  Biaya.findById(req.params.id, function(err, data) {
    if (err)
      return res.status(500).send("There was a problem finding the data.");
    if (!data) return res.status(404).send("No data found.");
    res.status(200).send(data);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete("/biaya/:id", function(req, res) {
  Biaya.findByIdAndRemove(req.params.id, function(err, data) {
    if (err)
      return res.status(500).send("There was a problem deleting the data.");
    res.status(200).send("Data: " + data.nama_transaksi + " was deleted.");
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.patch("/biaya/:id", function(req, res) {
  Biaya.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    data
  ) {
    if (err)
      return res.status(500).send("There was a problem updating the data.");
    res.status(200).send(data);
  });
});

module.exports = router;
