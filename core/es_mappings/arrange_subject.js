let arrangeSubjectModel = {
  'arrange': {
    'properties': {
      'sub_name': { 'type': 'text', 'analyzer': 'ik_max_word', 'search_analyzer': 'ik_max_word' },
      'sub_description': { 'type': 'text', 'analyzer': 'ik_max_word', 'search_analyzer': 'ik_max_word' },
      'sub_total_minutes': { 'type': 'integer' },
      'sub_is_needed': { 'type': 'boolean' },
      'sub_begin_time': { 'type': 'date', 'format': 'dateOptionalTime' },
      'sub_end_time': { 'type': 'date', 'format': 'dateOptionalTime' },
      'teacher_name': { type: 'text', 'analyzer': 'ik_max_word', 'search_analyzer': 'ik_max_word' },
      'teacher_description': { 'type': 'text', 'analyzer': 'ik_max_word', 'search_analyzer': 'ik_max_word' },
      'on_subject_at': { 'type': 'date', 'format': 'dateOptionalTime' },
    },
  },
}

export default arrangeSubjectModel
