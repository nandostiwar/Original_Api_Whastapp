import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Hola, Bienvenido a tu cuidador digital')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3003)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const phone = req.body.phone
        const message = req.body.message
        const mediaUrl = req.body.mediaUrl
        await bot.sendMessage(phone, message, { media: mediaUrl })
        res.end("Esto es del server de cuidador digital")
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()