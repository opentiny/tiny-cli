<template>
  <div class="container">
    <Breadcrumb :items="['menu.board', 'menu.work']" />
    <div class="content">
      <div class="left">
        <img
          src="@/assets/images/userCenter.png"
          alt="403"
          class="user-image"
        />
        <div class="card">
          <h3>{{ $t('work.index.learn') }}</h3>
          <div>
            <learnplan></learnplan>
          </div>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.coach') }}</h3>
          <div>
            <learncoach></learncoach>
          </div>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.formalization') }}</h3>
          <div>
            <learnprobation></learnprobation>
          </div>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.practiced') }}</h3>
          <div>
            <learnpracticed></learnpracticed>
          </div>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.train') }}</h3>
          <div>
            <learntrain></learntrain>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card">
          <h3>{{ $t('work.index.Inquiry') }}</h3>
          <dl v-for="item in Inquiry" :key="(item as any)">
            <dt>
              <i></i>
              {{ $t(item.label) }}
            </dt>
            <dd>
              <a href="javascript:;">{{ $t(item.value) }}</a>
            </dd>
          </dl>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.Home') }}</h3>
          <dl v-for="item in Home" :key="(item as any)">
            <dt>
              <i></i>
              {{ $t(item.label) }}
            </dt>
            <dd>
              <a href="javascript:;">{{ $t(item.value) }}</a>
            </dd>
          </dl>
        </div>
        <div class="card">
          <h3>{{ $t('work.index.Guide') }}</h3>
          <dl>
            <dt>
              <i></i>
              {{ $t('work.index.Operation') }}
            </dt>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import learnplan from './components/learn-plan.vue';
  import learncoach from './components/learn-coach.vue';
  import learnprobation from './components/learn-probation.vue';
  import learnpracticed from './components/learn-practiced.vue';
  import learntrain from './components/learn-traini.vue';

  const Inquiry = [
    { label: 'work.index.policy', value: 'work.index.Period' },
    { label: 'work.index.Hotline', value: 'work.index.service' },
    { label: 'work.index.Attendance', value: 'work.index.FAQs' },
    { label: 'work.index.Payroll', value: 'work.index.Tax' },
  ];

  const Home = [
    { label: 'work.index.Brave', value: 'work.index.Growth' },
    { label: 'work.index.Termbase', value: 'work.index.lingo' },
    { label: 'work.index.Library', value: 'work.index.domain' },
    { label: 'ilearning', value: 'work.index.platform' },
  ];
</script>

<style scoped lang="less">
  .container {
    width: 100vw;
    margin: 10px;
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }

  .content {
    display: flex;
    justify-content: space-between;
    height: 82vh;
    overflow: auto;

    .left {
      width: 70%;

      img {
        width: 100%;
        height: 110px;
      }

      .card {
        display: flex;
        flex-direction: column;
        height: 200px;
        background-color: #fff;
        border: 5px solid #f5f6f7;

        h3 {
          padding-left: 10px;
          color: black;
        }

        div {
          margin: 0 14px;
          background-color: #f2f8ff;
          border-radius: 4px;
        }
      }
    }

    .right {
      width: 30%;

      .card {
        display: flex;
        flex-direction: column;
        height: 300px;
        color: #010407;
        background-color: #fff;
        border: 5px solid #f5f6f7;

        h3 {
          padding-left: 10px;
        }

        i {
          display: inline-block;
          width: 6px;
          height: 6px;
          font-size: 0;
          background-color: #d9d9d9;
          border-radius: 50%;
        }

        dl {
          padding-left: 20px;

          dt {
            padding-top: 10px;
          }

          dd {
            padding-top: 5px;

            a {
              color: #999;
              text-decoration: none;
            }
          }
        }
      }
    }
  }

  .margin-bottom {
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
  }

  .col > span {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    text-align: center;
  }

  .col > span:first-child {
    color: #010407;
    font-weight: 500;
  }

  .col > span:last-child {
    font-weight: 900;
    font-size: large;
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .content {
      height: 76vh;
    }

    .left,
    .right {
      .card {
        h3 {
          font-size: small;
        }
      }
    }
  }
</style>
