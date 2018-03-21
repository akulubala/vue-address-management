import Address from "./components/Address";
import mixins from "./assets/mixins/address_utilities";
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component("address", Address);
}
export { Address, mixins };
