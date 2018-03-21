function findIndex(addressList, address) {
  var index = null;
  for (index = 0; index < addressList.length; index++) {
    const element = addressList[index];
    if (element.id === address.id) {
      break;
    }
  }
  return index;
}
var mixins = {
  methods: {
    mixinDeleteAddress(addressList, address) {
      let index = findIndex(addressList, address);
      addressList.splice(index, 1);
      return addressList;
    },
    mixinSetDefaultAddress(addressList, address) {
      let mutatedAddress = [];
      for (const key in addressList) {
        if (addressList.hasOwnProperty(key)) {
          let element = addressList[key];
          if (element.id === address.id) {
            element.is_default = 1;
          } else {
            element.is_default = 0;
          }
          mutatedAddress.push(element);
        }
      }
      return mutatedAddress;
    },
    mixinUpdateAddress(AddressList, address) {
      let mutatedAddress = [];
      for (const key in AddressList) {
        if (AddressList.hasOwnProperty(key)) {
          let element = AddressList[key];
          if (element.id === address.id) {
            let mutatedaddress = {};
            for (const key in address) {
              if (address.hasOwnProperty(key)) {
                const element = address[key];
                mutatedaddress[key] = element;
              }
            }
            element = Object.assign({}, mutatedaddress);
          }
          mutatedAddress.push(element);
        }
      }
      return mutatedAddress;
    },
    mixinStoreAddress(addressList, address) {
      let mutatedAddress = [];
      for (const key in addressList) {
        if (addressList.hasOwnProperty(key)) {
          mutatedAddress.push(addressList[key]);
        }
      }
      mutatedAddress.push(address);
      return mutatedAddress;
    }
  }
};
export default mixins;