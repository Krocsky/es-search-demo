import express from 'express'
import dayjs from 'dayjs'

const router = express.Router()

router.get('/welcome', async function (_, { succ }, ) {
  let now = dayjs()
  console.log(now.add(1, 'day'))
  console.log(now)
  succ('welcome')
})

export default router
