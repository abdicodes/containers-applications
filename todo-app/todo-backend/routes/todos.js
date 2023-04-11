const express = require('express')
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router()

setAsync('added_todos', 0)
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  const added_todos = await getAsync('added_todos')
  await setAsync('added_todos', Number(added_todos) + 1)

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  console.log(req.todo)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const newTodo = { text: req.body.text, done: req.body.done }
  Todo.findByIdAndUpdate(req.todo.id, newTodo, { new: true }).then(
    (updatedTodo) => res.status(201).send(updatedTodo)
  )
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
