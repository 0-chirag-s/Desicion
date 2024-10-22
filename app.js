require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ejs = require("ejs")
const{ HfInference } = require('@huggingface/inference')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// app.get("/", function(req, res) {
//     async function query(data) {
//         const response = await fetch(
//           "https://api-inference.huggingface.co/models/renderartist/toyboxflux",
//             {
//                 headers: {
//                     Authorization: "Bearer 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",
//                     "Content-Type": "application/json",
//                 },
//                 method: "POST",
//                 body: JSON.stringify(data),
//             }
//         );

//         // Check if the response is okay before processing
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.arrayBuffer(); // Use arrayBuffer for image data
//         const buffer = Buffer.from(result); // Create a Buffer from the ArrayBuffer
//         const base64 = buffer.toString('base64'); // Convert buffer to base64
//         return `data:image/png;base64,${base64}`; // Return as data URL
//     }

//     query({"inputs": "create a roadmap to kick start my carrer in AI domain  "}).then((objecturl) => {
//         res.render("submit", { objecturl });
//     }).catch((error) => {
//         console.error(error);
//         res.status(500).send('Error fetching the image');
//     });
// });









app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});




app.post("/", function (req, res) {
    async function abc() {
    
    const formData = req.body;
    

    const firstCourse = formData.test1;
   
    const education = formData.education;
    const technologies = formData.technologies;
    const level = formData.level;
    const projects = formData.projects;


  
        const genAI = new GoogleGenerativeAI(process.env.Google_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro	" });
        const prompt = `Education:${education} ,skills:${technologies} , Level: ${level} , Projects_done:${projects}, Based on my education ,skills,level which career should i opt for ${firstCourse}  ,dont give me any comparison tell me only one branch to select , and just tell me one branch in one sentence with no furthur explaination and dont highlight the carren with ** and i need just one word as output `;
        const result = await model.generateContent(prompt);
       var chirag=result.response.text();
       
       const prompt_2=`${chirag}  see this was a suggestion given to me by my friend i need to you give me best 5 free course with link to master this course give me in hierarchical order from beginner to advance and make sure to fetch latest courses , no need description just 5 courses with link in 5 lines , just give me 5 course with link `
       const result_2=await model.generateContent(prompt_2);
       var bharath =result_2.response.text();
       const prompt_3=` for my  ${chirag} carrere ,give me  5 trending projects to harness my skills and my knowledge level is ${level}  `
       const result_3=await model.generateContent(prompt_3)
       const project =result_3.response.text();



       res.render("submit",{chirag , bharath , project});
       console.log(project)
       
    }
    abc().catch(function(error){
        console.error(error);
        res.status(500).send("Something went wrong!");
    });

});

   


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
