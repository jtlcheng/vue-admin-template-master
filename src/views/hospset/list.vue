<template>
  <div class="app-container">
    医院设置的列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>
    <!--工具条-->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()" :disabled="multipleSelection=='' ? true : false">批量删除</el-button>
    </div>
    <!-- banner列表 -->
    <el-table
      :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" width="50" label="序号"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini"
                     icon="el-icon-delete" @click="removeDataById(scope.row.id)"/>
          <el-button v-if="scope.row.status==1" type="success" size="mini"
                     icon="el-icon-star-off" @click="lockHospSet(scope.row.id,0)"/>
          <el-button v-if="scope.row.status==0" type="warn" size="mini"
                     icon="el-icon-star-off" @click="lockHospSet(scope.row.id,1)"/>
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding:30px 0;text-align:center;"
      layout="total,prev,pager,next,jumper"
      @current-change="getList"/>
  </div>
</template>
<script>
//引入接口定义的js文件
import hospset from "../../api/hospset";
export default {
  //定义变量和初始值
  data(){
    return{
      current:1,//当前页
      limit:3,//每页显示记录数
      searchObj:{},//条件封装对象
      list:[],//每页数据集合
      total:0,//总记录数
      multipleSelection:[]//批量选择中选择的id值

    }
  },
  created() {//在页面渲染前执行
    //一般调用methods定义方法，得到数据
    this.getList()
  },
  methods:{//定义方法，进行请求接口调用
    //医院设置列表
    getList(page=1){//添加当前页的参数
      this.current=page
      hospset.getHospSetList(this.current,this.limit,this.searchObj)
        .then(response=>{//请求成功response是接口返回数据
          this.list=response.data.records
          this.total=response.data.total
          console.log(response)

        })
        .catch(error => {//请求失败
          console.log(error)
        })
    },//删除医院设置的方法
    removeDataById(id){
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospset.deleteHospSetById(id)
          .then(response=>{
            //提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.total % this.limit==1 ? this.getList(this.current-1) : this.getList(this.current)
            /*if (this.total % this.limit==1){
            this.getList(this.current-1)
          }else {
            this.getList(this.current)
          }*/
          })
      })
    },
    //获取复选框的id值
    handleSelectionChange(selection){
      this.multipleSelection=selection
    },
    //批量删除
    removeRows(){
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        var idList=[]
        //遍历数组得到每个id值，设置到idList里面
        for (var i=0;i<this.multipleSelection.length;i++){
          var obj=this.multipleSelection[i]
          var id=obj.id
          idList.push(id)
        }
        hospset.batchRemoveHospSet(idList)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            let totalPage;//总页数
            totalPage = Math.ceil((this.total - 1) / this.limit); //15 是每页15条
            let currentPage = this.currentPage > totalPage ? totalPage : this.currentPage;
            this.current = currentPage < 1 ? this.getList(this.current-1) : this.getList(this.current) ; //this.currentPage 当前页数
          })
      })
    },
    lockHospSet(id,status){
        hospset.lockOutStatus(id,status)
          .then(response=>{
            this.total % this.limit==1 ? this.getList(this.current-1) : this.getList(this.current)
          })
    }
  }
}
</script>
