import { requestManageList, requestManageCount } from "../../util/request"
// 数据存放
const state = {
    // 列表数据
    list: [],
    // 一页的数量
    size: 2,
    //数据总数量
    total: 0,
    //当前的页码
    page: 1
}
// 数据修改
const mutations = {
    // 修改list 
    changeList(state, arr) {
        state.list = arr
    },
    // 修改总数
    changeTotal(state, num) {
        state.total = num
    },
    // 修改当前页码
    changePage(state, page) {
        state.page = page
    }
}

// 触发mtations修改
const actions = {
    // 获取列表数据
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestManageList(params).then(res => {
            context.commit("changeList", res.data.list)
        })
    },
    // 获取总的数量
    requestTotal(context) {
        requestManageCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    changePage(context,page){
        context.commit("changePage",page)
    }
}

// 导出数据
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total;
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}