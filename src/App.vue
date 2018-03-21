<template>
  <div id='app'>
    <Address
      :base-address-options='addressOptions'
      @select='selectAddress'
      @update='updateAddress'
      @delete='deleteAddress'
      @store='storeAddress'
      @setDefault='setDefault'
    />
  </div>
</template>
<script>
import Address from "./components/Address";
import mixins from "./assets/mixins/address_utilities";
export default {
  name: "App",
  mixins: [mixins],
  data() {
    return {
      addressOptions: {
        address_box_height: 500,
        props: {
          email: {
            required: true,
            display: true,
            label: "邮箱",
            error_message: "请输入正确的邮箱"
          },
          tag: {
            required: true,
            display: true,
            options: ["家", "父母家", "公司", "学校"],
            label: "标签",
            error_message: "请选择标签"
          }
        },
        customer_address_list: [
          {
            id: 1,
            contacts: "联系人A",
            contacts_phone: "18691617190",
            area: ["北京市", "市辖区", "东城区", "东华门街道"],
            address_details: "",
            is_default: true
          },
          {
            id: 2,
            contacts: "联系人B",
            contacts_phone: "18691617190",
            area: [],
            address_details: "",
            is_default: false
          },
          {
            id: 3,
            contacts: "联系人C",
            contacts_phone: "18691617190",
            area: [],
            address_details: "",
            is_default: false
          }
        ]
      }
    };
  },
  methods: {
    storeAddress(address) {
      axios
        .post('/order-address', this.address)
        .then(resp => {
          this.addressOptions.customer_address_list = Object.assign(
            [],
            this.mixinStoreAddress(this.addressOptions.customer_address_list, address)
          );
        })
        .then(() => {
          this.$message({
            type: 'success',
            showClose: true,
            message: '新建地址成功!'
          });
        });
    },
    updateAddress(address) {
      axios
        .put('/order-address/' + this.pop_address.id, this.pop_address)
        .then(resp => {
          this.addressOptions.customer_address_list = Object.assign(
            [],
            this.mixinUpdateAddress(this.addressOptions.customer_address_list, address)
          );
        })
        .then(() => {
          this.pop_address_visible = false;
          this.$message({
            type: 'success',
            showClose: true,
            message: '更新地址成功!'
          });
        });
    },
    deleteAddress(address) {
      this.addressOptions.customer_address_list = Object.assign(
        [],
        this.mixinDeleteAddress(this.addressOptions.customer_address_list, address)
      );
    },
    selectAddress(address) {
      console.log(address, 'selected');
    },
    setDefault(address) {
      this.addressOptions.customer_address_list = Object.assign(
        [],
        this.mixinSetDefaultAddress(this.addressOptions.customer_address_list, address)
      );
    }
  },
  components: {
    Address
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
