// const apiEnv: ApiEnv = 'dev'
const apiEnv: any = 'dev'
const envMap = {
  dev: {
    baseUrl: 'http://m.dev.xxx.com',
    apiBaseUrl: 'https://api-test.yunniushuke.com',
    LOGIN_URL: 'https://usercentertest.fanssh.com',
    SERVICE_URL: 'https://fanslifetest.fanssh.com',
    // SERVICE_URL: 'http://47.98.56.128:8874',
    SIGNAPI_URL: 'https://signapitest.fanssh.com',
    IMAGE_URL: 'https://imgtest.fanssh.com',
    VIDEO_UTL: 'https://videotest.fanssh.com',
    FUKA_URL: 'https://fuliopentest.fanssh.com',
    GATEWAY_URL: 'https://gateway-test.fanssh.com',
    YN_URL: 'https://api-test.yunniushuke.com',
    onloadurl: 'http://api-test.syyjj8.com',
  },
  beta: {
    baseUrl: 'http://m.beta.xxx.com',
    apiBaseUrl: 'https://m.betaapi.xxx.com',
  },
  prod: {
    baseUrl: 'https://m.xxx.com',
    apiBaseUrl: 'https://m.api.xxx.com',
  },
  local: {
    baseUrl: 'http://m.dev.xxx.com',
    apiBaseUrl: 'https://m.devapi.xxx.com',
  },
}

type ApiEnv = keyof typeof envMap
type Env<T extends ApiEnv> = {
  apiEnv: T
} & typeof envMap[T]

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv])
}

const env = createEnv(apiEnv)
export default env
