export default {
  columns: { 
    type: Array,
    default: [],
    required: true
  },
  locale: {
    type: String,
    default: "zhCn"
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: []
  },
  fetchMethod: Function,
  refresh: {
    type: [Number, String],
    default: ""
  },
  searchFields: {
    type: Array,
    default: []
  },
  hiddenSearchFields: {
    type: Array,
    default: []
  },
  toolButtons: {
    type: Array,
    default: []
  },
  selectable: {
    type: [Boolean, String],
    default: false
  },
  rowKey: String,
  actionColumn: {
    type: Array,
    default: []
  },
  actionColumnLabel: {
    type: String,
  },
  totalKey: {
    type: String,
    default: "total"
  },
  listKey: {
    type: String,
    default: "list"
  },
  extraQuery: {
    type: Object,
    default: {}
  },
  elPaginationProps: {
    type: Object,
    default: {}
  },
  tips: String
}