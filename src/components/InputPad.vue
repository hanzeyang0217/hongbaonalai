<template>
  <div class="numberPad">
    <!--    <Notes-->
    <!--    :inputNote.sync="inputNote"-->
    <!--    />-->
    <div class="output">
      <label>{{plusMark}}</label>
      {{btOutput}}
    </div>

    <div class="buttons">
      <button class="seven" @click="enterNumber('7')">7</button>
      <button class="eight " @click="enterNumber('8')">8</button>
      <button class="nine" @click="enterNumber('9')">9</button>
      <button>今天</button>
      <button class="four " @click="enterNumber('4')">4</button>
      <button class="five " @click="enterNumber('5')">5</button>
      <button class="six" @click="enterNumber('6')">6</button>
      <button class="plus" @click="changePlusMark()">- / +</button>
      <button class="one " @click="enterNumber('1')">1</button>
      <button class="two " @click="enterNumber('2')">2</button>
      <button class="three " @click="enterNumber('3')">3</button>
      <button @click="submitEnter()" class="ok">OK</button>
      <button @click="enterNumber('0')" class="zero">0</button>
      <button class="decimal" @click="enterNumber('.')">.</button>
      <button @click="deleteEnter()">删除</button>

    </div>
  </div>
</template>

<script lang="js">
  // import Notes from '@/components/Notes.vue'

  export default {
    name: "InputPad",
    // components: {Notes},
    props: {
      inputAmount: String,
      gateOpen: Boolean,
      plus: Boolean
    },
    computed: {
      btOutput: function () {
        if (this.inputAmount.length <= 3) {
          return this.inputAmount
        } else if (this.inputAmount.length <= 7) {
          return Number(this.inputAmount).toLocaleString()
        } else {
          return `not support rich`
        }
      },
      plusMark() {
        if (this.plus === true) {
          return "+"
        } else {
          return "-"
        }
      }
    },
    methods: {
      changePlusMark() {
        this.$emit('update:plus', !this.plus)
      },
      enterNumber(number) {
        if ((this.inputAmount.indexOf('.') > -1) && (number === '.')) return
        let newNumber = number
        if (this.inputAmount !== '0') {
          newNumber = String(this.inputAmount + number)
        } else if (this.inputAmount === '0' && number === '.') {
          newNumber = '0.'
        }
        this.$emit('update:inputAmount', newNumber)
      },
      deleteEnter() {
        let newNumber = '0'
        if (this.inputAmount.length > 1) {
          newNumber = this.inputAmount.slice(0, -1)
        }
        this.$emit('update:inputAmount', newNumber)
      },
      submitEnter() {
        this.$emit('update:addRecord')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .numberPad {
    /*position: absolute;*/
    bottom: 0;
    left: 0px;
    width: 100%;

    .output {
      display: flex;
      justify-content: space-between;
      //@extend %clearFix;
      //@extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;

    }

    .buttons {
      //@extend %clearFix;

      > button {
        outline: none;
        cursor: pointer;
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*1%;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>