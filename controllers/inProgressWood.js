// const wood = require("../WoodStorage/wood")

const {inProgressWood} = require('../models/inProgressWood')

const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
	const {_id: owner} = req.user; // щоб отримува тіоьки той хто створив
	// const {page = 1, limit = 10} = req.query;
	// req.query обєкт параметрів пошуку
	// const skip = (page - 1) * limit;
	// const result = await inProgressWood.find();

	const result = await inProgressWood.find({owner}, "-createdAt -updatedAt").populate("owner", "name email");

	// -createdAt -updatedAt поля які не треба брати з бази
	// populate бере айді знаходить овенра і вставляє обєкт з його данними
	// 2 арг список полів які треба повернути
	// skip скілеи пропустити обєктів в базі, limit скільки повернути
	res.json(result);
}

const getById = async (req, res) => {
	const {id} = req.params;
	// const result = await Book.findOne({_id: id})
	const result = await inProgressWood.findById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
}

const add = async (req, res) => {
	const {_id: owner} = req.user;
	const result = await inProgressWood.create({...req.body, owner});
	//  const result = await Wood.create({...req.body});
	res.status(201).json(result);
}

const updateById = async (req, res) => {
	const {id} = req.params;
	const result = await inProgressWood.findByIdAndUpdate(id, req.body, {new: true});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
}

const updateCheked = async (req, res) => {
	const {id} = req.params;
	const result = await inProgressWood.findByIdAndUpdate(id, req.body, {new: true});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
}

const deleteById = async (req, res) => {
	const {id} = req.params;
	const result = await inProgressWood.findByIdAndRemove(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "Delete success"
	})
}

// const getAll = async (req, res) => {
//     const result = await wood.getAll();
//     res.json(result);
// }

// const add = async (req, res) => {
//     const result = await wood.add(req.body);
//     res.status(201).json(result);
// }

// const updateById = async (req, res) => {
//     const { id } = req.params;
//     const result = await wood.updateById(id, req.body);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     res.json(result);
// }

// const deleteById = async (req, res) => {
//     const { id } = req.params;
//     const result = await wood.deleteById(id);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     // res.status(204).send()
//     res.json({
//         message: "Delete success"
//     })
// }

module.exports = {
	getAll:       ctrlWrapper(getAll),
	getById:      ctrlWrapper(getById),
	add:          ctrlWrapper(add),
	updateById:   ctrlWrapper(updateById),
	updateCheked: ctrlWrapper(updateCheked),
	deleteById:   ctrlWrapper(deleteById),
}