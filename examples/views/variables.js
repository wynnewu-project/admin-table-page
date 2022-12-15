import { Delete, Loading, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

export const columns = [{
  prop: "username",
  label: "Username",
}, {
  prop: "age",
  label: "Age"
}, {
  prop: "lastLogin",
  label: "Last Login"
}]

export const searchFields = [{
  name: "username",
  label: "Username",
}, {
  name: "age",
  label: "Age",
  searchType: "select",
  options: ["18", "19", "20", "21", "22"],
  /* or define the options with the object arrays
  options: [{ 
    value: 18,
    label: "18"
  }, {
    value: 19,
    label: "19",
  }]
  */
  //you can add other el-select attributes:
  multiple: true
}]

export const hiddenSearchFields = [{
  name: "lastLogin",
  label: "Login",
  searchType: "date"
}]

export const toolButtons = [{
  text: "New User",
  icon: Plus,
  //if you import element-plus/icons-vue global, you can use string
  //icon: "Plus"  
  onClick: () => { console.log('new user')}
}, {
  text: "Delete",
  icon: Delete,
  onClick: () => { console.log('new user')},
  //you can add other el-button attributes, for example:
  type: "danger"
}]

export const data = [{
  username: "user1",
  age: "18",
  lastLogin: "2022-02-02"
}, {
  username: "user2",
  age: "19",
  lastLogin: "2022-01-01"
}]

/**
 * fetchMethod -  Return a Promise. 
 * the returned table data should contain:
 *  - "total": the total number of the table datas, you can map another words to this key by "totalKey" props
 *  - "list": the list of table datas, you can map another words to this key by "listKey" props
 * 
 */
export const fetchMethod = (query) => {
  ElMessage.info("fetch data from remote")
  return new Promise((resolve, reject) => {
    resolve({
      total: 207,
      list: data
    })
  })
}

export const actionColumn = [{
  text: "编辑",
  onClick: () => { console.log("edit") }
}, {
  text: "删除",
  onClick: () => { console.log("delete")}
}]
