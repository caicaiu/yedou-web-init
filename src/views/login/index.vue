<template>
  <div id="login-container">
    <main>
      <div class="main">
        <div class="top">
          <div class="header">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo">
            <h1 class="title">Ant Design</h1>
          </div>
          <div class="desc">Ant Design is the most influential web design specification in Xihu district</div>
        </div>
        <div class="form">
          <a-form style="max-width: 330px;margin: 0 auto;" :model="form" @submit="handleSubmit">

            <a-tabs default-active-key="account" @change="tabChange">
              <a-tab-pane key="account" title="账号密码登录">
                <a-form-item hide-label field="name">
                  <a-input style="height: 40px" v-model="form.userAccount" :style="{width:'320px'}"
                           placeholder="请输入账号"
                           allow-clear>
                    <template #prefix>
                      <icon-user/>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item hide-label>
                  <a-input-password style="height: 40px" v-model="form.userPassword" :style="{width:'320px'}"
                                    placeholder="请输入密码"
                                    allow-clear>
                    <template #prefix>
                      <icon-lock/>
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-tab-pane>
              <a-tab-pane key="phone" title="邮箱登录">
                <a-form-item
                    hide-label
                    name="userEmail"
                    :validate-trigger="['change','input']"
                >
                  <a-input
                      style="height: 40px"
                      v-model="form.userEmail"
                      :style="{ width: '320px' }"
                      placeholder="请输入邮箱"
                      allow-clear
                  >
                    <template #prefix>
                      <icon-email/>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item hide-label field="name">
                  <a-input style="height: 40px" v-model="form.verificationCode" :style="{width:'320px'}"
                           placeholder="请输入验证码"
                           allow-clear>
                    <template #prefix>
                      <icon-lock/>
                    </template>
                  </a-input>
                  <a-button style="height: 40px;  width: 120px; margin-left: 20px" :loading="codeLoading"
                            :disabled="isButtonDisabled"
                            type="dashed" status="normal" @click="getVerificationCode">
                    {{ buttonText }}
                  </a-button>
                </a-form-item>
              </a-tab-pane>
            </a-tabs>

            <a-form-item hide-label field="other">
              <div class="other">
                <a href="#"></a>
                <a href="#">忘记密码</a>
              </div>

            </a-form-item>
            <a-form-item hide-label>
              <a-button type="primary" style="width: 100%;height:40px;border-radius: 10px" status="normal"
                        html-type="submit" :loading="loading">登 录
              </a-button>
            </a-form-item>

            <a-form-item label="其他方式登录" label-col-flex="90px">
              <icon-github class="item-icon"/>
              <icon-qq class="item-icon"/>
              <icon-weibo class="item-icon"/>
              <icon-wechat class="item-icon"/>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </main>
    <footer class="footer">
      <div class="footer-list">
        <div style="color: rgba(0, 0, 0, 0.65)">ant design Pro</div>
        <icon-github style="margin: 10px 10px" class="item-icon"/>
        <div style="color: rgba(0, 0, 0, 0.65)">Ant Design</div>
      </div>
      <div class="footer-copyright">
        © Powered by Ant Desgin
      </div>
    </footer>

  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {useUserStore} from "../../store";
import {sendEmailCodeUsingPost} from "../../api/user";
import {useRouter} from "vue-router";

const activeKey = ref<string>('account');
var user = useUserStore();
const loading = ref(false);
const codeLoading = ref(false);
const form = ref({
  userAccount: '',
  verificationCode: '',
  userPassword: '',
  userEmail: '',
  isRead: false,
});
const router = useRouter();
const handleSubmit = async () => {
  loading.value = true;
  console.log(activeKey.value);
  try {
    if (activeKey.value === 'account') {
      await user.userLoginByAccount({userAccount: form.value.userAccount, userPassword: form.value.userPassword})
    } else {
      await user.userLoginByEmail({userEmail: form.value.userEmail, code: form.value.verificationCode})
    }
    const {redirect} = router.currentRoute.value.query;
    if (typeof redirect === 'string') {
      const [path, queryString] = redirect.split('?');
      const query = Object.fromEntries(new URLSearchParams(queryString));
      router.push({
        path: (path as string) || "/",
        query: {
          ...query
        }
      });
      Message.success("登录成功");
    } else {
      Message.error("失败");
      console.log("Redirect is not a string", redirect);
    }
  } catch (e) {
    console.log("失败")
  } finally {
    loading.value = false;
  }


};
onMounted(() => {
  console.log(router.currentRoute.value.query, 'router.currentRoute.value.query')
  console.log(router.currentRoute.value.path, 'router.currentRoute.value.path')
})
const tabChange = (key: any) => {
  activeKey.value = key;
}


// 发送验证码相关
const buttonText = ref('获取验证码');
const isButtonDisabled = ref(false);
const countdownTime = ref(60);
let timer: number | any = null;

const startCountdown = () => {
  isButtonDisabled.value = true;
  buttonText.value = `${countdownTime.value}s`;
  timer = setInterval(() => {
    countdownTime.value--;
    if (countdownTime.value > 0) {
      buttonText.value = `${countdownTime.value}s`;
    } else {
      clearInterval(timer ?? 0);
      buttonText.value = '获取验证码';
      countdownTime.value = 60;
      isButtonDisabled.value = false;
    }
  }, 1000);
};

const getVerificationCode = () => {
  console.log(form.value.userEmail);
  if (!form.value.userEmail) {
    Message.error('邮箱不能为空');
    return;
  }
  codeLoading.value = true;
  sendEmailCodeUsingPost(form.value.userEmail).then(() => {
    // If successful, start the countdown
    Message.success('验证码发送成功，请注意查收');
    startCountdown();
  }).catch((err: Error) => {
    // Handle error (e.g., show a notification to the user)
    console.error(err);
  }).finally(() => {
    codeLoading.value = false;
  });
};


</script>

<style scoped>
#login-container {
  background-image: url('@/assets/login-bg.png');
  background-size: 100% 100%;
}

.main {
  max-width: 600px;
  margin: 0px auto;
  padding: 32px 0 24px;
  text-align: center;
}

.main :deep(.arco-tabs-nav-tab-list) {
  margin: 0 auto;

}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header img {
  height: 32px;
  width: 32px;
  margin-right: 16px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
}

.footer-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top .desc {
  font-size: 14px;
  color: rgba(0, 0, 0, .45);
  margin-top: 12px;
  margin-bottom: 40px;
}

label {
  font-size: 14px;
}

.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;
}

.item-icon:hover {
  color: #1890ff;
}


.footer-copyright {
  padding-bottom: 30px;
}


.register {
  float: right;
}

.getCaptcha {
  display: block;
  width: 100%;
  height: 40px;
}

.forge-password {
  font-size: 14px;
}

button.login-button {
  padding: 0 15px;
  font-size: 16px;
  height: 40px;
  width: 100%;
}

.other {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
