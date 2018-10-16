import { INTEGER, DATE, STRING } from 'sequelize'
import { defineModel } from '../../framework/database'

// 教师实体
export const Teachers = defineModel(
  'teachers', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      comment: '教师名',
    },
    description: {
      type: STRING,
      comment: '教师描述',
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
