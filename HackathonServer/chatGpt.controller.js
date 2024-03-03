const { OpenAI}=require('openai')


const conversationContexts = {};

const askToChatGpt = async function (req, res) {
    const openAIInstance = await _createOpenAIInstance();
    const userId = req.body.userId; // Assuming you have some way to identify users, like userId
    
    // Get the conversation context for the user
    let context = conversationContexts[userId] || [];

    await openAIInstance.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            // Include previous conversation history as context
            ...context,
            {"role": "user", "content": req.body.message}
        ],
    }).then((response) => {
        console.log(response.choices[0].message.content);
        const repliedMessage = response.choices[0].message.content;

        // Store updated conversation context for the user
        conversationContexts[userId] = [
            ...context,
            {"role": "user", "content": req.body.message},
            {"role": "assistant", "content": repliedMessage}
        ];

        res.send({from: 'chatGpt', data: repliedMessage});
    }).catch((error) => {
        console.log('Error', error);
        res.status(500).send({ error: 'Something went wrong.' });
    });
}



const _createOpenAIInstance = async () => {
    

    return new OpenAI({apiKey:'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'});
}


module.exports ={
    askToChatGpt
}