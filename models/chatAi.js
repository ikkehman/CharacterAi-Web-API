const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
const dotenv = require('dotenv');
const { translate } = require('bing-translate-api');
const express = require('express');
const router = express.Router();
dotenv.config();
const sendErrorResponse = (error, res) => {
    const errorInfo = {
        name: error.name,
        status: error.statusCode || 500,
        message: error.message,
        stack: error.stack
    };

    res.status(errorInfo.status).json(errorInfo);
    console.log(errorInfo);
};

router.get('/autentikasi', async (req, res) => {
	try {
	    const token = process.env.TOKEN;
		await characterAI.authenticateWithToken(token);
		res.json({status:'Token received'});
	} catch (error) {
		sendErrorResponse(error, res);
	}
});

router.post('/chat', async (req, res) => {
	try {
        // console.log(appa)
		const characterId = process.env.characterId;
		const chat = await characterAI.createOrContinueChat(characterId);
		const message = req.body.messages;
        // console.log(agent)
        const messageTr = await translate(message, null, 'en');
        // console.log(messageTr.translation);
		const response = await chat.sendAndAwaitResponse(messageTr.translation, true);
        // Menanggapi dengan teks yang diterima
        const replyTr = await translate(response.text, null, 'id');
		res.json({ reply: replyTr.translation });
        // console.log(replyTr.text);
	} catch (error) {
        sendErrorResponse(error, res);
	}
});

module.exports = router;