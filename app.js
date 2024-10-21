require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ejs = require("ejs")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});




app.post("/", function (req, res) {
    async function abc() {
    
    const formData = req.body;
    

    const firstCourse = formData.test1;
    const secondCourse = formData.test2;
    const education = formData.education;
    const technologies = formData.technologies;
    const level = formData.level;
    const projects = formData.projects;


  
        const genAI = new GoogleGenerativeAI(process.env.Google_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro	" });
        const prompt = `Education:${education} ,skills:${technologies} , Level: ${level} , Projects_done:${projects},Desired: ${firstCourse} or ${secondCourse}} Based on my education ,skills,level which career should i opt for ${firstCourse} or ${secondCourse} ,dont give me any comparison tell me only one branch to select , and just tell me one branch in one sentence with no furthur explaination and dont highlight the carren with ** `;
        const result = await model.generateContent(prompt);
       var chirag=result.response.text();
       
       const prompt_2=`${chirag}  see this was a suggestion given to me by my friend i need to you give me best 5 free course with link to master this course give me in hierarchical order from beginner to advance and make sure to fetch latest courses , no need description just 5 courses with link in 5 lines , just give me 5 course with link `
       const result_2=await model.generateContent(prompt_2);
       var bharath =result_2.response.text();
       res.render("submit",{chirag , bharath});
       console.log(bharath)
       
    }
    abc().catch(function(error){
        console.error(error);
        res.status(500).send("Something went wrong!");
    });

});

   


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
