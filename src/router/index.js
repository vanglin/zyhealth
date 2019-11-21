import Vue from 'vue'
import Router from 'vue-router'


const LoginPage = resolve =>{
  require(['../pages/user/LoginPage.vue'],resolve)
}

const ForgetPasswdPage = resolve =>{
  require(['../pages/user/ForgetPasswdPage.vue'],resolve)
}

const RegisterPage = resolve =>{
  require(['../pages/user/RegisterPage.vue'],resolve)
}

const XieYiPage = resolve =>{
  require(['../pages/user/XieYiPage.vue'],resolve)
}

const ArticleDetailPage = resolve =>{
  require(['../pages/article/ArticleDetailPage.vue'],resolve)
}


const SportPage = resolve =>{
  require(['../pages/article/SportPage.vue'],resolve)
}

const DietPage = resolve =>{
  require(['../pages/article/DietPage.vue'],resolve)
}

const AsthmaPage = resolve =>{
  require(['../pages/article/AsthmaPage.vue'],resolve)
}

const SciencePage = resolve =>{
  require(['../pages/article/SciencePage.vue'],resolve)
}

const LecturePage = resolve =>{
  require(['../pages/article/LecturePage.vue'],resolve)
}

const ShoppingPage = resolve =>{
  require(['../pages/article/ShoppingPage.vue'],resolve)
}


//doctor
const DHomePage = resolve =>{
  require(['../pages/doctor/DHomePage.vue'],resolve)
}

const DAnswerPage = resolve =>{
  require(['../pages/doctor/DAnswerPage.vue'],resolve)
}

const DMessagePage = resolve =>{
  require(['../pages/doctor/DMessagePage.vue'],resolve)
}

const DMessageDetailPage = resolve =>{
  require(['../pages/doctor/DMessageDetailPage.vue'],resolve)
}


const DPatientPage = resolve =>{
  require(['../pages/doctor/DPatientPage.vue'],resolve)
}

const DSearchPatientPage = resolve =>{
  require(['../pages/doctor/DSearchPatientPage.vue'],resolve)
}


const DPatientDetailPage = resolve =>{
  require(['../pages/doctor/DPatientDetailPage.vue'],resolve)
}

const DSettingPage = resolve =>{
  require(['../pages/doctor/DSettingPage.vue'],resolve)
}

const DDrugListPage = resolve =>{
  require(['../pages/doctor/DDrugListPage.vue'],resolve)
}
const DDrugDetailPage = resolve =>{
  require(['../pages/doctor/DDrugDetailPage.vue'],resolve)
}


//patient
const PHomePage = resolve =>{
  require(['../pages/patient/PHomePage.vue'],resolve)
}
const PStatusPage = resolve =>{
  require(['../pages/patient/PStatusPage.vue'],resolve)
}
const PLogPage = resolve =>{
  require(['../pages/patient/PLogPage.vue'],resolve)
}
const PDoctorPage = resolve =>{
  require(['../pages/patient/PDoctorPage.vue'],resolve)
}

const PDrugListPage = resolve =>{
  require(['../pages/patient/PDrugListPage.vue'],resolve)
}

const PDrugDetailPage = resolve =>{
  require(['../pages/patient/PDrugDetailPage.vue'],resolve)
}

const PDrugSelectDetailPage = resolve =>{
  require(['../pages/patient/PDrugSelectDetailPage.vue'],resolve)
}


const PAddDrugListPage = resolve =>{
  require(['../pages/patient/PAddDrugListPage.vue'],resolve)
}


const PDevicePage = resolve =>{
  require(['../pages/patient/PDevicePage.vue'],resolve)
}
const PUserPage = resolve =>{
  require(['../pages/patient/PUserPage.vue'],resolve)
}
const PMessagePage = resolve =>{
  require(['../pages/patient/PMessagePage.vue'],resolve)
}
const PSettingPage = resolve =>{
  require(['../pages/patient/PSettingPage.vue'],resolve)
}
const PAddUserPage = resolve =>{
  require(['../pages/patient/PAddUserPage.vue'],resolve)
}
const PAnswerPage = resolve =>{
  require(['../pages/patient/PAnswerPage.vue'],resolve)
}
const PMessageDetailPage = resolve =>{
  require(['../pages/patient/PMessageDetailPage.vue'],resolve)
}
const PSNPage = resolve =>{
  require(['../pages/patient/PSNPage.vue'],resolve)
}
const PHelpPage = resolve =>{
  require(['../pages/patient/PHelpPage.vue'],resolve)
}
const PHistoryPage = resolve =>{
  require(['../pages/patient/PHistoryPage.vue'],resolve)
}
const PCePingPage = resolve =>{
  require(['../pages/patient/PCePingPage.vue'],resolve)
}

Vue.use(Router)




export default new Router({
  mode:'history',
  routes: [

    {
      path: '/login',
      component: LoginPage
    },
    {
      path:'/forgetpasswd',
      component:ForgetPasswdPage
    },
    {
      path:'/register',
      component:RegisterPage
    },
    {
      path: '/sport',
      component: SportPage
    },
    {
      path:'/diet',
      component:DietPage
    },
    {
      path:'/asthma',
      component:AsthmaPage
    },
    {
      path:'/science',
      component:SciencePage
    },
    {
      path:'/lecture',
      component:LecturePage
    },
    {
      path:'/shopping',
      component:ShoppingPage
    },
    {
      path:'/articledetail',
      component:ArticleDetailPage
    },
    {
      path:'/doctor',
      component:DHomePage
    },
    {
      path:'/danswer',
      component:DAnswerPage
    },
    {
      path:'/dmessage',
      component:DMessagePage
    },
    {
      path:'/dmessagedetail',
      component:DMessageDetailPage
    },
    {
      path:'/dpatient',
      component:DPatientPage,
    },
    {
      path:'/dpatientsearch',
      component:DSearchPatientPage,
    },
    {
      path:'/dpatientdetail',
      component:DPatientDetailPage
    },
    {
      path:'/dsetting',
      component:DSettingPage
    },
    {
      path:'/patient',
      component:PHomePage
    },
    {
      path:'/pstatus',
      component:PStatusPage
    },
    {
      path:'/plog',
      component:PLogPage
    },
    {
      path:'/pdoctor',
      component:PDoctorPage
    },
    {
      path:'/pdevice',
      component:PDevicePage
    },
    {
      path:'/puser',
      component:PUserPage
    },
    {
      path:'/pmessage',
      component:PMessagePage
    },
    {
      path:'/pmessagedetail',
      component:PMessageDetailPage
    },
    {
      path:'/psetting',
      component:PSettingPage
    },
    {
      path:'/padduser',
      component:PAddUserPage
    },
    {
      path:'/panswer',
      component:PAnswerPage
    },
    {
      path:'/psn',
      component:PSNPage
    },
    {
      path:'/phelp',
      component:PHelpPage
    },
    {
      path:'/phistory',
      component:PHistoryPage
    },
    {
      path:'/presult',
      component:PCePingPage
    },
    {
      path:'/xieyi',
      component:XieYiPage
    },
    {
      path:'/ddrug',
      component:DDrugListPage
    },
    {
      path:'/ddrugdetail',
      component:DDrugDetailPage
    },
    {
      path:'/pdrug',
      component:PDrugListPage
    },
    {
      path:'/pdrugdetail',
      component:PDrugDetailPage
    },
    {
      path:'/pdrugselectdetail',
      component:PDrugSelectDetailPage
    },
    {
      path:'/pdrugadd',
      component:PAddDrugListPage
    },


  ]
})
