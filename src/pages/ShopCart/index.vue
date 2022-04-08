<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="UpdateChecked(cart.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3"> -->
          <!-- <div class="item-txt">语音升级款</div> -->
          <!-- </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('minus', -1, cart)"
            >
              -
            </a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('add', 1, cart)"
            >
              +
            </a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGood(cart.skuId)">
              删除
            </a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll&&cartInfoList.length!=0" @change="updateAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>0</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
      //这里拿到数据是因为uuid可以帮服务器知道是谁的数据
    },
    changeSkuNum: throttle(async function (type, num, cart) {
      switch (type) {
        case 'add':
          num = 1
          break
        case 'minus':
          //只有产品个数大于1，才传-1给服务器，如果小于1，就不传，保持原数据不动（0）
          num = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // if(isNaN(num)||num<1){
          //   num =0
          // }else{
          //   //如果是合法的，对输入的数字取整求和skuNum的差值
          //   num = parseInt(num) - cart.skuNum
          // }
          num = isNaN(num) || num < 1 ? 0 : parseInt(num) - cart.skuNum
          break
      }
      // 派发action
      try {
        //代表修改成功
        await this.$store.dispatch('addShopCart', {
          skuId: cart.skuId,
          skuNum: num,
        })
        //再一次获取最新的数据进行展示
        this.getData()
      } catch {}
    }, 1000),
    async deleteGood(skuId) {
      //  console.log(skuId);
      try {
        await this.$store.dispatch('deleteGood', skuId)
        this.getData()
        //  console.log('重新发完请求了');
      } catch (error) {
        alert(error.message)
      }
    },
    //修改某个产品的勾选状态，也就是isChecked,如果不改，不管复选框选中与否都是1，这样子全选按钮就不能判断了
   async  UpdateChecked(cart, $event) {
      //带给服务器的参数要是个数字，不是布尔值
      let isChecked = $event.target.checked ? "1" : "0"

      try {
        //如果请求成功，再次向服务器请求数据
        await this.$store.dispatch('UpdateChecked', {
        skuId: cart,
        isChecked
      })
      this.getData()
      console.log('重新发请求了');
      } catch (error) {
        alert('error.message')
      }
    },
    //删除选中的商品
   async deleteAllCheckedCart(){
   try {
     await this.$store.dispatch("deleteAllCheckedCart")
     //再次发请求获取数据
     this.getData()
   } catch (error) {
     alert(error.message)
   }
    },
    //通过全选按钮修改产品勾选状态
   async updateAllChecked(event){
   let checked = event.target.checked?"1":"0"//为什么传的是字符串不是数字是因为接口要的是字符串
   try {
     await this.$store.dispatch('updateAllChecked',checked)
     this.getData()
   } catch (error) {
     alert(error.message)
   }
    }
  //  UpdateChecked(cart, $event){
  //   console.log(cart);
  //   console.log($event);
  //  }
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((element) => {
        sum += element.skuNum * element.skuPrice
      })
      return sum
    },
    isCheckedAll() {
      return this.cartInfoList.every((item) => item.isChecked == 1)
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
