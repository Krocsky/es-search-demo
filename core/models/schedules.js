import { INTEGER, DATE, ENUM } from 'sequelize'
import { defineModel } from '../../framework/database'

import { Teachers } from '../models/teachers'
import { Subjects } from '../models/subjects'

// 排课实体
export const Schedules = defineModel(
  'schedules', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teacher_id: {
      type: INTEGER,
      allowNull: false,
      comment: '课程时间',
      // 外键
      references: {
        model: 'teachers',
        key: 'id',
      },
    },
    subject_id: {
      type: INTEGER,
      allowNull: false,
      comment: '课程id',
      // 外键
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
    class_of_weeks: {
      type: ENUM('Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday'),
      allowNull: false,
      comment: '一周内上课时间',
    },
    class_of_date: {
      type: DATE,
      comment: '上课日期',
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

// 讲师表关联
Schedules.belongsTo(Teachers, {
  foreignKey: 'teacher_id',
  targetKey: 'id',
  foreignKeyConstraint: false,
  constraints: false,
})

// 课程表关联
Schedules.belongsTo(Subjects, {
  foreignKey: 'subject_id',
  targetKey: 'id',
  foreignKeyConstraint: false,
  constraints: false,
})
