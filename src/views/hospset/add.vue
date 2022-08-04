<template>
  <div class="app-container">
    医院设置的添加
    <el-form label-width = "120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdates">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入接口定义的js文件
import hospset from "../../api/hospset";
export  default {
  data(){
    return{
      hospitalSet:{}
    }
  },
  created() {
    //获取路由id值
    //调用接口得到医院设置信息
    if(this.$route.params && this.$route.params.id){
      const id = this.$route.params.id
      this.getHospitalSet(id)
    }else {
      this.hospitalSet={}
    }
  },
  methods:{
    //根据id查询医院设置信息
    getHospitalSet(id){
      hospset.getHospSet(id)
        .then(response=>{
            this.hospitalSet = response.data
        })
    },
    //根据id修改医院设置信息
    //添加
    save(){
      hospset.addHospitalSet(this.hospitalSet)
        .then(response => {
          //提示
          this.$message({
            type:'success',
            message:'添加成功'
          })
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({path:'/hospSet/list'})
        })
    },
    //修改功能
    update(){
      hospset.updateHospSet(this.hospitalSet)
        .then(response => {
          //提示
          this.$message({
            type:'success',
            message:'修改成功'
          })
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({path:'/hospSet/list'})
        })
    },
    //
    saveOrUpdates(){
      //判断添加还是修改
      if (!this.hospitalSet.id){
        this.save()
      }else {
        this.update()
      }
    }
  }
}
</script>

