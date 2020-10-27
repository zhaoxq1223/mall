export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.payLoad新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      //2.判断oldProduct
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}
