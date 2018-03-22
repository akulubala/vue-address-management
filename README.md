# vue-chinese-address-management

> 用法：
`npm i vue-address-cn --save`
项目中需要提前有ElementUI:
    
    import ElementUI from "element-ui";
    import "element-ui/lib/theme-chalk/index.css";
   
> 在需要地址的组件中引入：

    <Address
      :base-address-options='addressOptions'
      @select='selectAddress'
      @update='updateAddress'
      @delete='deleteAddress'
      @store='storeAddress'
      @setDefault='setDefault'
    />
    
> JS代码 

    import { Address, mixins } from '../dist/gh-page/app.js'
    export default {
      name: "App",
      mixins: [mixins],
      data() {
        return {
          addressOptions: {
            address_box_height: 500, //地址最大高度，超出高度会ｏｖｅｒｆｌｏｗ　ｓｃｒｏｌｌ效果
            props: { //此案例中两项默认均为false，为true的情况下才会显示
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
            customer_address_list: []
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
    
> 可覆盖的默认标签及配置、验证：

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
        hierarchy: 3,　//可填３或者４,地址是三级还是四级的
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
