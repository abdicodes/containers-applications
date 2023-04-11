const express = require('express')
const router = express.Router()

const configs = require('../util/config')
const { getAsync, setAsync } = require('../redis')

setAsync('visits', 0)
/* GET index data. */
router.get('/', async (req, res) => {
  const visitNum = await getAsync('visits')
  await setAsync('visits', Number(visitNum) + 1)
  const newVal = await getAsync('visits')
  res.send({
    ...configs,
    visits: newVal,
  })
})
router.get('/statistics', async (req, res) => {
  const added_todos = await getAsync('added_todos')
  res.send({
    added_todos: added_todos,
  })
})

module.exports = router
