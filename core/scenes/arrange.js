import dayjs from 'dayjs'

// postgrs数据库表
import { Subjects } from '../models/subjects'
import { Teachers } from '../models/teachers'
import { Schedules } from '../models/schedules'
import { DAY_OF_WEEKDAY } from '../const'

// es数据结构
import arrangeSubjectMapping from '../es_mappings/arrange_subject'
import arrangeSubjectModel from '../es_models/arrange_subject'


import { createIndex, isExistIndex, createOrUpdateDocument, searchByFields } from '@cybereits/lib-es-client'

const indexName = 'arrange_subject'
const typeName = 'arrange'

/**
 * 创建课程
 * @param {string} name 课程名
 * @param {string} description 课程描述 
 * @param {int} totalMinutes 总小时数
 * @param {string} timeOfWeek 每周开课时间
 * @param {bool} isNeeded 是否必修
 * @param {date} beginTime 开课时间
 * @param {date} endTime 节课时间
 */
export function createSubject(name, description, totalMinutes, timeOfWeek, isNeeded, beginTime, endTime) {
  Subjects.create({
    name: name,
    description: description,
    total_minutes: totalMinutes,
    time_of_week: timeOfWeek,
    is_needed: isNeeded,
    begin_time: beginTime,
    end_time: endTime,
  })

  if (isExistIndex(esClient, indexName)) {
    createIndex(esClient, indexName, typeName, arrangeSubjectMapping)
      .then(data => console.log(data))
      .catch(ex => { throw new Error(ex) })
  }
}

/**
 * 创建教师
 * @param {string} name 教师名称
 * @param {string} description 教师描述
 */
export function createTeacher(name, description) {
  Teachers.create({
    name: name,
    description: description,
  })
}

/**
 * 按照当天向后延期，每天排两课，课程随机，教师随机
 * @param {int} arrangeDays 
 */
export async function arrangeClass(arrangeDays) {
  let now = dayjs()

  let totalSubjects = await Subjects.findAll({
    attributes: ['id'],
    raw: true,
  })

  let totalTeachers = await Teachers.findAll({
    attributes: ['id'],
    raw: true,
  })

  let arrangeArr = []
  let esArr = []
  for (let index = 0; index < arrangeDays; index++) {
    let nextDay = now.add(index, 'day')

    let randomSubject = Math.floor(Math.random() * (totalSubjects.length - 1 + 1)) + 1
    let randomTeacher = Math.floor(Math.random() * (totalTeachers.length - 1 + 1)) + 1
    let randomSubjectId = totalSubjects[randomSubject - 1].id
    let randomTeacherId = totalTeachers[randomTeacher - 1].id

    // postgres
    let model = { teacher_id: null, subject_id: null, class_of_weeks: DAY_OF_WEEKDAY.Monday, class_of_date: now }
    model.teacher_id = randomSubjectId
    model.subject_id = randomTeacherId
    arrangeArr.push(model)

    // elasticsearch
    let subject = await Subjects.findById(randomSubjectId)
    let teacher = await Teachers.findById(randomTeacherId)

    arrangeSubjectModel.sub_name = subject.name
    arrangeSubjectModel.sub_description = subject.description
    arrangeSubjectModel.sub_total_minutes = subject.total_minutes
    arrangeSubjectModel.sub_is_needed = subject.is_needed
    arrangeSubjectModel.sub_begin_time = subject.begin_time
    arrangeSubjectModel.sub_end_time = subject.end_time
    arrangeSubjectModel.teacher_name = teacher.name
    arrangeSubjectModel.teacher_description = teacher.description
    arrangeSubjectModel.on_subject_at = nextDay

    esArr.push(arrangeSubjectModel)

    createOrUpdateDocument(esClient, indexName, typeName, '', arrangeSubjectModel)
  }

  await Schedules.bulkCreate(arrangeArr)
}

/**
 * 查询关键词
 * @param {string} inputs 
 */
export async function queryArrange(inputs) {
  let resultQuery
  await searchByFields(esClient, indexName, typeName, inputs, ['sub_name', 'sub_description', 'teacher_description'], 20, true)
    .then(data => {
      resultQuery = data
    })
    .catch(ex => { throw new Error(ex) })

  return resultQuery
}
