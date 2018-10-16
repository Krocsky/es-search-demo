import { INTEGER, DATE, BOOLEAN, STRING } from 'sequelize'
import { defineModel } from '../../framework/database'

// 课程实体
export const Subjects = defineModel(
  'subjects', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      comment: '课程名',
    },
    description: {
      type: STRING,
      comment: '课程描述',
    },
    total_minutes: {
      type: INTEGER,
      allowNull: false,
      comment: '课程时间 单位:分钟',
    },
    time_of_week: {
      type: STRING,
      allowNull: false,
      comment: '每周上班时间 格式:Monday,Thuesday',
    },
    is_needed: {
      type: BOOLEAN,
      allowNull: false,
      comment: '是否是必修课',
    },
    begin_time: {
      type: DATE,
      comment: '开课时间',
    },
    end_time: {
      type: DATE,
      comment: '结课时间',
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DATE,
      allowNull: true,
    },
  }
)
