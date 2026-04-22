var session2 = pl.create();
var show = function (answer) {
    console.log(session2.format_answer(answer))
};


const RenderCustomers = async (customers,session) =>{
    queryCustomers(session).then(x => {
        x.forEach(e =>{
            RenderCustomer(e)
        })
    })
}

const RenderCustomer = async(customer) =>{


    const cardContainer = document.getElementById(`MainContainer`)

    const card = document.createElement(`div`)
    card.classList.add(`card`)

    const title = document.createElement(`h3`)
    title.id = `cardTitle`
    title.textContent = `Filler`
    card.appendChild(title)
}

async function queryCustomers(session){
    let answers = [];
    await session.promiseConsult("../test.pl");
    await session.promiseQuery("customer(Id,Name,Email,Phone,Status).");

    for await (let answer of session.promiseAnswers())
        answers.push(answer);
    return answers
}


async function test(sesion){
    x = [];
    await sesion.promiseConsult("../test.pl");
    await sesion.promiseQuery("customer(Id,Name,Email,Phone,Status).");
    t = await sesion.promiseAnswers()
    
    for await(let n of t){
        x.push(n)
    }

    return x;
}

test(session2).then(x=>{
    console.log(x)
    for (let n of x){
         console.log(n.lookup("Email"))
    }
})

// queryCustomers(session2).then(x =>{
//     x.forEach(e =>{
//         console.log(e.links.Email.args)
        
//     })
// })

// const test = await queryCustomers(session2);
// console.log(test)
// test.forEach(element => {
//      show(element)
// });

// session2.consult("../test.pl",
//     {success: function() {
//         session2.query("customer(Id,Name,Email,Phone,Status).",{
//             success: function(goal){
//                 session2.answer({
//                     success: function(answer){

//                     },
//                     error: function(err){console.log(`Failure due to: ${err}`)},
//                     fail: function() {console.log('no more answers')},
//                     limit: function(){console.log('limit exceeded')},
//             });},
//                 error: function(err){console.log(`Failure due to: ${err}`)}
// });},
//     error: function(err) {console.log(`Failure due to: ${err}`)}, 
// });