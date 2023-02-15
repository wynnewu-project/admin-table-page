# Admin Table Page
[Chinese](./README.zh.md)

Admin Table Page component based on Vue3.js and Element-plus

- Write a table page with search fields, toolbar and pagination functions by simple configure
- Only need a promise function that fetchs data from the server to automatically complete the table data pulling and rendering
- Support automatic refresh and manual refresh of the table data when fetching data from the server
- Automatically pagination
- Select rows on different pages even when fetching data from the server
- When search fields or pagination changed, the table datas will be loaded automatically
- Customize each part of the component through different named slot
- Support Chinese and English language
- Adaptive layout for different device

## Local Demo
```shell
npm install / yarn install
npm run dev / yarn run dev
```
Open http://localhost:8173 to see the demo

## Installation
### NPM
```shell
npm install admin-table-page
```
### Yarn
```shell
yarn add admin-table-page
```
## Usage
### Global Scope
```javascript
import AdminTablePage from "admin-table-page";
// Only one of the following two style files needs to be imported
// If you don't want to change the theme of element-plus
import "admin-table-page/lib/style.css";
// If you custom your element-plus theme
import "admin-table-page/style/index.scss";

import { createApp } from "vue";

const app = createApp(...);
app.use(ConfigTable);
```
### VUE SFC Component
```javascript
<template> 
  <admin-table-page
    :columns="columns"
    :fetch-method="getDataApi"
    :tool-buttons="toolButtons"
    :search-fields="searchFields"
    :hidden-search-fields="hiddenSearchFields"
    :refresh="5000"
    :action-column="actionColumn"
    :el-table="{
      'row-key': 'id'
    }"
  />
</template>

<script setup>
import { AdminTablePage } from "admin-table-page";
// Only one of the following two style files needs to be imported
// If you don't want to change the theme of element-plus
import "admin-table-page/lib/style.css";
// If you custom your element-plus theme
import "admin-table-page/style/index.scss";
import { getDataApi } from "@/api/data";

const columns = [{
  prop: "name",
  label: "Name",
}, {
  prop: "age",
  label: "Age"
}];

const toolButtons = [{
  text: "New Record",
  icon: "Plus",
  onClick: handleAdd
}]

const actionColumn = [{
  text: "Edit",
  onClick: row => handleEdit(row)
}, {
  text: "Delete",
  onClick: row => handleDelete(row)
}]

const searchFields = [{
  name: "name",
  label: "Name"
}]

const hiddenSearchFields = [{
  name: "age",
  label: "Age",
  searchType: "select",
  options: ["Under 10 years old", "10 to 20 years old"]
}]
</script>
```
## Props
| Props | Description | Type | Accepted Values | Default Value |
| --- | --- | --- | --- | --- |
| columns | The defination of the table's columns | Array | - | [] |
| data | The local table data, same as ElTalbe | Array | - | [] |
| fetch-method | The method to get the table data from remote server |(query: Object) => Promise<{TotalKey: Number, listKey: Array}> | - | - |
| refresh | How to refresh the table data | String/Number | String value:<br/>"" - Never to refresh Table<br/>"manual" -  Refresh table data manually"<br/> Number value:<br/> Table refresh period with milliseconds. For example,:refresh="5000" | "" |
| tool-buttons | Toolbar buttons. [Toolbar button Attributes](#toolbar-buttons) | Array | - | - |
| search-fields | Search fields displayed by default | Array | - | - |
| hidden-search-fields | Search fields hidden by default. Click "Expand/Collapse" button to toggle the display status. | Array | - | - |
| show-index | Display the index of the row when it's  true. | Boolean | false<br/> true | false |
| row-key | Same as el-table, it's required when set selectable to "single" or "multiple" | String | - | - |
| selectable | How to select the rows in table. | Boolean/String | String value:<br/> "single" - single select<br/> "multiple" - multiple select<br/> Boolean value:<br/> false: not suppor selection | false |
| locale | i18n locale config | String | "zhCn", "en" | "zhCn" |
| action-column | The action column shown in each row. | Array | - | - |
| action-column-label | The label of action column | String | - | en - "Actions"<br/> zhCn - "操作" |
| total-key | To map the key for total count in the result when fetch datas from remote. | String | - | "total" |
| list-key | To map the key for data list in the result when fetch datas from remote. | String | - | "list" |
| extra-query | The extra query params need to send to server when fetch datas from remote. | Object | - | - |
| el-pagination-props | Other el-pagination Attributes | Object | - | - |
| tips | tips string for the table. | String | - | - |

In addition, other attributes of el-table can fallthrough.

## Method
| Function | Description | Type |
| --- | --- | --- |
| reload | Reload the table data. You can pass other parameters besides searchFields and pagination parameters| (params) => void |
| getSelections | Return the selected rows or seleted row object. When multiple selecting, you can get the selected rows on different pages. | () => Array or Object |

In addition, all methods of el-table are alse suppored.


## Events
| Event | Description | Parameters |
| --- | --- | --- |
| select-change | triggers when selection change. <br/>Returns a row Object when selectable is "single".<br/>  Returns rows Array when selectable is "multiple" | row/rows |

## Custom Slots
| Name | Description |
| --- | --- |
| search | The search  |
| tools | The toolbar |
| actions | The action column |
| tips | The tips of the table |
| [column.prop] | Each column can be customed by slot named with the column's prop |

## Toolbar Buttons
| Attributes | Required | Description | Type | Default Value |
| --- | --- | --- | --- | --- |
| text | true | The text displayed on the button. | String | - |
| onClick | true | The callback function for click events. | Function | - |
| show | false | Whether to display the button. Default is true. | Boolean | true |

In addition, all attributes for el-button are supported. For example,
```javascript
const toolButtons = [{
  text: "test button",
  onClick: () => { console.log("it's toolbar button")},
  icon: "Plus",
  type: "danger",
  link
}]
```
## Search Fields
Only support el-input、el-select and el-date-picker(type="date") for search components.
Same as hidden-search-fieles.

| Attributes | Required | Description | Accepted Value | Default |
| --- | --- | --- | --- | --- |
| name | true | The Query param key for the field. | - | - |
| label | false | The label for the search field. | - | - |
| searchType | false | The type of the search field. | "input"<br/> "select"<br/> "date" | "input" |
| options | false | The select options. It's required when searchType is "select". The element  for options Array can be String、Number and Object with keys named label and value. | ["options1", "options2",...]<br/> or<br/> [{ label: "option1", value: "option1" }] | - |

In addition, all attributes for el-input/el-select/el-date-picker(type="date") are supported. For example,
```javascript
const searchFields = [{
  name: "username",
  type: "textarea"
}]
```

