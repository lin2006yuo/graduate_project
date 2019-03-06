import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Login from '@/pages/login/login'
import Admin from '@/pages/admin/admin'


import Index from '@/pages/home/components/index/index'
import Personal from '@/pages/home/components/personal/personal'
import Announcement from '@/pages/home/components/announcement/announcement'
import Page from '@/pages/home/components/page/page'
import Recruit from '@/pages/home/components/recruit/recruit'
import RecruitPage from '@/pages/home/components/recruitpage/recruitpage'



import Mine from '@/pages/home/components/personal/components/mine/mine'
import Account from '@/pages/home/components/personal/components/account/account'
import CV from '@/pages/home/components/personal/components/cv/cv'
import Result from '@/pages/home/components/personal/components/result/result'

//企业管理页
import ComMine from '@/pages/home/components/personal/components/com-mine/com-mine'
import ComCv from '@/pages/home/components/personal/components/com-cv/com-cv'
import ComRecruit from '@/pages/home/components/personal/components/com-recruit/com-recruit'
import ComRecruitD from '@/pages/home/components/personal/components/com-recruit-d/com-recruit-d'
import ComPulish from '@/pages/home/components/personal/components/com-pulish/com-pulish'

//后台页面
import ALogin from '@/pages/admin/components/a-login'
import AIndex from '@/pages/admin/components/a-index'
  //后台index子页面
  import AAnnuce from '@/pages/admin/components/a-annuce'
  import ACompany from '@/pages/admin/components/a-company'
  import ASetting from '@/pages/admin/components/a-setting'
  import ACheck from '@/pages/admin/components/a-announce-check'
  import AEditor from '@/pages/admin/components/a-announce-editor'
  import ACEditor from '@/pages/admin/components/a-company-editor'


Vue.use(Router)




export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', name: 'Index', component: Index },
        { path: '/index/announcement', name: 'Announcement', component: Announcement },
        { path: '/index/page', name: 'Page', component: Page },
        { path: '/index/recruitpage', name: 'RecruitPage', component: RecruitPage },
        { path: '/index/recruit', name: 'Recruit', component: Recruit },
        { 
          path: '/personal', name: 'Personal', component: Personal,redirect: '/personal/mine',
          children: [
            {path: '/personal/mine', name: 'Mine', component: Mine},
            { path: '/personal/account', name: 'Account', component: Account},
            { path: '/personal/cv', name: 'CV', component: CV},
            { path: '/personal/result', name: 'Result', component: Result},
            { path: '/personal/com-mine', name: 'ComMine', component: ComMine},
            { path: '/personal/com-cv', name: 'ComCv', component: ComCv},
            { path: '/personal/com-recruit', name: 'ComRecruit', component: ComRecruit},
            { path: '/personal/com-recruit-d', name: 'ComRecruitD', component: ComRecruitD},
            { path: '/personal/com-pulish', name: 'ComPulish', component: ComPulish},
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/login',
      children: [
        { path: '/admin/login', name: 'ALogin', component: ALogin },
        { path: '/admin/index', name: 'AIndex', component: AIndex,redirect: '/admin/index/a-annuce',
          meta: { auth: true },
          children: [
            { path: '/admin/index/a-annuce', name:'Annuce', component:AAnnuce },
            { path: '/admin/index/a-company', name: 'ACompany', component: ACompany },
            { path: '/admin/index/a-setting', name: 'ASetting', component: ASetting },
            { path: '/admin/index/a-annuce-check', name: 'ACheck', component: ACheck },
            { path: '/admin/index/a-annuce-editor', name: 'AEditor', component: AEditor },
            { path: '/admin/index/a-company-editor', name: 'ACEditor', component: ACEditor },
          ]
        }
      ]
    }
  ]
})
