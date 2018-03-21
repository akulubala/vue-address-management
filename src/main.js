// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import {
  Cascader,
  Select,
  Option,
  Message,
  MessageBox,
  Checkbox,
  Table,
  TableColumn,
  Dialog,
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  Tooltip,
  Popover,
  Col
} from "element-ui";
Vue.use(Cascader);
Vue.use(Select);
Vue.use(Option);
// Vue.use(Message);
// Vue.use(MessageBox);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Col);
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;