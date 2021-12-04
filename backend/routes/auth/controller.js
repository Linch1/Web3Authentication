import { config } from 'dotenv';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

import configJwt from '../../config/jwt.js';
import User from '../../Models/User.js';

config();//intialize env variables

export const create = async (req , res , next ) => {
	const { signature, publicAddress } = req.body;

	if (!signature || !publicAddress)
		return res
			.status(400)
			.send({ error: 'Request should have signature and publicAddress' });


    ////////////////////////////////////////////////////
    // Step 1: Get the user with the given publicAddress
    ////////////////////////////////////////////////////
    let user = await User.findOne({ address: publicAddress });
    if (!user) {
        return res.status(401).send({
            error: `User with publicAddress ${publicAddress} is not found in database`,
        });
    }
	////////////////////////////////////////////////////
    // Step 2: Verify digital signature
    ////////////////////////////////////////////////////

	const msg = `${process.env.AUTH_TEXT}${user.nonce}`;
    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() !== publicAddress.toLowerCase()) {
        res.status(401).send({
            error: 'Signature verification failed',
        });
        return null;
    }	

	////////////////////////////////////////////////////
    // Step 3: Generate a new nonce for the user
    ////////////////////////////////////////////////////	
	user.nonce = Math.floor(Math.random() * 10000);
    await user.save();			
	
    ////////////////////////////////////////////////////
    // Step 4: Create JWT
    ////////////////////////////////////////////////////
    try {
        let jwtToken = await jwt.sign(
            {
                payload: {
                    _id: user._id,
                    address: publicAddress,
                },
            },
            configJwt.secret,
            { algorithm: configJwt.algorithms[0], }
        );
        if(!jwtToken) return res.status(400).send({msg: 'Empty token' });
        return res
        .cookie("access_token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        .status(200).send(jwtToken);
    } catch (err) {
        return res.status(400).send({msg: err.msg });
    }
    
    
};

export const logout = async (req , res , next ) => {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}