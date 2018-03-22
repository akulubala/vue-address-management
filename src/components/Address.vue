<template>
<div class='address-box'>
  <div class='address-title'>
      <h4>地址列表： </h4>
          <el-button
            type='text'
            icon='el-icon-plus'
            @click='createAddress()'>
              新建地址
          </el-button>
  </div>
  <el-table
    :data='baseAddressOptions.customer_address_list'
    border
    :height='baseAddressOptions.address_box_height'
    ref='addressTable'
    style='width: 100%'
    :row-class-name='tableRowClassName'
    @cell-click='setAddress'
    max-height='400'>
    <el-table-column
        align='left'
        prop='contacts'
        :label='props.contacts.label'>
    </el-table-column>
    <el-table-column
      align='left'
      prop='contacts_phone'
      :label='props.contacts_phone.label'
      >
    </el-table-column>
    <el-table-column
      align='left'
      prop='area'
      :label='props.area.label'
      :formatter='formatter'
      >
    </el-table-column>
    <el-table-column
      align='left'
      prop='details'
      :label='props.details.label'>
    </el-table-column>
    <el-table-column
      align='left'
      prop='zip_code'
      :label='props.zip_code.label'
      v-if='props.zip_code.display'>
    </el-table-column>
    <el-table-column
      align='left'
      prop='email'
      :label='props.email.label'
      v-if='props.email.display'>
    </el-table-column>
    <el-table-column
      align='left'
      prop='tag'
      :label='props.tag.label'
      v-if='props.tag.display'>
    </el-table-column>
    <el-table-column
      label='操作'>
      <template slot-scope='scope'>
        <el-button
          @click.native.prevent='setDefaultAddress(scope.row)'
          type='text'
          size='small' v-if='!scope.row.is_default'>
          设为默认地址
        </el-button>
        <el-button
          type='primary'
          icon='el-icon-check'
          size='small' plain v-else>
          默认地址
        </el-button>
        <el-button
          @click.native.prevent='editAddress(scope.row)'
          type='text'
          size='small'>
          编辑
        </el-button>
        <el-popover
          ref="popover"
          placement="top"
          width="160"
          trigger="hover">
          <p>确定删除此地址？</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click.native.prevent='deleteAddress(scope.row)'>确定</el-button>
          </div>
        </el-popover>
        <el-button
            type='text'
            size='small'
            v-popover:popover>
            移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title='收货地址' :visible.sync='pop_address_visible'>
    <el-form :model='pop_address' ref="addressForm">
      <el-form-item 
        :label='props.contacts.label'
        prop='contacts'
        :label-width='`120px`'
        v-if='props.contacts.display'
        :rules="[
          { required: props.contacts.required, message: props.contacts.error_message }
        ]"
        >
        <el-input v-model='pop_address.contacts' auto-complete='off'></el-input>
      </el-form-item>
      <el-form-item 
        :label='props.contacts_phone.label' 
        :label-width='`120px`'
        prop="contacts_phone"
        v-if='props.contacts_phone.display'
        :rules="[
          { required: props.contacts_phone.required, message: props.contacts_phone.error_message }
        ]"
        >
        <el-input v-model.number='pop_address.contacts_phone' auto-complete='off'></el-input>
      </el-form-item>
      <el-form-item 
        :label='props.area.label' 
        :label-width='`120px`'
        prop="area"
        v-if='props.area.display'
        :rules="[
          { required: props.area.required, message: props.area.error_message }
        ]">
        <el-cascader
          :options='addressSets'
          change-on-select
          :props="{ value: 'name', label: 'name'}"
          v-model='pop_address.area'
        ></el-cascader>
      </el-form-item>
      <el-form-item 
        :label='props.details.label' 
        :label-width='`120px`'
        v-if='props.details.display'
        prop="details"
        :rules="[
          { required: props.area.required, message: props.area.error_message }
        ]">
        <el-input type='textarea' 
          v-model='pop_address.details' 
          auto-complete='off'
          ></el-input>
      </el-form-item>
      <el-form-item 
      :label='props.zip_code.label' 
      :label-width='`120px`'
      :rules="[
          { required: props.zip_code.required, message: props.zip_code.error_message }
      ]"
      prop="zip_code" 
      v-if='props.zip_code.display'>
        <el-input type='input' v-model='pop_address.zip_code' auto-complete='off'></el-input>
      </el-form-item>
      <el-form-item 
        :label='props.email.label' 
        :label-width='`120px`'
        prop="email"
        :rules="[
            { required: props.email.required, message: props.email.error_message, type: 'email' }
        ]"
        v-if='props.email.display'>
        <el-input type='input' v-model='pop_address.email' auto-complete='off'></el-input>
      </el-form-item>
      <el-form-item 
        :label='props.tag.label'
        prop="tag" 
        :label-width='`120px`'
        :rules="[
            { required: props.tag.required, message: props.tag.error_message }
        ]" 
        v-if='props.tag.display'>
        <div class='tag-list'>
          <el-radio v-model='pop_address.tag' auto-complete='off' :label='t' :key='i' v-for='(t, i) in props.tag.options' border>{{ t }}</el-radio>
        </div>
      </el-form-item>
    </el-form>
    <div slot='footer' class='dialog-footer'>
      <el-button @click='pop_address_visible = false'>取 消</el-button>
      <el-button type='primary' @click="submitForm('addressForm')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import pcas from "../assets/pcas-code";
import pca from "../assets/pca-code";
let adressPcas = pcas;
let adressPca = pca;
export default {
  props: {
    baseAddressOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pop_address: {
        contacts: null,
        contacts_phone: null,
        area: [],
        details: null,
        zip_code: null,

      },
      addressSets: [],
      pop_address_visible: false,
      selected_address: null,
      customer_address_list: [],
      props: {}
    };
  },
  created() {
    if (this.baseAddressOptions.customer_address_list.length > 0) {
      this.selected_address = Object.assign({}, this.baseAddressOptions.customer_address_list[0]);
    }
    let mutatedProps = {};
    let baseProps = null;
    if (this.baseAddressOptions.hasOwnProperty("props")) {
      baseProps = this.baseAddressOptions.props;
    }
    let defaultProps = {
      contacts: {
        required: true,
        display: true,
        label: "联系人",
        error_message: "请输入正确联系人！"
      },
      contacts_phone: {
        required: true,
        display: true,
        label: "联系人电话",
        error_message: "请输入正确联系人电话！"
      },
      area: {
        required: true,
        display: true,
        hierarchy: 3,
        label: "所在地区",
        error_message: "请输入正确所在地区！"
      },
      details: {
        required: true,
        display: true,
        label: "详细地址",
        error_message: "请输入正确详细地址！"
      },
      zip_code: {
        required: false,
        display: false,
        label: "邮编",
        error_message: "请输入正确邮编！"
      },
      email: {
        required: false,
        display: false,
        label: "邮箱",
        error_message: "请输入正确邮箱！"
      },
      tag: {
        required: false,
        display: false,
        options: ["家", "父母家", "公司", "学校"],
        label: "标签",
        error_message: "请选择标签"
      }
    };

    for (const key in defaultProps) {
      if (defaultProps.hasOwnProperty(key)) {
        const element = defaultProps[key];
        if (baseProps && baseProps.hasOwnProperty(key)) {
          let baseProp = baseProps[key];
          if (baseProp.required && !baseProp.display) {
            throw "Required prop `" + key + "` must set display to true";
          }
          if (baseProp.display) {
            mutatedProps[key] = Object.assign({}, baseProp);
          }
        } else {
            mutatedProps[key] = Object.assign({}, element);
        }
      }
    }
    this.props = Object.assign({}, mutatedProps);
    this.addressSets = this.props.area.hierarchy === 3 ? adressPca : adressPcas;
  },
  watch: {
    selected_address(address) {
      this.$emit("select", address);
    },
    pop_address_visible(visible) {
      if (!visible) {
        this.$refs['addressForm'].resetFields();
      }
    }
  },
  methods: {
    setAddress(row, column) {
      if (column.hasOwnProperty("property")) {
        this.$refs.addressTable.setCurrentRow(row);
        this.selected_address = Object.assign({}, row);
      }
    },
    createAddress() {
      this.pop_address_visible = true;
    },
    deleteAddress(address) {
      this.$emit('delete', address);
    },
    setDefaultAddress(address) {
      this.$emit('setDefault', address);
    },
    editAddress(address) {
      this.pop_address = Object.assign({}, address);
      this.pop_address_visible = true;
    },
    formatter(row, column) {
      return row.area.join(" / ");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let isCreate = !Object.keys(this.pop_address).includes("id");
          if (isCreate) {
            this.$emit('store', this.pop_address);
          } else {
            this.$emit('update', this.pop_address);
          }
          this.pop_address_visible = false;
        } else {
          return false;
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      
      if (this.selected_address && row.id === this.selected_address.id) {
        return "selected-address";
      }
      return "";
    }
  }
};
</script>
<style>
.line {
  text-align: center;
}
.el-cascader,
.el-select {
  width: 100%;
}
.address-title,
.tag-list {
  text-align: left;
}
.address-title h4 {
  padding: 0px;
  display: inline;
}
.selected-address {
  background: #f0f9eb !important;
}
.address-box .el-table__row{
  cursor: pointer;
}
</style>