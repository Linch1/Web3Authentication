

import User from '../../Models/User.js';

export const find = async (req, res, next ) => {
	// If a query string ?publicAddress=... is given, then filter results
	const whereClause =
		req.query && req.query.publicAddress
			? { publicAddress: req.query.publicAddress }
			: undefined;
	let user = await User.findOne(whereClause).lean().exec();
	if( user ) return res.status(200).send({ nonce: user.nonce });
	return res.status(404).send({ msg: "Not Found" });
};

export const get = async (req, res, next ) => {
	// AccessToken payload is in req.user.payload, especially its `id` field
	// UserId is the param in /users/:userId
	// We only allow user accessing herself, i.e. require payload.id==userId
	if (req.user.payload.id !== req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return res.status(200).send(await User.findById(req.params.userId).lean().exec());
};

export const getSingle = async (req, res, next ) => {
	return res.status(200).send(await User.findById(req.authenticated._id).lean().exec());
};

export const create = async (req, res, next ) => {
	if( !req.body || !req.body.address || !req.body.username ) return res.status(400).send({ msg: "missing fields" });
	let alreadyPresent = await User.findOne({ address: req.body.address });
	if( alreadyPresent ) return res.status(400).send({ msg: "already present" });
    let user = new User(req.body);
	user.nonce = Math.floor(Math.random() * 10000);
    return res.status(200).send(await user.save().lean().exec());
}
	

export const patch = (req, res, next ) => {
    return null;
// 	// Only allow to fetch current user
// 	if ((req as any).user.payload.id !== +req.params.userId) {
// 		return res
// 			.status(401)
// 			.send({ error: 'You can can only access yourself' });
// 	}
// 	return User.findByPk(req.params.userId).lean().exec()
// 		.then((user: User | null) => {
// 			if (!user) {
// 				return user;
// 			}

// 			Object.assign(user, req.body);
// 			return user.save();
// 		})
// 		.then((user: User | null) => {
// 			return user
// 				? res.json(user)
// 				: res.status(401).send({
// 						error: `User with publicAddress ${req.params.userId} is not found in database`,
// 				  });
// 		})
// 		.catch(next);
};