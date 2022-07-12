import axios from 'axios'
import { ElMessage } from 'element-plus'
// @ts-ignore 别名映射
import qs from '@tyeps/qs'
import { getLocalStore, setLocalStore, removeLocalStore } from '@/utils/basic'
import { useUserStore } from '@/store/user'
import router from "@/router"
let isToken = true
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status:number, other:string) => {
    const userStore = useUserStore()
    // 状态码判断
        switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            localStorage.removeItem('Authorization');
            router.push('/login');
            // toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            // tip('登录过期，请重新登录');
            // ElMessage({
            //     message: "登录过期，请重新登录",
            //     type: 'error',
            // })
            userStore.onLogout().then(()=>{
                router.push('/login')
            })
            // toLogin();
            break;
        // 404请求不存在
        case 404:
            // // tip('请求的资源不存在');
            // break;
        case 500:
            // ElMessage({
            //     message: other,
            //     type: 'error',
            // })
            break;
        default:
            // console.log(status, other);
    }}


// 创建请求实例
const trsAxios = axios.create({
    // baseURL: BASE_URL,
    timeout: 30 * 1000,
    headers: {
        pragma: "no-cache", // 防止IE缓存
        credentials: "include", // 默认请求是否带上cookie
    },
});

// request拦截器
trsAxios.interceptors.request.use(config => {
    const token = getLocalStore('Token')
    if(token){
        config.headers.Authorization = token;
    }

    // 鉴权参数设置
    if(config.method === 'get'){
        //get请求下 参数在params中，其他请求在data中
        config.params = config.params || {};
    }else{
        config.headers['formdata'] = "1";
        config.data = config.data || {};
        //一些参数处理
    }

    return config;


}, error => {
    Promise.reject(error);
})



// response拦截器
trsAxios.interceptors.response.use(
    // 请求成功
    response => {
        if (response.data.status == '40301' || response.data.code == '40301' || response.data.message == 'User Token Forbidden or Expired!') {
            if(isToken){
                isToken = false;
                ElMessage({
                    message: "登录过期，请重新登录",
                    type: 'error'
                })
            }
            removeLocalStore('userInfo');
            removeLocalStore('Token')
            router.push('/login')
        }
        if(response.status === 200) {
           return Promise.resolve(response.data)
        } else {
           return Promise.reject(response.data)
        }
    },
    // response => response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response.data),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况,后面处理
            // if (!window.navigator.onLine) {
            //     store.commit('changeNetwork', false);
            // } else {
            //     return Promise.reject(error);
            // }
        }
    }
)

const trsGet = (url:string, params:any, headers:any={} ) => {
    return new Promise((resolve, reject) => {
        trsAxios({
            method: "get",
            url: url,
            params: params,
            headers: headers,
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const trsPost = (url:string, params:any, headers:any={}) => {
    return new Promise((resolve, reject) => {
        // Content-Type: application/x-www-form-urlencoded
        // qs.stringify({ params })
        const defaultHeader = {
            "Content-Type": "application/json;charset=UTF-8",
        };
        // 若是application/x-www-form-urlencoded 需要通过qs.stringify处理
        trsAxios({
            method: "post",
            url: url,
            data: Object.keys(headers).length > 0 && headers['Content-Type'] === 'application/x-www-form-urlencoded' ? qs.stringify(params) : params,
            headers: Object.assign({}, defaultHeader, headers),
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


export { trsAxios, trsGet, trsPost };

