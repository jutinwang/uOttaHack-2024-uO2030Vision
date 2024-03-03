const { OpenAI}=require('openai')


const askToChatGpt= async function (req, res){
    const openAIInstance=await _createOpenAIInstance()


    await openAIInstance.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": req.body.message}],
      }).then((response)=> {
        console.log(response.choices[0].message.content);
        const repliedMessage =response.choices[0].message.content
        res.send({from: 'chatGpt', data: repliedMessage})
    })
    .catch((error )=>{
        console.log('Error', error)
    });


}


const _createOpenAIInstance = async () => {
    
    return new OpenAI({apiKey:'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'});
}


module.exports ={
    askToChatGpt
}