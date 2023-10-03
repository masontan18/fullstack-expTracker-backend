import prisma from "../src/utils/prisma.js"

const getAllExpenses = async (req,res) => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: {
                id: "asc"
            }
        })
        res.json(expenses)
    } catch (err) {
        console.log(err)
    }
}

const addExpense = async (req, res) => {
    try {
        const { title, userId, amount, date } = req.body
        if (!title || !userId || !amount || !date) return res.status(400).json({ "message": "userId, title, amount, date are required" })
        
        const result = await prisma.expense.create({
            data: {
                userId,
                title,
                amount,
                date,
            }
        })
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
    }
}

const updateExpense = async (req, res) => {
    try {
        const { id, title, amount, date } = req.body
        if (!id) return res.status(400).json({ "message": "id is required for updateExpense" })
        const result = await prisma.expense.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                amount,
                date
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
    }

}

const deleteExpense = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ "message": "id is required"})
    const foundExpense = await prisma.expense.findFirst({
        where: {
            id: Number(id)
        }
    })
    if (!foundExpense) return res.status(400).json({ "message": "no expense record found" })
    const result = await prisma.expense.delete({
        where: {
            id: Number(id)
        }
    })
    console.log("expense deleted successfully")
    res.json(result)
}

const getAnExpense = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ "message": "id is required for getAnExpense" })
        const foundExpense = await prisma.expense.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.json(foundExpense)
    } catch (err) {
        console.log(err)
    }
}

const getUserExpenses = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ "message": "user id is required for getUserExpenses" })
        const foundUser = await prisma.user.findFirst({
            where: {
                id: Number(id)
            },
            orderBy: {
                date: "desc"
            }
        })
        if (!foundUser) return res.status(400).json({ "message": "no user record found for getUserExpenses" })
        const result = await prisma.expense.findMany({
            where: {
                userId: Number(id)
            }
        })
        // const result = await prisma.user.findFirst({
        //     select: {
        //         expenses: true
        //     },
        //     where: {
        //         id: Number(id)
        //     }
        // })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

export { getAllExpenses, addExpense , updateExpense ,deleteExpense, getAnExpense, getUserExpenses }
