import { Router } from 'express'

const router = Router()

const data = []

router.get("/", (req, res) => {
    return res.status(200).send("<h2>Servidor em funcionamento</h2>")
})

router.get("/users", (req, res) => {
    return res.status(200).json(data)
})

router.get("/user/:cpf", (req, res) => {
    const { cpf } = req.params
    //console.log("cpf do usuario: " + cpf)

    const findCpf = data.find(cpfuser => cpfuser.cpf === cpf)
    //console.log(findCpf)

    if(!findCpf){
        return res.status(400).json({ err: "Usuario não encontrado" })
    }

    return res.status(200).json(findCpf)
})

router.post("/user", (req, res) => {
    const { name, cpf } = req.body

    if(name === '' || cpf === ''){
        return res.status(400).json({err: "Valores vazios"})
    }

    const idUser = Math.random()

    let dataUser = {
        id: idUser,
        name: name,
        cpf: cpf,
        created_at: new Date()
    }

    data.push(dataUser)

    return res.status(201).json({ success: "Criado com sucesso"})
})

router.put("/user/:cpf", (req, res) => {
    const { cpf } = req.params
    const { name } = req.body

    const findUserCpf = data.find(cpfUser => cpfUser.cpf === cpf)

    if(!findUserCpf){
        return res.status(400).json({ err: "Usuario não encontrado"})
    }

    data.push(findUserCpf.name = name)

    return res.status(201).json({ success: "Atualisado com sucesso"})
})

router.delete("/user/:cpf", (req, res) => {
    const { cpf } = req.params

    const findUserCpf = data.find(cpfUser => cpfUser.cpf === cpf)
    console.log(findUserCpf)

    if(!findUserCpf){
        return res.status(400).json({ err: "Usuario não encontrado"})
    }

    data.splice(findUserCpf, 1)

    return res.status(200).json({ success: "Usuario Excluido com Sucesso"})

})

export { router }