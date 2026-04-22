

var session = pl.create();
var show = function (answer) {
    console.log(session.format_answer(answer))
};
let listOfDicts = []
async function queryCustomers(sesion){
    let x = [];
    await sesion.promiseConsult("../test.pl");
    await sesion.promiseQuery("customer(Id,Name,Email,Phone,Status).");
    let t = await sesion.promiseAnswers()
    
    for await(let n of t){
        x.push(n)
    }

    return x;
}

let x = await queryCustomers(session);
for await (let e of x){
    let keys = []
    let values = []
    let splitString = session.format_answer(e).split(" ")
    splitString = splitString.filter(s => s!=="=")
    for(let i = 0; i < splitString.length; i++){
        splitString[i] = splitString[i].replaceAll(",","")
        splitString[i] = splitString[i].replaceAll("[","")
        splitString[i] = splitString[i].replaceAll("]","")
        if (i%2 === 0){
            keys.push(splitString[i])
        }else{
            values.push(splitString[i])
        }
    }
    let dict = {}
    for(let i = 0;i <keys.length;i++){
        dict[keys[i]] = values[i]

    }
    listOfDicts.push(dict)
}

async function RenderCustomers(customers){
    for await(let n of customers){
        RenderCustomer(n)
    }
    
}

const RenderCustomer = (customer) =>{
    const cardContainer = document.getElementById(`MainContainer`)

    const card = document.createElement(`div`)
    card.classList.add(`card`)

    const title = document.createElement(`h3`)
    title.id = `cardTitle`
    title.textContent = customer["Name"]
    card.appendChild(title)

    cardContainer.appendChild(card)
    console.log("I did this")
}

RenderCustomers(listOfDicts)

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