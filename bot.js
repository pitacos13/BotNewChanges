const botToken = "5364174942:AAHPLDmFdHypkQ2krA1vGYrg8vP5iC_BCkA"//OLF//NEW TOKEN
const {Telegraf} = require("telegraf")
const bot = new Telegraf(botToken)
const db = require("./db/db")
const Reds = require("./db/model/Reds")
const Greens = require("./db/model/Greens")
process.env.TZ = 'America/Sao_Paulo';
console.log(new Date(Date.now()).toLocaleDateString("pt-BR"))
db()

setInterval(()=>{
    try{
        if(new Date(Date.now()).toLocaleTimeString("pt-BR") == "08:00:00" || new Date(Date.now()).toLocaleTimeString("pt-BR") == "16:00:00" || new Date(Date.now()).toLocaleTimeString("pt-BR") == "23:59:59"){
            verifyExist()
        } 
    }catch(e){
        bot.telegram.sendMessage(534824454, e.message)
    }  
},1000)

bot.on("new_chat_members", async(ctx)=>{
    try{
    if(await Reds.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Reds.create({group:"Vip",reds:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Greens.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Greens.create({group:"Vip", greens:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Reds.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Reds.create({group:"Free",reds:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Greens.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Greens.create({group:"Free", greens:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    let green = 0.5
    let red = 3.5
    let totallyOfRedsOfDayVip = await Reds.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsOfDayFree = await Reds.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsVip = await Reds.find({group:"Vip"})
    let totallyOfRedsFree = await Reds.find({group:"Free"})
    let tRedVip = 0;
    let tRedFree = 0;
    let totOfRedBlanceFree = 0;
    let totOfRedBlanceVip = 0;
    for(let red of totallyOfRedsVip){
        tRedVip = tRedVip+red.reds
        totOfRedBlanceVip = totOfRedBlanceVip+red.balancte
    }
    for(let red of totallyOfRedsFree){
        tRedFree = tRedFree+red.reds
        totOfRedBlanceFree = totOfRedBlanceFree+red.balance
    }
    let totallyOfGreensOfDayVip = await Greens.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensOfDayFree = await Greens.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensVip = await Greens.find({group:"Vip"})
    let totallyOfGreensFree = await Greens.find({group:"Free"})
    let tGreenBalanceVip = 0;
    let tGreenBalanceFree = 0;
    let totGreensVip = 0;
    let totGreensFree = 0;
    for(let green of totallyOfGreensVip){
        tGreenBalanceVip = tGreenBalanceVip+green.balance 
        totGreensVip += green.greens
    }
    for(let green of totallyOfGreensFree){
        tGreenBalanceFree = tGreenBalanceFree+green.balance 
        totGreensFree += green.greens
    }
    let wordVip = tRedVip + totGreensVip == 1?"ENTRADA":"ENTRADAS"
    let wordTwoVip = totallyOfRedsOfDayVip.reds + totallyOfRedsOfDayVip.reds == 1?"ENTRADA":"ENTRADAS"
    let wordFree = tRedFree + totGreensFree == 1?"ENTRADA":"ENTRADAS"
    let wordTwoFree = totallyOfRedsOfDayFree.reds + totallyOfRedsOfDayFree.reds == 1?"ENTRADA":"ENTRADAS"
    if(ctx.chat.id == -1001584014524){
        await bot.telegram.sendMessage(-1001584014524, `📌 RELATÓRIO\r\n✅ ${totGreensVip}\r\n⛔ ${tRedVip}\r\n${totGreensVip+tRedVip} ${wordVip} NO TOTAL\r\n${isNaN((((totGreensVip)/(tRedVip+totGreensVip))*100).toFixed(2))?"0.00":(((totGreensVip)/(tRedVip+totGreensVip))*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n📌 RESUMO DIA ${new Date(Date.now()).toLocaleDateString("pt-BR")}\r\n✅ ${totallyOfGreensOfDayVip.greens}\r\n\⛔️ ${totallyOfRedsOfDayVip.reds}\r\n${totallyOfGreensOfDayVip.greens+totallyOfRedsOfDayVip.reds} ${wordTwoVip} NO TOTAL\r\n${isNaN((totallyOfGreensOfDayVip.greens/(totallyOfRedsOfDayVip.reds+totallyOfGreensOfDayVip.greens)*100).toFixed(2))?"0.00":(totallyOfGreensOfDayVip.greens/(totallyOfRedsOfDayVip.reds+totallyOfGreensOfDayVip.greens)*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n💰 Lucro acumulado:💰${(tGreenBalanceVip-totOfRedBlanceVip)}%\r\n\r\nAtualizado em tempo real.`)
    }else if(ctx.chat.id == -1001589546462){
        await bot.telegram.sendMessage(-1001589546462, `📌 RELATÓRIO\r\n✅ ${totGreensFree}\r\n⛔ ${tRedFree}\r\n${totGreensFree+tRedFree} ${wordFree} NO TOTAL\r\n${isNaN((((totGreensFree)/(tRedFree+totGreensFree))*100).toFixed(2))?"0.00":(((totGreensFree)/(tRedFree+totGreensFree))*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n📌 RESUMO DIA ${new Date(Date.now()).toLocaleDateString("pt-BR")}\r\n✅ ${totallyOfGreensOfDayFree.greens}\r\n\⛔️ ${totallyOfRedsOfDayFree.reds}\r\n${totallyOfGreensOfDayFree.greens+totallyOfRedsOfDayFree.reds} ${wordTwoFree} NO TOTAL\r\n${isNaN((totallyOfGreensOfDayFree.greens/(totallyOfRedsOfDayFree.reds+totallyOfGreensOfDayFree.greens)*100).toFixed(2))?"0.00":(totallyOfGreensOfDayFree.greens/(totallyOfRedsOfDayFree.reds+totallyOfGreensOfDayFree.greens)*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n💰 Lucro acumulado:💰${(tGreenBalanceFree-totOfRedBlanceFree)}%\r\n\r\nAtualizado em tempo real.`)  
    }
}catch(e){
    bot.telegram.sendMessage(534824454, e.message)
}  
})
let decrement = "⛔"
let accrement = "✅";
var Double = require("mongodb").Double;

async function verifyExist(){
    try{
    if(await Reds.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Reds.create({group:"Vip",reds:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Reds.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Reds.create({group:"Free",reds:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Reds.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Reds.create({group:"Bot",reds:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Greens.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Greens.create({group:"Vip", greens:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Greens.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Greens.create({group:"Free", greens:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    if(await Greens.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
        await Greens.create({group:"Bot", greens:0, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(0.0)})
    }
    await sendAlert()
}catch(e){
    bot.telegram.sendMessage(534824454, e.message)
}  
}
bot.on("message", (ctx)=>{
    if(ctx.message.text == "/pronto"){
        return verifyExist()
    }
})

async function sequenceOfGreens(Group, Point){
    let totallyOfRedsOfDayVip = await Reds.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsOfDayFree = await Reds.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensOfDayVip = await Greens.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensOfDayFree = await Greens.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    // Bot and vip
    const sequence = require(`./db/model/Sequence${Group}`)
    let sequenceOfDay = await sequence.findOne({finished:false})

    if(sequenceOfDay){
        if(Point == "negative"){
            if(sequenceOfDay.greens >= 12 && sequenceOfDay.finished == false){
                await sequence.findOneAndUpdate({finished:false}, {finished:true})
            }else{
                await sequence.findOneAndRemove({finished:false})
            }
        }else{
            await sequence.findOneAndUpdate({finished:false}, {greens:sequenceOfDay.greens+1})
            sequenceOfDay = await sequence.findOne({finished:false})
            if(sequenceOfDay.greens >= 12){
                let groups = {Bot:-1001731216185, Vip:-1001584014524}
                async function getBigGreen(){
                    let bigGreenOfMonth = await sequence.find()
                    let filterMonth = bigGreenOfMonth.filter((value)=>{
                        let resolveSpl = value.date.split('/')
                        let month = resolveSpl[1]
                        let year = resolveSpl[2]
                        let newDateValue = `${month}/${year}`
                        let newDate = new Date().toLocaleDateString('pt-BR')
                        let resolveNewDate = newDate.split("/")
                        let newDateLocale = `${resolveNewDate[1]}/${resolveNewDate[2]}`
                        return newDateValue == newDateLocale
                    })
                    let allGreens = []
                    for(let values of filterMonth){
                        allGreens.push(values.greens)
                    }
                    let bigValue = 0;
                    for(let i in allGreens){
                        if(allGreens[i] > bigValue){
                            bigValue = allGreens[i]
                        }
                    }
                    return bigValue
                }
                let bigValue;
                await getBigGreen().then((r)=>{
                    bigValue = r
                })
                function getHours(dateOne, dateTwo){
                    console.log(dateTwo.getTime())
                    var diff = (dateOne - dateTwo.getTime()) / 1000;
                    diff /= (60 * 60);
                    return Math.abs(Math.round(diff));
                }
                // Pitabot = Free
                let percentOfDay;
                if(Group == "Bot"){
                    percentOfDay = isNaN((((totallyOfGreensOfDayFree.balance)/(totallyOfRedsOfDayFree.balance+totallyOfGreensOfDayFree.balance))*100).toFixed(2))?"0.00":(((totallyOfGreensOfDayFree.balance)/(totallyOfRedsOfDayFree.balance+totallyOfGreensOfDayFree.balance))*100).toFixed(2)
                }else{
                    percentOfDay = isNaN((((totallyOfGreensOfDayVip.balance)/(totallyOfRedsOfDayVip.balance+totallyOfGreensOfDayVip.balance))*100).toFixed(2))?"0.00":(((totallyOfGreensOfDayVip.balance)/(totallyOfRedsOfDayVip.balance+totallyOfGreensOfDayVip.balance))*100).toFixed(2)
                }
                await bot.telegram.sendMessage(groups[Group], `🤖 PITABOT 🤖\r\n\r\n🔥 ${sequenceOfDay.greens} GREENS seguidos atualmente\r\n\r\n🕐 ${getHours(sequenceOfDay.hourStarted, new Date())} ${getHours(sequenceOfDay.hourStarted, new Date()) == 1?"HORA":"HORAS"} seguidas sem RED\r\n\r\n🚀 ${bigValue} GREENS seguidos é a maior sequencia do mês\r\n\r\n✅ ${percentOfDay}% DE ASSERTIVIDADE no dia até o momento\r\n\r\n⚠️ Gestão & Meta SEMPRE`)
            }
        }
    }else{
        Point != "negative"?await sequence.create({date:new Date().toLocaleDateString("pt-BR"), greens:1, finished:false, hourStarted:new Date().getTime()}):""
    }
}


async function sendAlert(){
    try{
        let green = 0.5
    let red = 3.5

    // FREE AND VIP
    let totallyOfRedsOfDayVip = await Reds.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsOfDayFree = await Reds.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsVip = await Reds.find({group:"Vip"})
    let totallyOfRedsFree = await Reds.find({group:"Free"})
    let tRedVip = 0;
    let tRedFree = 0;
    let totOfRedBlanceFree = 0;
    let totOfRedBlanceVip = 0;
    for(let red of totallyOfRedsVip){
        tRedVip = tRedVip+red.reds
        totOfRedBlanceVip = totOfRedBlanceVip+red.balance
    }
    for(let red of totallyOfRedsFree){
        tRedFree = tRedFree+red.reds
        totOfRedBlanceFree = totOfRedBlanceFree+red.balance
    }


    //----------
    let totallyOfGreensOfDayVip = await Greens.findOne({group:"Vip", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensOfDayFree = await Greens.findOne({group:"Free", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfGreensVip = await Greens.find({group:"Vip"})
    let totallyOfGreensFree = await Greens.find({group:"Free"})
    let tGreenBalanceVip = 0;
    let tGreenBalanceFree = 0;
    let totGreensVip = 0;
    let totGreensFree = 0;
    for(let green of totallyOfGreensVip){
        tGreenBalanceVip = tGreenBalanceVip+green.balance 
        totGreensVip += green.greens
    }
    for(let green of totallyOfGreensFree){
        tGreenBalanceFree = tGreenBalanceFree+green.balance 
        totGreensFree += green.greens
    }

    //-----------
    let wordVip = tRedVip + totGreensVip == 1?"ENTRADA":"ENTRADAS"
    let wordTwoVip = totallyOfRedsOfDayVip.reds + totallyOfRedsOfDayVip.reds == 1?"ENTRADA":"ENTRADAS"
    let wordFree = tRedFree + totGreensFree == 1?"ENTRADA":"ENTRADAS"
    let wordTwoFree = totallyOfRedsOfDayFree.reds + totallyOfRedsOfDayFree.reds == 1?"ENTRADA":"ENTRADAS"
    //VIP
    await bot.telegram.sendMessage(-1001584014524, `🤖 PITABOT 🤖\r\n🗓️ RELÁTORIO ${new Date().toLocaleDateString("pt-BR")}\r\n\r\n📳 SINAIS ENVIADOS: ${totallyOfGreensOfDayVip.greens+totallyOfRedsOfDayVip.reds}\r\n✅ GREENS: ${totallyOfGreensOfDayVip.greens}\r\n⛔ REDS: ${totallyOfRedsOfDayVip.reds}\r\n\r\n🎯 ASSERTIVIDADE do dia: ${isNaN((((totallyOfGreensOfDayVip.balance)/(totallyOfRedsOfDayVip.balance+totallyOfGreensOfDayVip.balance))*100).toFixed(2))?"0.00":(((totallyOfGreensOfDayVip.balance)/(totallyOfRedsOfDayVip.balance+totallyOfGreensOfDayVip.balance))*100).toFixed(2)}%`)
   
   
    //METHOD PITABOT
    //PITABOT
    let totallyOfGreensOfDayBot = await Greens.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallyOfRedsOfDayBot = await Reds.findOne({group:"Bot", date:new Date(Date.now()).toLocaleDateString("pt-BR")})
    let totallySign = totallyOfGreensOfDayBot.greens+totallyOfRedsOfDayBot.reds
    await bot.telegram.sendMessage(-1001731216185, `🤖 PITABOT 🤖\r\n🗓️ RELÁTORIO ${new Date().toLocaleDateString("pt-BR")}\r\n\r\n📳 SINAIS ENVIADOS: ${totallySign == undefined?0:totallySign}\r\n✅ GREENS: ${totallyOfGreensOfDayBot.greens == undefined?0:totallyOfGreensOfDayBot.greens}\r\n⛔ REDS: ${totallyOfRedsOfDayBot.reds == undefined?0:totallyOfRedsOfDayBot.reds}\r\n\r\n🎯 ASSERTIVIDADE do dia: ${isNaN((((totallyOfGreensOfDayBot.balance)/(totallyOfRedsOfDayBot.balance+totallyOfGreensOfDayBot.balance))*100).toFixed(2))?"0.00":(((totallyOfGreensOfDayBot.balance)/(totallyOfRedsOfDayBot.balance+totallyOfGreensOfDayBot.balance))*100).toFixed(2)}%`)

   
   
    //FREE
    await bot.telegram.sendMessage(-1001589546462, `📌 RESUMO MENSAL\r\n✅ ${totGreensFree}\r\n⛔ ${tRedFree}\r\n${totGreensFree+tRedFree} ${wordFree} NO TOTAL\r\n${isNaN((((totGreensFree)/(tRedFree+totGreensFree))*100).toFixed(2))?"0.00":(((totGreensFree)/(tRedFree+totGreensFree))*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n📌 RESUMO DIA ${new Date(Date.now()).toLocaleDateString("pt-BR")}\r\n✅ ${totallyOfGreensOfDayFree.greens}\r\n\⛔️ ${totallyOfRedsOfDayFree.reds}\r\n${totallyOfGreensOfDayFree.greens+totallyOfRedsOfDayFree.reds} ${wordTwoFree} NO TOTAL\r\n${isNaN((totallyOfGreensOfDayFree.greens/(totallyOfRedsOfDayFree.reds+totallyOfGreensOfDayFree.greens)*100).toFixed(2))?"0.00":(totallyOfGreensOfDayFree.greens/(totallyOfRedsOfDayFree.reds+totallyOfGreensOfDayFree.greens)*100).toFixed(2)}% TAXA DE ACERTO\r\n\r\n💰 Lucro acumulado:💰${(tGreenBalanceFree-totOfRedBlanceFree)}%\r\n\r\nAtualizado em tempo real.`)
}catch(e){
    bot.telegram.sendMessage(534824454, e.message)
}  
}

bot.on("edited_message", async(ctx)=>{
    let points = ["negative", "positive"]
    try{
    let groupVip = -1001584014524
    let groupName;
    if(ctx.chat.id == groupVip){
        groupName = "Vip"
    }else{
        return
    }
    if(ctx.editedMessage.text.includes(decrement)){
    let valuesAlloweds = {1:0.5, 2:1.5, 3:3.5}
    let finded = ctx.editedMessage.text.match(new RegExp("⛔", "g")).length
    let valueRetrived = finded
    let valueLocated = 0;
    for(let i = 0; i < valueRetrived; i++){
        valueLocated += valueLocated + 0.5
    }
        if(await Reds.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
            await Reds.create({reds:1, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(valueLocated), group:groupName})
        }else{
            let findActuallyResult = await Reds.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")})
            await Reds.findOneAndUpdate({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR"), group:groupName}, {reds:findActuallyResult.reds + 1, balance:new Double(findActuallyResult.balance)+new Double(valueLocated)})
        }
        await sequenceOfGreens("Vip", points[0])
    }else if(ctx.editedMessage.text.includes(accrement)){
        let valuesAlloweds = 0.5
        let valueLocated = valuesAlloweds
        if(await Greens.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
            await Greens.create({greens:1, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(valuesAlloweds), group:groupName})
        }else{
            let findActuallyResult = await Greens.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")})
            await Greens.findOneAndUpdate({date:new Date(Date.now()).toLocaleDateString("pt-BR"), group:groupName}, {greens:findActuallyResult.greens + 1, balance:findActuallyResult.balance+new Double(valueLocated)})
        }
        await sequenceOfGreens("Vip", points[1])
    }
}catch(e){
    bot.telegram.sendMessage(534824454, e.message)
}  

})
bot.on("edited_channel_post", async(ctx)=>{
    let points = ["negative", "positive"]
    //BOT GROUP
    try{
    let groupVip = -1001589546462
    let groupBot = -1001731216185
    let groupName;
    
    if(ctx.chat.id == groupVip){
        groupName = "Free"
    }else if(ctx.chat.id == groupBot){
        groupName = "Bot"
    }else{
        return
    }
    if(ctx.editedChannelPost.text.includes(decrement)){
    let finded = ctx.editedChannelPost.text.match(new RegExp("⛔", "g")).length
    let valueRetrived = finded
    let valueLocated = 0;
    for(let i = 0; i < valueRetrived; i++){
        valueLocated += valueLocated + 0.5
    }
        if(await Reds.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
            await Reds.create({reds:1, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(valueLocated), group:groupName})
        }else{
            let findActuallyResult = await Reds.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")})
            await Reds.findOneAndUpdate({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR"), group:groupName}, {reds:findActuallyResult.reds + 1, balance:new Double(findActuallyResult.balance)+new Double(valueLocated)})
        }
        if(groupName == "Bot"){
            await sequenceOfGreens("Bot", points[0])
        }

    }else if(ctx.editedChannelPost.text.includes(accrement)){
        let valuesAlloweds = 0.5
        let valueLocated = valuesAlloweds
        if(await Greens.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")}) == null){
            await Greens.create({greens:1, date:new Date(Date.now()).toLocaleDateString("pt-BR"), balance:new Double(valuesAlloweds), group:groupName})
        }else{
            let findActuallyResult = await Greens.findOne({group:groupName, date:new Date(Date.now()).toLocaleDateString("pt-BR")})
            await Greens.findOneAndUpdate({date:new Date(Date.now()).toLocaleDateString("pt-BR"), group:groupName}, {greens:findActuallyResult.greens + 1, balance:findActuallyResult.balance+new Double(valueLocated)})
        }
        if(groupName == "Bot"){
            await sequenceOfGreens("Bot", points[1])
        }
    }
}catch(e){
    bot.telegram.sendMessage(534824454, e.message)
}  
})
bot.launch()
