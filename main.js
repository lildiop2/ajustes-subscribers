// #########################################################################################
// #  __      ______ _____ _____ ______ __  __          _   _          _____ ______ _____  # 
// # \ \    / / __ \_   _/ ____|  ____|  \/  |   /\   | \ | |   /\   / ____|  ____|  __ \  #
// #  \ \  / / |  | || || |    | |__  | \  / |  /  \  |  \| |  /  \ | |  __| |__  | |__) | #
// #   \ \/ /| |  | || || |    |  __| | |\/| | / /\ \ | . ` | / /\ \| | |_ |  __| |  _  /  #
// #    \  / | |__| || || |____| |____| |  | |/ ____ \| |\  |/ ____ \ |__| | |____| | \ \  #
// #     \/   \____/_____\_____|______|_|  |_/_/    \_\_| \_/_/    \_\_____|______|_|  \_\ #                                                                         #
// #                                                                                       #
// # Autor: Abdul Kevin Alexis                                                             #
// # Descrição: Script para alteração de pacotes dos usuarios                              #
// # Data: 13/04/2022 23:32                                                                #
// #                                                                                       #
// #########################################################################################



const axios = require('axios')
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

//insira aqui o token gerado no portal https://developer.webex.com/
token = "YjI5Yjk4NjgtZjVhNS00MWRiLTgwZWMtZWJjZWVhNmQ2MmM2ZWUyNTYxYjktNWEz_P0A1_4c3ee1a9-bda3-48ce-aa65-3af7db8a5c3a"

axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
axios.defaults.headers.common['Content-Type'] = 'application/json'

//ler CSV

fs.createReadStream(path.resolve(__dirname, './', 'ajustapacote.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async(row) => {

        console.log(row.email)
        const res = await axios.get("https://webexapis.com/v1/broadworks/subscribers?userId=" + row.email)
            // let json={
            //                 //     "userId": this.subscriber.userId,
            //                 //     "firstName": this.subscriber.firstName,
            //                 //     "lastName": this.subscriber.lastName,
            //                 //     "primaryPhoneNumber": this.subscriber.primaryPhoneNumber,
            //                 //     "language": "pt",
            //                 //     "timezone": "America/Sao_Paulo",
            //                 //     "package": this.subscriber.package
            //                 //     }
        let payload = { "package": "basic" }

        //atualizar subcribers
        const resultado = await axios.put("https://webexapis.com/v1/broadworks/subscribers/" + res.data.items[0].id, payload)
        console.log(`${resultado.status}-${resultado.data.userId}-${resultado.data.id}-${resultado.data.status}`)

    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));









//faça informando apenas a empresa.

//insira aqui o nome da empresa de acordo com a cadastro no Broadworks
spEnterpriseId = "EMP_TESTE"

// setTimeout(async() => {

//     let res;
//     try {
//         let vetor = new Array();

//         let i = 0;
//         do {
//             res = await axios.get("https://webexapis.com/v1/broadworks/subscribers?max=100&offset=" + i + "&spEnterpriseId=" + spEnterpriseId);
//             res.data.items.forEach(element => {
//                 vetor.push(element)
//             });

//             i += 100

//         } while (res.headers["link"] !== undefined && res.headers.link.indexOf("next") != -1)

//         if (vetor.length != 0) {
//             console.log("Carregamento finalizado")
//                 // console.log(vetor)
//             for (const subscriber of vetor) {
//                 // let json={
//                 //     "userId": this.subscriber.userId,
//                 //     "firstName": this.subscriber.firstName,
//                 //     "lastName": this.subscriber.lastName,
//                 //     "primaryPhoneNumber": this.subscriber.primaryPhoneNumber,
//                 //     "language": "pt",
//                 //     "timezone": "America/Sao_Paulo",
//                 //     "package": this.subscriber.package
//                 //     }
//                 let payload = { "package": "basic" }

//                 //atualizar subcribers
//                 const estado = await axios.put("https://webexapis.com/v1/broadworks/subscribers/" + subscriber.id, payload)
//                 console.log(`${estado.status}-${estado.data.userId}-${estado.data.id}-${estado.data.status}`)

//                 // json = {
//                 //         "emails": [
//                 //             this.subscriber.userId
//                 //         ],
//                 //         "phoneNumbers": [{
//                 //             "type": "work",
//                 //             "value": this.subscriber.primaryPhoneNumber
//                 //         }],

//                 //         "displayName": this.subscriber.firstName + " " + this.subscriber.lastName,

//                 //     }
//                 //     //atualizar people
//                 // axios.put("https://webexapis.com/v1/people/" + this.subscriber.personId, json)
//                 //     .then((res) => {

//                 //     })

//             }

//         } else {
//             console.log("Essa empresa não existe ou não tem usuarios")
//         }



//     } catch (error) {
//         console.log(error)
//     }





// }, 10);