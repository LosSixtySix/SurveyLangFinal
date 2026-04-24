


var show = function (answer) {
    console.log(session.format_answer(answer))
};
async function convertToDict(t,session){
    let listOfCustomerDicts = []
    for await (let e of t){
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
        listOfCustomerDicts.push(dict)
    }

return listOfCustomerDicts;
}

async function queryAllCustomers(){
    var session = pl.create();
    await session.promiseConsult(`../customerDB/customers.pl`);
    await session.promiseQuery("customer(Id,Name,Email,Phone,Status).");
    
    let answers = await session.promiseAnswers()
    
    let customersAsListOfDicts= await convertToDict(answers,session)
    
    RenderCustomers(customersAsListOfDicts,"CardContainer")
}
async function queryCustomerByID(Id){
    var session = pl.create();
    await session.promiseConsult(`../customerDB/customers.pl`)
    await session.promiseQuery(`customer(${Id},Name,Email,Phone,Status).`)
    let answers = await session.promiseAnswers()

    let customerAsListOfDicts = await convertToDict(answers,session)

    customerAsListOfDicts[0]["Id"] = Id

    RenderCustomers(customerAsListOfDicts,"SearchCustomerContainer")

}
async function createCustomer(Name,Email,Phone,Address){
    var session = pl.create();
    await session.promiseConsult(`../customerDB/customerRules.pl`)
    await session.promiseQuery(`create_customer(${Name},${Email},${Phone},${Address}).`)

    await session.promiseAnswers()
}

// createCustomer('Test','Test',111,'Test')

//This Function is not working...Need to figure that out
async function queryCustomersByPaid(){
    var session = pl.create()

    await session.promiseConsult(`../customerDB/customers.pl`)
    await session.promiseConsult(`../customerDB/customerBill.pl`)

    await session.promiseQuery(`bill_sum(Id,Ammount).`)

    let answers = await session.promiseAnswers()

    let customersAsListOfDicts = await convertToDict(answers,session)

    RenderCustomers(customersAsListOfDicts,"CustomersPaidContainer")

}  


async function RenderCustomers(customers,container){
    if(container === "CustomersPaidContainer"){
        for await(let n of customers){
            RenderPaidCustomer(n)
        }
    }else{
        for await(let n of customers){
            RenderCustomer(n,container)
        }
    }
   
    
}
const RenderPaidCustomer = (customer) =>{
    const cardContainer = document.getElementById("CustomersPaidContainer")
    const card = document.createElement(`div`)
    card.classList.add(`card`)

    const title = document.createElement(`h3`)
    title.id = `cardTitle`
    title.textContent = `Customer Id: ${customer["Id"]}`
    card.appendChild(title)

    const cardText = document.createElement(`div`)
    cardText.classList.add(`card-text`)

    const cardTotalAmount = document.createElement(`p`)
    cardTotalAmount.classList.add(`infoSection`)
    cardTotalAmount.textContent = `Owes: \$${customer["Ammount"]}`
    cardText.appendChild(cardTotalAmount)

    card.appendChild(cardText)
    cardContainer.appendChild(card)

}
const RenderCustomer = (customer,container) =>{
    const cardContainer = document.getElementById(container)
    const card = document.createElement(`div`)
    card.classList.add(`card`)

    const title = document.createElement(`h3`)
    title.id = `cardTitle`
    title.textContent = customer["Name"]
    card.appendChild(title)

    const cardText = document.createElement('div')
    cardText.classList.add(`card-text`)

    const cardId = document.createElement(`p`)
    cardId.classList.add(`infoSection`)
    cardId.textContent = `ID: ${customer["Id"]}`
    cardText.appendChild(cardId)

    const cardEmail = document.createElement(`p`)
    cardEmail.classList.add(`infoSection`)
    cardEmail.textContent = `Email: ${customer["Email"]}`
    cardText.appendChild(cardEmail)

    const cardPhone = document.createElement(`p`)
    cardPhone.classList.add(`infoSection`)
    cardPhone.textContent = `Phone: ${customer["Phone"]}`
    cardText.appendChild(cardPhone)

    const cardStatus = document.createElement(`p`)
    cardStatus.classList.add(`infoSection`)
    cardStatus.textContent = `Active: ${customer["Status"]}`
    cardText.appendChild(cardStatus)



    card.appendChild(cardText)
    cardContainer.appendChild(card)
    
}
queryAllCustomers();
queryCustomersByPaid()
queryCustomerByID(1)


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