import { Delete, Loading, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

export const stringColumns = [ "username", "age", "lastLogin"]

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

export const filterColumns = [{
  prop: "username",
  label: "Username",
  filterable: true
}, {
  prop: "age",
  label: "Age",
  filterOptions: {
    type: "select",
    options: ["18", "19", "20", "21", "22"]
  }
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
  onClick: () => { console.log('new user')}
}, {
  text: "Delete",
  onClick: () => { console.log('delete user')},
}]

export const toolButtonsEl = [{
  text: "New User",
  icon: Plus,
  //if you import element-plus/icons-vue global, you can use string
  //icon: "Plus"  
  onClick: () => { console.log('new user')}
}, {
  text: "Delete",
  icon: Delete,
  onClick: () => { console.log('delete user')},
  //you can add other el-button attributes, for example:
  type: "danger"
}]


export const data = [{
  username: "user1",
  age: "18",
  lastLogin: "2023-01-03"
}, {
  username: "user2",
  age: "19",
  lastLogin: "2023-01-02"
}]

export const generatorData = (min=0, max=20) => {
  const length = Math.floor(Math.random() * (max-min +1) + min);
  return [...Array(length)].map((_item, index) => ({
    username: `user${index}`,
    age: index + 18,
    lastLogin: `2023-01-${index+1}`
  }));
}


/**
 * fetchMethod -  Return a Promise. 
 * the returned table data should contain:
 *  - "total": the total number of the table datas, you can map another words to this key by "totalKey" props
 *  - "list": the list of table datas, you can map another words to this key by "listKey" props
 * 
 */
export const fetchMethod = () => {
  ElMessage.success({
    message: "fetch data from remote",
    offset: 100,
  })
  return new Promise((resolve, reject) => {
    const data = generatorData(8, 10)
    resolve({
      total: data.length,
      list: data
    })
  })
}

export const fetchFilterMethod = (query) => {
  ElMessage.success({
    message: "fetch data from remote",
    offset: 100,
  })
  return new Promise((resolve, reject) => {
    let data = generatorData(4,4);
    const filterFields = Object.keys(query).filter(k => !["page", "offset", "limit"].includes(k));
    data = data.filter(d => {
      let filter = true;
      for(let k of filterFields) {
        if(query[k] === null || query[k] === "" )
          continue;
        if(typeof d[k] === 'string') {
          filter = d[k].includes(query[k]);
        } else {
          filter = d[k] === Number(query[k]);
        }
      }
      return filter
    })
    resolve({
      total: data.length,
      list: data
    })
  })
}

export const fetchMethodOtherKey = (query) => {
  ElMessage.success({
    message: "fetch data from remote",
    offset: 100,
  })
  return new Promise((resolve, reject) => {
    const data = generatorData(8, 10)
    resolve({
      count: 18,
      items: data
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

export const columnsWidth = [{
  prop: "username",
  label: "Username",
  width: 400
}, {
  prop: "age",
  label: "Age",
  width: 400,
}, {
  prop: "lastLogin",
  label: "Last Login",
  width: 400,
}]