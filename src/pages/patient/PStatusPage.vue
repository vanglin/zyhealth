<template lang="html">
  <main>
    <van-nav-bar
      title="当前状态"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs @click="handleTabClick">
      <van-tab  :title="'哮喘'">
      </van-tab>
      <van-tab :title="'鼻炎'">
      </van-tab>
      <van-tab :title="'健康数据'">
      </van-tab>
    </van-tabs>

    <section v-show='curindex == 0'>

      <div class="row">
        <p>你好，你的年龄为{{age}}岁，适用于{{test}}测试</p>
        <div class="flexrow testwrap">
          <p class="test">{{test}}测试</p>
          <div class="testbtn">
            <van-button type="primary" class="historybtn" @click='tohistorypage()'>历史记录</van-button>
          </div>
        </div>
      </div>


      <div v-show='age <= 5'>

        <div class="row">
          <p>1. 在过去的4周内，孩子收到呼吸问题（比如喘息、咳嗽或呼吸短促）的困扰有多频繁？</p>
          <van-radio name="11" v-model="radio11">
            根本没有
          </van-radio>
          <van-radio name="12" v-model="radio11">
            1次或2次
          </van-radio>
          <van-radio name="13" v-model="radio11">
            每周1次
          </van-radio>
          <van-radio name="14" v-model="radio11">
            每周2次或3次
          </van-radio>
          <van-radio name="15" v-model="radio11">
            每周4次或更多次
          </van-radio>
        </div>

        <div class="row">
          <p>2. 在过去的4周内，孩子收到呼吸问题（比如喘息、咳嗽或呼吸短促）在晚上醒来有多频繁？</p>
          <van-radio name="11" v-model="radio12">
            根本没有
          </van-radio>
          <van-radio name="12" v-model="radio12">
            1次或2次
          </van-radio>
          <van-radio name="13" v-model="radio12">
            每周1次
          </van-radio>
          <van-radio name="14" v-model="radio12">
            每周2次或3次
          </van-radio>
          <van-radio name="15" v-model="radio12">
            每周4次或更多次
          </van-radio>
        </div>

        <div class="row">
          <p>3. 在过去的4周内，孩子收到呼吸问题（比如喘息、咳嗽或呼吸短促）在多大程度
            上干扰他或她玩耍、上学或进行同龄儿童应该进行的平常活动的能力？</p>
          <van-radio name="11" v-model="radio13">
            根本没有
          </van-radio>
          <van-radio name="12" v-model="radio13">
            轻微
          </van-radio>
          <van-radio name="13" v-model="radio13">
            中等
          </van-radio>
          <van-radio name="14" v-model="radio13">
            相当大
          </van-radio>
          <van-radio name="15" v-model="radio13">
            极大
          </van-radio>
        </div>

        <div class="row">
          <p>4. 在过去的3个月内，您需要使用快速缓解药物（博利康尼、沙丁胺醇、万托林）来治疗孩子的呼吸问题（喘息、咳嗽、呼吸短促）有多频繁？</p>
          <van-radio name="11" v-model="radio14">
            根本没有
          </van-radio>
          <van-radio name="12" v-model="radio14">
            1次或2次
          </van-radio>
          <van-radio name="13" v-model="radio14">
            每周1次
          </van-radio>
          <van-radio name="14" v-model="radio14">
            每周2次或3次
          </van-radio>
          <van-radio name="15" v-model="radio14">
            每周4次或更多次
          </van-radio>
        </div>

        <div class="row">
          <p>5. 在过去的12个月内，孩子需要全身糖皮质激素（口服泼尼松或泼尼松龙、注射甲泼尼龙或琥珀酸氢化可的松）
            或加用局部糖皮质激素（高剂量）来治疗其他药物无法控制的呼吸问题有多频繁？</p>
          <van-radio name="11" v-model="radio15">
            根本没有
          </van-radio>
          <van-radio name="12" v-model="radio15">
            1次
          </van-radio>
          <van-radio name="13" v-model="radio15">
            每周1次
          </van-radio>
          <van-radio name="14" v-model="radio15">
            每周2次或3次
          </van-radio>
          <van-radio name="15" v-model="radio15">
            每周4次或更多次
          </van-radio>
        </div>

      </div>


      <div v-show='age >=6 && age < 12'>
        <div class="row">
          <p>1.今天你的哮喘怎么样（儿童回答）？？</p>
          <van-radio name="21" v-model="radio21">
            很差
          </van-radio>
          <van-radio name="22" v-model="radio21">
            差
          </van-radio>
          <van-radio name="23" v-model="radio21">
            好
          </van-radio>
          <van-radio name="24" v-model="radio21">
            很好
          </van-radio>
        </div>

        <div class="row">
          <p>2.当你在跑步、锻炼或运动的时候，哮喘是个多大的问题（儿童回答）？</p>
          <van-radio name="21" v-model="radio22">
            这是个大问题，我不能做我想做的事
          </van-radio>
          <van-radio name="22" v-model="radio22">
            这是个问题，我不喜欢它
          </van-radio>
          <van-radio name="23" v-model="radio22">
            这是个小问题，但我能应付它
          </van-radio>
          <van-radio name="24" v-model="radio22">
            没问题
          </van-radio>

        </div>

        <div class="row">
          <p>3.你会因哮喘而咳嗽吗（儿童回答)？</p>
          <van-radio name="21" v-model="radio23">
            会，一直都会
          </van-radio>
          <van-radio name="22" v-model="radio23">
            会，大部分时间会
          </van-radio>
          <van-radio name="23" v-model="radio23">
            会，有些时候会
          </van-radio>
          <van-radio name="24" v-model="radio23">
            从来不会
          </van-radio>

        </div>

        <div class="row">
          <p>4.你会因为哮喘而在夜里醒来吗（儿童回答）</p>
          <van-radio name="21" v-model="radio24">
            会，所有时间
          </van-radio>
          <van-radio name="22" v-model="radio24">
            会，大部分时间
          </van-radio>
          <van-radio name="23" v-model="radio24">
            会，有些时间
          </van-radio>
          <van-radio name="24" v-model="radio24">
            从来不会
          </van-radio>

        </div>

        <div class="row">
          <p>5.在过去的4周里，您的孩子有多少天有日间哮喘症状？</p>
          <van-radio name="21" v-model="radio25">
            没有
          </van-radio>
          <van-radio name="22" v-model="radio25">
            1~3天
          </van-radio>
          <van-radio name="23" v-model="radio25">
            4~10天
          </van-radio>
          <van-radio name="24" v-model="radio25">
            11~18天
          </van-radio>
          <van-radio name="25" v-model="radio25">
            19~24天
          </van-radio>
          <van-radio name="26" v-model="radio25">
            每天
          </van-radio>
        </div>

        <div class="row">
          <p>6.在过去的4周里，您的孩子有多少天在白天出现喘息声？</p>
          <van-radio name="21" v-model="radio26">
            没有
          </van-radio>
          <van-radio name="22" v-model="radio26">
            1~3天
          </van-radio>
          <van-radio name="23" v-model="radio26">
            4~10天
          </van-radio>
          <van-radio name="24" v-model="radio26">
            11~18天
          </van-radio>
          <van-radio name="25" v-model="radio26">
            19~24天
          </van-radio>
          <van-radio name="26" v-model="radio26">
            每天
          </van-radio>
        </div>

        <div class="row">
          <p>7.在过去的4周里，您的孩子有多少天因为哮喘而在夜里醒来？</p>
          <van-radio name="21" v-model="radio27">
            没有
          </van-radio>
          <van-radio name="22" v-model="radio27">
            1~3天
          </van-radio>
          <van-radio name="23" v-model="radio27">
            4~10天
          </van-radio>
          <van-radio name="24" v-model="radio27">
            11~18天
          </van-radio>
          <van-radio name="25" v-model="radio27">
            19~24天
          </van-radio>
          <van-radio name="26" v-model="radio27">
            每天
          </van-radio>
        </div>
      </div>

      <div v-show='age >= 12'>
        <div class="row">
          <p>1.在过去4周内，在工作、学习或家中，有多少时候哮喘妨碍您进行日常活动？</p>
          <van-radio name="31" v-model="radio31">
            所有时间
          </van-radio>
          <van-radio name="32" v-model="radio31">
            大多数时候
          </van-radio>
          <van-radio name="33" v-model="radio31">
            有些时候
          </van-radio>
          <van-radio name="34" v-model="radio31">
            很少时候
          </van-radio>
          <van-radio name="35" v-model="radio31">
            没有
          </van-radio>
        </div>

        <div class="row">
          <p>2.在过去的4周内，您有多少次呼吸困难？</p>
          <van-radio name="31" v-model="radio32">
            每天不止1次
          </van-radio>
          <van-radio name="32" v-model="radio32">
            一天一次
          </van-radio>
          <van-radio name="33" v-model="radio32">
            每周3到6次
          </van-radio>
          <van-radio name="34" v-model="radio32">
            每周1到2次
          </van-radio>
          <van-radio name="35" v-model="radio32">
            没有
          </van-radio>

        </div>

        <div class="row">
          <p>3.在过去4周内，因为哮喘症状（喘息、咳嗽、呼吸困难、胸闷或疼痛），您有多少次在夜间醒来或早上比平时早醒？</p>
          <van-radio name="31" v-model="radio33">
            每周4晚或更多
          </van-radio>
          <van-radio name="32" v-model="radio33">
            每周2至3晚
          </van-radio>
          <van-radio name="33" v-model="radio33">
            每周1次
          </van-radio>
          <van-radio name="34" v-model="radio33">
            1至2次
          </van-radio>
          <van-radio name="35" v-model="radio33">
            没有
        </van-radio>

        </div>

        <div class="row">
          <p>4.在过去4周内，您有多少次使用急救药物治疗（如沙丁胺醇）？</p>
          <van-radio name="31" v-model="radio34">
            每天3次以上
          </van-radio>
          <van-radio name="32" v-model="radio34">
            每天1至2次
          </van-radio>
          <van-radio name="33" v-model="radio34">
            每周2至3次
          </van-radio>
          <van-radio name="34" v-model="radio34">
            每周1次或更少
          </van-radio>
          <van-radio name="35" v-model="radio34">
            没有
          </van-radio>

        </div>

        <div class="row">
          <p>5.您如何评估过去4周内您的哮喘控制情况？</p>
          <van-radio name="31" v-model="radio35">
            没有控制
          </van-radio>
          <van-radio name="32" v-model="radio35">
            控制很差
          </van-radio>
          <van-radio name="33" v-model="radio35">
            有所控制
          </van-radio>
          <van-radio name="34" v-model="radio35">
            控制很好
          </van-radio>
          <van-radio name="35" v-model="radio35">
            完全控制
          </van-radio>
        </div>
      </div>


      <div class="btn">
        <van-button bottom-action class="resultbtn" @click='toresultpage()'>查看测试结果</van-button>
      </div>



    </section>


    <section v-show='curindex == 1'>

      <div class="row">
        <div class="flexrow">
          <p>过敏性鼻结膜炎质量调查</p>
          <div class="testbtn">
            <van-button type="primary" class="historybtn" @click='tohistorypage()'>历史记录</van-button>
          </div>
        </div>
      </div>

      <div class="row">
        <p>1.日常生活活动</p>
        <div class="imgswrap">
          <img :src="bs1r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs1r1 = 1">
          <img :src="bs1r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs1r1 = 2">
          <img :src="bs1r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs1r1 = 3">
          <img :src="bs1r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs1r1 = 4">
        </div>
      </div>

      <div class="row">
        <p>2.睡眠</p>
        <ul>
          <li>入睡困难</li>
          <div class="imgswrap">
            <img :src="bs2r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs2r1 = 1">
            <img :src="bs2r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs2r1 = 2">
            <img :src="bs2r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs2r1 = 3">
            <img :src="bs2r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs2r1 = 4">
          </div>
          <li>睡中觉醒</li>
          <div class="imgswrap">
            <img :src="bs2r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs2r2 = 1">
            <img :src="bs2r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs2r2 = 2">
            <img :src="bs2r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs2r2 = 3">
            <img :src="bs2r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs2r2 = 4">
          </div>
          <li>睡眠质量差</li>
          <div class="imgswrap">
            <img :src="bs2r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs2r3 = 1">
            <img :src="bs2r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs2r3 = 2">
            <img :src="bs2r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs2r3 = 3">
            <img :src="bs2r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs2r3 = 4">
          </div>
        </ul>
      </div>

      <div class="row">
        <p>3.鼻症状(AR)</p>
        <ul>
          <li>鼻塞</li>
          <div class="imgswrap">
            <img :src="bs3r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs3r1 = 1">
            <img :src="bs3r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs3r1 = 2">
            <img :src="bs3r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs3r1 = 3">
            <img :src="bs3r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs3r1 = 4">
          </div>
          <li>鼻涕</li>
          <div class="imgswrap">
            <img :src="bs3r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs3r2 = 1">
            <img :src="bs3r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs3r2 = 2">
            <img :src="bs3r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs3r2 = 3">
            <img :src="bs3r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs3r2 = 4">
          </div>
          <li>打喷嚏</li>
          <div class="imgswrap">
            <img :src="bs3r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs3r3 = 1">
            <img :src="bs3r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs3r3 = 2">
            <img :src="bs3r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs3r3 = 3">
            <img :src="bs3r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs3r3 = 4">
          </div>
          <li>鼻后滴漏/鼻痒</li>
          <div class="imgswrap">
            <img :src="bs3r4 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs3r4 = 1">
            <img :src="bs3r4 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs3r4 = 2">
            <img :src="bs3r4 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs3r4 = 3">
            <img :src="bs3r4 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs3r4 = 4">
          </div>
        </ul>
      </div>

      <div class="row">
        <p>4.眼症状(VAS)</p>
        <ul>
          <li>眼痒</li>
          <div class="imgswrap">
            <img :src="bs4r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs4r1 = 1">
            <img :src="bs4r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs4r1 = 2">
            <img :src="bs4r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs4r1 = 3">
            <img :src="bs4r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs4r1 = 4">
          </div>
          <li>流泪</li>
          <div class="imgswrap">
            <img :src="bs4r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs4r2 = 1">
            <img :src="bs4r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs4r2 = 2">
            <img :src="bs4r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs4r2 = 3">
            <img :src="bs4r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs4r2 = 4">
          </div>
          <li>眼痛</li>
          <div class="imgswrap">
            <img :src="bs4r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs4r3 = 1">
            <img :src="bs4r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs4r3 = 2">
            <img :src="bs4r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs4r3 = 3">
            <img :src="bs4r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs4r3 = 4">
          </div>
        </ul>
      </div>

      <div class="row">
        <p>5.非鼻/眼症状</p>
        <ul>
          <li>疲倦\疲劳</li>
          <div class="imgswrap">
            <img :src="bs5r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs5r1 = 1">
            <img :src="bs5r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs5r1 = 2">
            <img :src="bs5r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs5r1 = 3">
            <img :src="bs5r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs5r1 = 4">
          </div>
          <li>口渴</li>
          <div class="imgswrap">
            <img :src="bs5r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs5r2 = 1">
            <img :src="bs5r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs5r2 = 2">
            <img :src="bs5r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs5r2 = 3">
            <img :src="bs5r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs5r2 = 4">
          </div>
          <li>工作效率低</li>
          <div class="imgswrap">
            <img :src="bs5r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs5r3 = 1">
            <img :src="bs5r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs5r3 = 2">
            <img :src="bs5r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs5r3 = 3">
            <img :src="bs5r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs5r3 = 4">
          </div>
          <li>注意力不集中</li>
          <div class="imgswrap">
            <img :src="bs5r4 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs5r4 = 1">
            <img :src="bs5r4 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs5r4 = 2">
            <img :src="bs5r4 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs5r4 = 3">
            <img :src="bs5r4 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs5r4 = 4">
          </div>
        </ul>
      </div>

      <div class="row">
        <p>6. 实际问题</p>
        <ul>
          <li>因需要经常用纸巾觉得不方便</li>
          <div class="imgswrap">
            <img :src="bs6r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs6r1 = 1">
            <img :src="bs6r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs6r1 = 2">
            <img :src="bs6r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs6r1 = 3">
            <img :src="bs6r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs6r1 = 4">
          </div>
          <li>揉鼻子/眼</li>
          <div class="imgswrap">
            <img :src="bs6r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs6r2 = 1">
            <img :src="bs6r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs6r2 = 2">
            <img :src="bs6r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs6r2 = 3">
            <img :src="bs6r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs6r2 = 4">
          </div>
          <li>需反复吸鼻</li>
          <div class="imgswrap">
            <img :src="bs6r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs6r3 = 1">
            <img :src="bs6r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs6r3 = 2">
            <img :src="bs6r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs6r3 = 3">
            <img :src="bs6r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs6r3 = 4">
          </div>
        </ul>
      </div>

      <div class="row">
        <p>7. 情感</p>
        <ul>
          <li>沮丧</li>
          <div class="imgswrap">
            <img :src="bs7r1 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs7r1 = 1">
            <img :src="bs7r1 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs7r1 = 2">
            <img :src="bs7r1 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs7r1 = 3">
            <img :src="bs7r1 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs7r1 = 4">
          </div>
          <li>不耐烦</li>
          <div class="imgswrap">
            <img :src="bs7r2 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs7r2 = 1">
            <img :src="bs7r2 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs7r2 = 2">
            <img :src="bs7r2 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs7r2 = 3">
            <img :src="bs7r2 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs7r2 = 4">
          </div>
          <li>易怒</li>
          <div class="imgswrap">
            <img :src="bs7r3 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs7r3 = 1">
            <img :src="bs7r3 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs7r3 = 2">
            <img :src="bs7r3 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs7r3 = 3">
            <img :src="bs7r3 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs7r3 = 4">
          </div>
          <li>因症状而尴尬</li>
          <div class="imgswrap">
            <img :src="bs7r4 == 1 ? require('../../assets/images/face1sd.png') : require('../../assets/images/face1.png')" alt="" @click="bs7r4 = 1">
            <img :src="bs7r4 == 2 ? require('../../assets/images/face2sd.png') : require('../../assets/images/face2.png')" alt="" @click="bs7r4 = 2">
            <img :src="bs7r4 == 3 ? require('../../assets/images/face3sd.png') : require('../../assets/images/face3.png')" alt="" @click="bs7r4 = 3">
            <img :src="bs7r4 == 4 ? require('../../assets/images/face4sd.png') : require('../../assets/images/face4.png')" alt="" @click="bs7r4 = 4">
          </div>
        </ul>
      </div>

      <div class="btn">
        <van-button bottom-action class="resultbtn" @click='toresultpage()'>查看测试结果</van-button>
      </div>


    </section>






    <section v-show='curindex == 2'>
      <div class="row">
        <p class="time">{{curDataStr}}</p>
        <p class="hint">早上和晚上各测试一次,每天吹三次,记录最佳值.
          <img src="../../assets/images/help.png" alt="" @click='tohelppage()'>
        </p>
      </div>

      <div class="flexrow">
        <p class="shangwu" v-bind:class="{ activetime: !isxiawu }" @click="toshangwu()">上午</p>
        <p class="xiawu" v-bind:class="{ activetime: isxiawu }" @click="toxiawu()">下午</p>
      </div>

      <div class="flexrow flexright">
        <div class="flexcol">
          <p>PEF个人最佳值(L/min)</p>
          <p>PEF个人预计值(L/min)</p>
          <p>FEV1(L)</p>
          <p>FVC</p>
          <p>PEF日变异率(%)</p>
        </div>
        <div class="flexcol">
          <van-field v-model="pefbest" class="inputborder"/>
          <van-field v-model="pefpredict" class="inputborder"/>
          <van-field v-model="pev1" class="inputborder"/>
          <van-field v-model="pvc" class="inputborder"/>
          <van-field v-model="pef" class="inputborder"/>
        </div>
      </div>

      <div class="row">
        <p class="hintmiaoshu">症状描述</p>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '感觉良好' }" @click="zztagclick('感觉良好')">感觉良好</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '咳嗽' }" @click="zztagclick('咳嗽')">咳嗽</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '气急' }" @click="zztagclick('气急')">气急</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '夜间憋醒' }" @click="zztagclick('夜间憋醒')">夜间憋醒</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '活动受限' }" @click="zztagclick('活动受限')">活动受限</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '发热' }" @click="zztagclick('发热')">发热</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '喘息' }" @click="zztagclick('喘息')">喘息</span>
        <span class="van-tag" v-bind:class="{ activetag: symDescription == '其他' }" @click="zztagclick('其他')">其他</span>
      </div>

      <div class="row">
        <p class="hintmiaoshu">用药记录</p>
        <span class="van-tag" v-bind:class="{ activetag: medRecord == '未用药' }" @click="yytagclick('未用药')">未用药</span>
        <span class="van-tag" v-bind:class="{ activetag: medRecord == '控制用药' }" @click="yytagclick('控制用药')">控制用药</span>
        <span class="van-tag" v-bind:class="{ activetag: medRecord == '急救用药' }" @click="yytagclick('急救用药')">急救用药</span>
        <div class="btn">
          <van-button bottom-action class="addbtn" @click="saveevadata()">提交</van-button>
        </div>
      </div>

    </section>


  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import moment from "moment";
export default {
  data(){
    return{
      curindex:0,
      age:'',
      test:'',
      type:'',

      radio11:'',
      radio12:'',
      radio13:'',
      radio14:'',
      radio15:'',

      radio21: '',
      radio22:'',
      radio23:'',
      radio24:'',
      radio25:'',
      radio26:'',
      radio27:'',

      radio31: '',
      radio32:'',
      radio33:'',
      radio34:'',
      radio35:'',


      bs1r1:'',

      bs2r1:'',
      bs2r2:'',
      bs2r3:'',

      bs3r1:'',
      bs3r2:'',
      bs3r3:'',
      bs3r4:'',

      bs4r1:'',
      bs4r2:'',
      bs4r3:'',

      bs5r1:'',
      bs5r2:'',
      bs5r3:'',
      bs5r4:'',

      bs6r1:'',
      bs6r2:'',
      bs6r3:'',

      bs7r1:'',
      bs7r2:'',
      bs7r3:'',
      bs7r4:'',

      curDataStr:moment().format('YYYY-MM-DD'),

      isxiawu:false,
      pefbest:'',
      pefpredict:'',
      pev1:'',
      pvc:'',
      pef:'',
      medRecord:'',
      symDescription:'',
      shangwures:'',
      xiawures:'',
      shangwuevaobj:'',
      xiawuevaobj:'',
      evatype:0,
      deviceid:''

    }
  },
  methods:{
    handleTabClick(index) {
      this.curindex = index;
      // console.log(this.curindex);
      if(this.curindex == 0){
        if (this.age <= 5) {
          this.test = 'TRACK';
          this.type = 1;
        }else if(this.age > 5 && this.age < 12){
          this.test = 'C-ACT';
          this.type = 2;
        }else{
          this.test = 'ACT';
          this.type = 3;
        }
      }
      else if(this.curindex == 1){
        this.test = 'SAR';
      }

      else if (this.curindex == 2) {
        this.getevadata();
        this.getdevicedata();
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    tohelppage(){
      this.$router.push({path:'/phelp'});
    },
    tohistorypage(){
      this.$router.push({path:'/phistory',query: { evaType: this.test}});
      // this.$router.push({path:'/phistory'});
    },
    getvalue(item){
      switch (item) {
        case '11':
          return 1;
        case '12':
          return 2;
        case '13':
          return 3;
        case '14':
          return 4;
        case '15':
          return 5;

        case '21':
          return 1;
        case '22':
          return 2;
        case '23':
          return 3;
        case '24':
          return 4;
        case '25':
          return 5;
        case '26':
          return 6;

        case '31':
          return 1;
        case '32':
          return 2;
        case '33':
          return 3;
        case '34':
          return 4;
        case '35':
          return 5;


        default:
          return 0;
      }
    },

    tores1(){
      var res = 0;
      if (this.type == 1) {
        if (this.radio11 == '' || this.radio12 == '' || this.radio13 == '' || this.radio14 == ''|| this.radio15 == '') {
          Toast('请完成测试');
          return;
        }
        var qres = [this.radio11,this.radio12,this.radio13,this.radio14,this.radio15];
        for (var i = 0; i < qres.length; i++) {
          let item = qres[i];
          res += this.getvalue(item);
        }
      }

      else if(this.type == 2){
        if (this.radio21 == '' || this.radio22 == '' || this.radio23 == '' || this.radio24 == '' || this.radio25 == '' || this.radio26 == '' || this.radio27 == '') {
          Toast('请完成测试');
          return;
        }
        var qres = [this.radio21,this.radio22,this.radio23,this.radio24,this.radio25,this.radio26,this.radio27];
        for (var i = 0; i < qres.length; i++) {
          let item = qres[i];
          res += this.getvalue(item);
        }
      }

      else if(this.type == 3){
        if (this.radio31 == '' || this.radio32 == '' || this.radio33 == '' || this.radio34 == '' || this.radio35 == '') {
          Toast('请完成测试');
          return;
        }
        var qres = [this.radio31,this.radio32,this.radio33,this.radio34,this.radio35];
        for (var i = 0; i < qres.length; i++) {
          let item = qres[i];
          res += this.getvalue(item);
        }
      }
      this.$router.push({path:'/presult',query: { evaType: this.test,evaValue:res}});

    },
    tores2(){
      var res = 0;

      var qres = [];

      if (this.bs1r1 == '' || this.bs2r1 == '' || this.bs2r2 == '' || this.bs2r3 == ''||
          this.bs3r1 == '' || this.bs3r2 == '' || this.bs3r3 == '' || this.bs3r4 == ''||
          this.bs4r1 == '' || this.bs4r2 == '' || this.bs4r3 == '' ||
          this.bs5r1 == '' || this.bs5r2 == '' || this.bs5r3 == '' || this.bs5r4 == ''||
          this.bs6r1 == '' || this.bs6r2 == '' || this.bs6r3 == '' ||
          this.bs7r1 == '' || this.bs7r2 == '' || this.bs7r3 == '' || this.bs7r4 == ''
        ) {
        Toast('请完成测试');
        return;
      }
      var qres = [this.bs1r1,
                  this.bs2r1,this.bs2r2,this.bs2r3,
                  this.bs3r1,this.bs3r2,this.bs3r3,this.bs3r4,
                  this.bs4r1,this.bs4r2,this.bs4r3,
                  this.bs5r1,this.bs5r2,this.bs5r3,this.bs5r4,
                  this.bs6r1,this.bs6r2,this.bs6r3,
                  this.bs7r1,this.bs7r2,this.bs7r3,this.bs7r4
                  ];
      for (var i = 0; i < qres.length; i++) {
        let item = qres[i];
        res += item;
      }

      this.$router.push({path:'/presult',query: { evaType: 'SAR',evaValue:res}});

    },

    toresultpage(){
      if (this.curindex == 0) {

        this.tores1();
      }
      else if(this.curindex == 1){

        this.tores2();
      }
    },
    toshangwu(){

      this.isxiawu = false;
      this.getevadata();
    },
    toxiawu(){

      this.isxiawu = true;

      this.getevadata();
    },
    zztagclick(item){
      this.symDescription = item;
    },
    yytagclick(item){
      this.medRecord = item;
    },
    getevadata(){
      let userid = localStorage.getItem('userid');
      var params;
      if (!this.isxiawu) {
        params = {
          uid:userid,
          evaType: "PEF",
          startTime:this.curDataStr + " 00:00:00",
          endTime:this.curDataStr + " 12:00:00"
        }
      }else{
        params = {
          uid:userid,
          evaType: "PEF",
          startTime:this.curDataStr + " 12:00:00",
          endTime:this.curDataStr + " 24:00:00"
        }
      }

      axios.post('/API/api/service/evaRec/getList',params)
      .then(response => {
        var healthres = response.data;

        this.shangwures = '';
        this.xiawures = '';
        this.shangwuevaobj = '';
        this.xiawuevaobj = '';
        this.evatype = 0;
        this.pefbest = '';
        this.pefpredict = '';
        this.pev1 = '';
        this.pvc = '';
        this.pef = '';
        this.medRecord = '';
        this.symDescription = '';

        if (healthres.length > 0) {
          this.evatype = 1;

          if (!this.isxiawu) {
            this.shangwures = healthres[0];
            this.shangwuevaobj = JSON.parse(this.shangwures.evaValue);
            this.shangwuevaobj = eval('(' + this.shangwures.evaValue + ')');
            this.pefbest = this.shangwuevaobj.PEFBest;
            this.pefpredict = this.shangwuevaobj.PEFPredict;
            this.pev1 = this.shangwuevaobj.FEV1;
            this.pvc = this.shangwuevaobj.FVC;
            this.pef = this.shangwuevaobj.PEF;
            this.medRecord = this.shangwures.medRecord;
            this.symDescription = this.shangwures.symDescription;

          }else{
            this.xiawures = healthres[0];
            // this.xiawuevaobj = JSON.parse(this.xiawures.evaValue);
            this.xiawuevaobj = eval('(' + this.xiawures.evaValue + ')');
            this.pefbest = this.xiawuevaobj.PEFBest;
            this.pefpredict = this.xiawuevaobj.PEFPredict;
            this.pev1 = this.xiawuevaobj.FEV1;
            this.pvc = this.xiawuevaobj.FVC;
            this.pef = this.xiawuevaobj.PEF;
            this.medRecord = this.xiawures.medRecord;
            this.symDescription = this.xiawures.symDescription;
          }
        }
      })
      .catch(error => {

        Toast('获取数据失败');
      });
    },
    saveevadata(){
      var curtimestr = moment().format('HH');

      if (!this.isxiawu && curtimestr >= '12') {
        Toast('不能提交');
        return;
      }
      else if(this.isxiawu && curtimestr < '12'){
        Toast('不能提交');
        return;
      }
      // else if(this.deviceid == ''){
      //   Toast('请添加设备');
      //   return;
      // }
      else if(this.pefbest == '' || this.pefpredict == '' || this.pev1 == '' || this.pvc == '' || this.pef == '' || this.medRecord == '' || this.symDescription == ''){
        Toast('请完善信息');
        return;
      }

      let userid = localStorage.getItem('userid');


      if (this.evatype == 0) {
        //add
        var evaobj = {
          PEFBest:this.pefbest,
          PEFPredict:this.pefpredict,
          FEV1:this.pev1,
          FVC:this.pvc,
          PEF:this.pef
        }
        var params = {
          deviceId: this.deviceId,
          evaTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          evaType: "PEF",
          evaValue: JSON.stringify(evaobj),
          medRecord:this.medRecord,
          symDescription: this.symDescription,
          uid:userid
        }
        axios.post('/API/api/service/evaRec/add',params)
        .then(response => {
          Toast('添加成功');
        })
        .catch(error => {
          Toast('添加失败');
        });
      }else{
        //update
        var curid = '';
        if (!this.isxiawu) {
          curid = this.shangwures.id;
        }else{
          curid = this.xiawures.id;
        }
        var evaobj = {
          PEFBest:this.pefbest,
          PEFPredict:this.pefpredict,
          FEV1:this.pev1,
          FVC:this.pvc,
          PEF:this.pef
        }
        var params = {
          deviceId: this.deviceId,
          evaTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          evaType: "PEF",
          evaValue: JSON.stringify(evaobj),
          medRecord:this.medRecord,
          symDescription: this.symDescription,
          uid:userid,
          id:curid
        }
        axios.post('/API/api/service/evaRec/update',params)
        .then(response => {
          Toast('修改成功');
        })
        .catch(error => {
          Toast('修改失败');
        });
      }

    },
    getdevicedata(){
      let api = 'API/api/service/device/list';
      axios.get(api)
      .then(response => {
        var res = response.data;
        if (res.length > 0) {
          this.deviceid = res[0].id;
        }
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }

  },
  mounted(){
    this.age = localStorage.getItem('userage');
    if (this.age <= 5) {
      this.test = 'TRACK';
      this.type = 1;
    }else if(this.age > 5 && this.age < 12){
      this.test = 'C-ACT';
      this.type = 2;
    }else{
      this.test = 'ACT';
      this.type = 3;
    }
  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}



.test{
  font-size: 24px;
  color: #37BEA9;
}

.testwrap{
  margin-top: 10px;
}

.testbtn{
  flex: 1;
  text-align: right;
}
.historybtn{
  height: 24px;
  line-height: 24px;
  background-color: #37BEA9;
}

.btn{
  padding-bottom: 10px;
}

.resultbtn{
  border-radius: 20px;
  width: 50%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;

}

.imgswrap img{
  width: 40px;
  display: inline-block;
  padding-top: 10px;
  /* margin-right: 10px; */
}

.row ul{
  margin-left: 10px;
}

.row li{
  padding-top: 10px;
  font-size: 12px;
}

.row{
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
}

.row p{
  margin: 0;
  padding: 0;
}
.row .time{
  color: #37BEA9;
}
.row .hint{
  font-size: 12px;
}
.row .hint img{
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: text-bottom;
}

.flexrow{
  display: flex;
  background-color: #fff;
}

.flexright{
  text-align: right;
  margin-top: 10px;
}

.flexcol{
  flex: 1;
}

.flexcol p{
  font-size: 12px;
  line-height: 40px;
  height: 40px;
}
.flexcol .inputborder{
  border: 1px solid #e5e5e5;
  width: 90%;
  padding: 5px 0;
  margin: 10px 0 15px 10px;
}

.flexrow .shangwu{
  flex:1;
  text-align: center;
  padding: 0;
  margin: 10px 0;
}
.flexrow .xiawu{
  flex: 1;
  text-align: center;
  padding: 0;
  margin: 10px 0;
}

.flexrow .activetime{
  color: #37BEA9;
}

.activetag{
  background-color: #37BEA9;
}

.row .hintmiaoshu{
  font-size: 16px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
}

.row .btn{
  margin-top: 20px;
  margin-bottom: 10px;
}
.row .addbtn{
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}
</style>
