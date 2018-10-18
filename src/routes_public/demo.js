import express from 'express'
import dayjs from 'dayjs'

const router = express.Router()

router.get('/welcome', async function (_, { succ }, ) {
  let now = dayjs()
  console.log(now)
  console.log('获取本地时区的偏移量：' + now.format('Z'))
  succ('welcome')
})

export default router
