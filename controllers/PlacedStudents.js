const PlacedStudents = require('../models/PlacedStudents');

exports.getPlacedStudents = async (req, res) => {
    try {
        const placedStudentData = await PlacedStudents.find()
        res.json(placedStudentData)
    } catch (err) {
        console.log(err);
    }
}

exports.postPlacedStudents = async (req, res) => {
    const { name, placedin, year, package, course } = req.body
    const placedStudents = new PlacedStudents({
        name: name,
        placedin: placedin,
        year: year,
        package: package,
        course: course
    })
    try {
        await placedStudents.save();
        PlacedStudents.find({}, function (err, document) {
            if (err) {
                res.json({
                    message: "Something wrong happened with database."
                });
            }
            if (document.length === 0) {
                res.json({
                    message: "No data exists."
                });
            }
            if (document) {
                res.json(document);
            }
        })
    } catch (err) {
        console.log(err);
        res.send("error")
    }
}

exports.deletePlacedStudents = async (req, res) => {
    const { id } = req.body;

    try {
        PlacedStudents.findByIdAndRemove(id, (err, document) => {
            if (err) {
                res.json({
                    message: "something wrong happened"
                })
            }
            PlacedStudents.find({}, function (err, doc) {
                if (err) {
                    res.json({
                        message: "something wrong happened"
                    })
                }
                if (doc) {
                    res.json(doc)
                }
            })
        });
    } catch (err) {
        res.send("error")
    }
}