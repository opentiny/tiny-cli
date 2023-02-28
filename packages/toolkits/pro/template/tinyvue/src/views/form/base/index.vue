<template>
  <div class="container-form">
    <Breadcrumb :items="['menu.form', 'menu.form.base']" />
    <div class="base-card">
      <tiny-collapse v-model="activeNames" @change="change">
        <tiny-collapse-item :title="$t('baseForm.form.project')" name="project">
          <homefrom
            :project-data="(projectData.Project as [] | any)"
          ></homefrom>
        </tiny-collapse-item>

        <tiny-collapse-item
          :title="$t('baseForm.form.label.people')"
          name="people"
        >
          <peoplefrom
            ref="peopleFormRef"
            :project-data="projectData"
            :people-vis="peopleVis"
          ></peoplefrom>
        </tiny-collapse-item>

        <tiny-collapse-item
          :title="$t('baseForm.form.label.Objectives')"
          name="objectives"
        >
          <objectivefrom ref="objectiveRef"></objectivefrom>
        </tiny-collapse-item>
        <tiny-collapse-item :title="$t('baseForm.form.label.plan')" name="plan">
          <planfrom
            ref="planFromRef"
            :project-data="projectData"
            :plan-vis="planVis"
          ></planfrom>
        </tiny-collapse-item>
        <tiny-collapse-item
          :title="$t('baseForm.form.label.evaluation')"
          name="evaluation"
        >
          <evaluationfrom ref="evaluationRef"></evaluationfrom>
        </tiny-collapse-item>
        <tiny-collapse-item
          :title="$t('baseForm.form.label.mentortitle')"
          name="mentortitle"
        >
          <tiny-scroll-text :hover-stop="true" class="card-tip" :time="10">
            <InfoCircle></InfoCircle>
            &nbsp;
            {{ $t('baseForm.form.label.mentortip') }}
          </tiny-scroll-text>
          <mentorfrom ref="mentorRef"></mentorfrom>
        </tiny-collapse-item>
        <tiny-collapse-item
          :title="$t('baseForm.form.label.remindertitle')"
          name="remindertitle"
        >
          <reminderfrom ref="reminderRef"></reminderfrom>
        </tiny-collapse-item>
      </tiny-collapse>
      <div class="base-foot">
        <tiny-button
          type="primary"
          native-type="submit"
          @click="handleSubmit"
          >{{ $t('baseForm.form.submit') }}</tiny-button
        >
        <tiny-button @click="handleFormReset">
          {{ $t('baseForm.form.cancel') }}
        </tiny-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Collapse as TinyCollapse,
    CollapseItem as TinyCollapseItem,
    Button as TinyButton,
    ScrollText as TinyScrollText,
    Loading,
    Modal,
  } from '@opentiny/vue';
  import { IconInfoCircle } from '@opentiny/vue-icon';
  import { getBaseData } from '@/api/form';
  import peoplefrom from './components/people-from.vue';
  import objectivefrom from './components/objective-from.vue';
  import planfrom from './components/plan-from.vue';
  import evaluationfrom from './components/evaluation-from.vue';
  import mentorfrom from './components/mentor-from.vue';
  import reminderfrom from './components/reminder-from.vue';
  import homefrom from './components/home-from.vue';

  // 加载效果
  const state = reactive<{
    loading: any;
  }>({
    loading: null,
  });

  // 初始化请求数据
  const { t } = useI18n();
  const peopleFormRef = ref();
  const planFromRef = ref();
  const objectiveRef = ref();
  const evaluationRef = ref();
  const mentorRef = ref();
  const reminderRef = ref();
  const InfoCircle = IconInfoCircle();
  const activeNames = [
    'project',
    'people',
    'objectives',
    'plan',
    'evaluation',
    'mentortitle',
    'remindertitle',
  ];
  const peopleVis = ref(true);
  const planVis = ref(true);
  const projectData = reactive({
    Project: [],
    rank: [],
    person: [],
    frequency: [],
  });

  // 请求数据接口方法
  const fetchData = async () => {
    state.loading = Loading.service({
      text: 'loading...',
      target: document.getElementById('container'),
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      const { data } = await getBaseData();
      projectData.Project = data.Project;
      projectData.rank = data.rank;
      projectData.person = data.person;
      projectData.frequency = data.frequency;
    } finally {
      state.loading.close();
    }
  };

  // 初始化请求数据
  onMounted(() => {
    fetchData();
  });

  // form的button
  function handleFormReset() {
    peopleFormRef.value.peopleReset();
    objectiveRef.value.objectiveReset();
    planFromRef.value.planReset();
    evaluationRef.value.evaluationReset();
    mentorRef.value.mentorReset();
    reminderRef.value.reminderReset();
  }

  function handleSubmit() {
    const peopleValid = peopleFormRef.value.peopleValid();
    const planValid = peopleFormRef.value.peopleValid();
    if (peopleValid && planValid) {
      Modal.message({
        message: t('baseForm.form.submit.success'),
        status: 'success',
      });
    } else {
      Modal.message({
        message: t('baseForm.form.submit.error'),
        status: 'error',
      });
    }
  }

  //  解决折叠气泡显示
  const change = (val: any) => {
    let peopleIndex = val.indexOf('people');
    peopleIndex > -1 ? (peopleVis.value = true) : (peopleVis.value = false);
    let planIndex = val.indexOf('plan');
    planIndex > -1 ? (planVis.value = true) : (planVis.value = false);
  };
</script>

<style scoped lang="less">
  .container-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 98%;
    height: inherit;
    margin: 0 auto;
    overflow: hidden;
  }

  .base-card {
    flex: 1 1 auto;
    height: 100%;
    margin: 0 10px;
    padding: 10px 15px;
    overflow: auto;
    background: #fff;
    border-radius: 10px;

    .card-tip {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 5px;
      color: rgb(15, 4, 4);
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
      background: #e6f7ff;
      border: 1px solid #91d5ff;

      :deep(.tiny-scroll-text) {
        width: 100%;
        background: #e6f7ff;
      }
    }

    :deep(.tiny-collapse-item) {
      margin-bottom: 20px;
    }

    .frequency {
      width: 200px;
    }
  }

  .base-foot {
    padding-top: 20px;
  }

  :deep(.tiny-button) {
    width: 100px;
    height: 36px;
    border-radius: 4px;
  }
</style>
