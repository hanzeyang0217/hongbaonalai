<template>
  <nav>
    <router-link to="/RecordInput" class="item" active-class="selected">
      花钱
    </router-link>
    <router-link to="/MoneyPlanMgr" class="item" active-class="selected">
      计划
    </router-link>
    <router-link to="/FortuneTelling" class="item" active-class="selected">
      推移
    </router-link>
  </nav>
</template>

<script lang="js">
  export default {
    name: "Nav",
  }
</script>

<style lang="scss" scoped>
  $font-hei: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  $font-kai: Baskerville, Georgia, "Liberation Serif", "Kaiti SC", STKaiti, "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", KaiTi, KaiTi_GB2312, DFKai-SB, "TW\-Kai", serif;
  $font-song: Georgia, "Nimbus Roman No9 L", "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif;

  $color-highlight: rgb(255 216 102);

  %clearFix {
    &::after {
      content: '';
      clear: both;
      display: block;
    }
  }

  $color-shadow: rgba(0, 0, 0, 0.25);
  %outerShadow {
    box-shadow: 0 0 3px $color-shadow;
  }

  %innerShadow {
    box-shadow: inset 0 -3px 3px -3px $color-shadow,
    inset 0 3px 3px -3px $color-shadow;
  }

  nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    height: 56px;

    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 4px;
      color: $color-highlight;;

      .icon {
        width: 32px;
        height: 32px;
      }
    }

    > .item.selected {
      background-color: $color-highlight;
      color: white;
    }
  }
</style>