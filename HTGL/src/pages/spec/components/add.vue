<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 规格名称 -->
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性">
          <el-input v-model="item.value" autocomplete="off"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestSpecAdd,
  requestManageDetail,
  requestSpecDetail,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      // 提交给后端的数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),

    // 新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    // 删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    // 弹框消失
    cancel() {
      this.info.show = false;
    },
    // 置空
    empyt() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    // 点击添加
    add() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 弹框消失
          this.cancel();
          //清空
          this.empyt();

          //重新获取角色列表数据
          this.requestList();
          //重新获取总的数量
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取修改数据
    getDetail(id) {
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },
    // 点击修改
    update() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      requestManageUpdate(this.form).then((res) => {
        if ((res.data.code = 200)) {
          successAlert("修改成功");
          this.cancel();
          this.empyt();

          this.requestManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style >
.el-form-item__content {
  display: flex !important;
}

.el-input {
  flex: 1;
}

.el-button {
  width: auto;
}
</style>