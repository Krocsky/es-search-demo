import express from 'express'
import dayjs from 'dayjs'

import { createSubject, createTeacher, arrangeClass, queryArrange } from '../../core/scenes/arrange'

const router = express.Router()

/**
 * 添加课程
 */
router.post('/create/subject', function ({ body: { name, description, totalMinutes, timeOfWeek, isNeeded, beginTime, endTime } }, { succ, err }, ) {
  if (!dayjs(beginTime).isValid()) {
    err(new Error('开课时间格式错误'))
    return
  }

  if (!dayjs(endTime).isValid()) {
    err(new Error('节课时间格式错误'))
    return
  }

  createSubject(name, description, totalMinutes, timeOfWeek, isNeeded, beginTime, endTime)
  succ('添加课程成功')
})

/**
 * 创建教师
 */
router.post('/create/teacher', function ({ body: { name, description } }, { succ }, ) {
  createTeacher(name, description)
  succ('添加教师成功')
})

/**
 * 简单排课
 */
router.post('/arrange', async function ({ body: { days } }, { succ, err }, ) {
  await arrangeClass(days)
    .then(succ)
    .catch(ex => err(ex))
})

/**
 * 检索
 */
router.post('/arrange/query', async function ({ body: { inputs } }, { succ, err }, ) {
  await queryArrange(inputs)
    .then(succ)
    .catch(err)
})

export default router
