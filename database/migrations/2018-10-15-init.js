'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => [
    // 课程实体
    queryInterface.createTable('subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: '课程名',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '课程描述',
      },
      total_minutes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '课程时间 单位:分钟',
      },
      time_of_week: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '每周上班时间 格式:Monday,Thuesday',
      },
      is_needed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: '是否是必修课',
      },
      begin_time: {
        type: Sequelize.DATE,
        comment: '开课时间',
      },
      end_time: {
        type: Sequelize.DATE,
        comment: '结课时间',
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }, {
      comment: '课程实体表',
    }),
    // 教师实体
    queryInterface.createTable('teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '教师名',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '教师描述',
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }, {
      comment: '教师实体表',
    }),
    // 排课实体
    queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '教师id',
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '课程id',
      },
      class_of_weeks: {
        type: Sequelize.ENUM('Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday'),
        allowNull: true,
        comment: '一周内上课时间',
      },
      class_of_date: {
        type: Sequelize.DATE,
        comment: '上课日期',
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }, {
      comment: '排课实体表',
    }),
  ],
  down: () => {},
}
