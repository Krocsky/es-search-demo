let query_schedule_with_weight = [{
    filter: {
      term: {
        sub_name: '诗歌',
      },
    },
    weight: 3,
  },
  {
    filter: {
      term: {
        sub_description: '诗歌',
      },
    },
    weight: 2,
  },
  {
    filter: {
      term: {
        teacher_description: '诗歌',
      },
    },
    weight: 1,
  },
]

export const querySchedule = query_schedule_with_weight
