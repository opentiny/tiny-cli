<template>
  <div class="region">
    <div>
      <div class="region-title">
        <img src="@/assets/images/map-background3.png" class="image" />
        <h3>{{ $t('home.region.title') }}</h3>
      </div>
      <div id="earth" ref="echartsDom"></div>
    </div>
    <div class="region-from">
      <RegionTable></RegionTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, inject, ref, nextTick } from 'vue';
  import RegionTable from './regiontable.vue';

  const data = [
    { name: '北京市', value: 350000 },
    { name: '天津市', value: 120000 },
    { name: '上海市', value: 300000 },
    { name: '重庆市', value: 92000 },
    { name: '河北省', value: 25000 },
    { name: '河南省', value: 20000 },
    { name: '云南省', value: 500 },
    { name: '辽宁省', value: 3050 },
    { name: '黑龙江省', value: 80000 },
    { name: '湖南省', value: 2000 },
    { name: '安徽省', value: 24580 },
    { name: '山东省', value: 40629 },
    { name: '新疆维吾尔自治区', value: 36981 },
    { name: '江苏省', value: 13569 },
    { name: '浙江省', value: 24956 },
    { name: '江西省', value: 15194 },
    { name: '湖北省', value: 41398 },
    { name: '广西壮族自治区', value: 41150 },
    { name: '甘肃省', value: 17630 },
    { name: '山西省', value: 27370 },
    { name: '内蒙古自治区', value: 27370 },
    { name: '陕西省', value: 97208 },
    { name: '吉林省', value: 88290 },
    { name: '福建省', value: 19978 },
    { name: '贵州省', value: 94485 },
    { name: '广东省', value: 89426 },
    { name: '青海省', value: 35484 },
    { name: '西藏自治区', value: 97413 },
    { name: '四川省', value: 54161 },
    { name: '宁夏回族自治区', value: 56515 },
    { name: '海南省', value: 54871 },
    { name: '台湾省', value: 48544 },
    { name: '香港省', value: 49474 },
    { name: '澳门特别行政区', value: 34594 },
  ];

  let echarts = inject<any>('echarts');
  const echartsDom = ref();
  let options = {
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      show: true,
      top: '-5px',
      x: 'left',
      y: 'bottom',
      realtime: false,
      splitList: [
        { start: 5000, end: 500000 },
        { start: 4000, end: 5000 },
        { start: 3000, end: 4000 },
        { start: 2000, end: 3000 },
        { start: 1000, end: 2000 },
        { start: 0, end: 1000 },
      ],
      color: ['#9feaa5', '#5475f5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea'],
    },

    series: [
      {
        name: 'china',
        type: 'map',
        mapType: 'china',
        roam: false,
        zoom: 1.2,
        top: '30px',
        itemStyle: {
          normal: {
            borderColor: 'skyblue',
            borderWidth: 1,
            shadowColor: '#ccc',
            shadowBlur: 30,
            opacity: 1,
          },
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 5,
            },
          },
        },
        data,
      },
    ],
  };

  onMounted(() => {
    const chartDom = echartsDom.value;
    const myChart = echarts.init(chartDom as any);
    options && myChart.setOption(options);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
    nextTick(() => {
      myChart.resize()
    });
  });
</script>

<style scoped lang="less">
  .region {
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 10px 0 rgb(64 98 225 / 20%);

    .region-title {
      display: flex;
    }

    h3 {
      width: 300px;
      margin-top: 1.5%;
      margin-left: 10px;
      color: #524343;
      font-weight: 700;
      font-size: 18px;
    }
  }

  #earth {
    width: 32vw;
    height: 358px;
    margin-left: 15%;
  }

  .image {
    width: 25px;
    height: 25px;
    margin-top: 1.5%;
    margin-left: 1.5%;
    background: tomato;
    border-radius: 4px;
    opacity: 0.6;
  }

  .region-from {
    width: 46vw;
    margin-top: 2%;
    margin-left: 5%;
  }
</style>
