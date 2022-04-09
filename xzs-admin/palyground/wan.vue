<!--<template>-->
<!--  <div class="regis">-->
<!--    <van-nav-bar title="上传图片" left-text="返回" left-arrow @click-left="onClickLeft" />-->
<!--    &lt;!&ndash; regi_con &ndash;&gt;-->
<!--    <div class="regis-con">-->
<!--      <form @submit.prevent="upload" method="post" enctype="multipart/form-data">-->
<!--        <input type="file" name="picture" v-on:change="onChange($event)" />-->
<!--        <button type="submit">上传图片</button>-->
<!--      </form>-->

<!--      <div>-->
<!--        上传信息(vue&vue-resource)：-->
<!--        <p v-text="result1"></p>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;按钮&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data: {-->
<!--    picture: {},-->
<!--    result1: ""-->
<!--  },-->
<!--  methods: {-->
<!--    onClickLeft() {-->
<!--      history.go(-1);-->
<!--    },-->


<!--    onChange: function(event) {-->
<!--      this.picture = event.target.files[0]; // get input file object-->
<!--      console.log(this.picture);-->
<!--    },-->

<!--    upload: function() {-->
<!--      var that = this;-->

<!--      var formData = new FormData();-->
<!--      formData.append("flies", this.picture);-->
<!--      // specify Content-Type, with formData as well-->
<!--      this.$http-->
<!--        .post("/api/upload/files", formData, {-->
<!--          headers: { "Content-Type": "multipart/form-data" }-->
<!--        })-->
<!--        .then(-->
<!--          function(res) {-->
<!--            res.json().then(function(result) {-->
<!--              that.result1 = result.info;-->
<!--              console.log(that.result);-->
<!--            });-->
<!--          },-->
<!--          function(res) {-->
<!--            console.log(res.body);-->
<!--          }-->
<!--        );-->
<!--    },-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style lang='scss' scoped>-->
<!--.regis {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  position: fixed;-->
<!--  background-color: #f5f5f5;-->
<!--}-->
<!--.regis-con {-->
<!--  text-align: center;-->
<!--}-->
<!--</style>-->
<el-upload
  action="auto"
  :http-request="uploadSectionFile"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :file-list="imgData.fileList"
  class = "contentImgStyle">
<i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
<img height="100%" :src="dialogImageUrl" alt="">
</el-dialog>

<div class="contentImgTitle">
<span> 标题 </span>
<el-input
  style="width: 16rem;"
  placeholder="请输入标题"
  v-model="thisTitle"
  clearable>
</el-input>
</div>

var vm=new Vue({undefined
el : '#contenVal',
data (){undefined
      return {undefined
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFile : [],
      thisTitle : '',
      imgData : {undefined
      fileList : [{undefined
      name : "dape.png",
url : "http://syy-vr.com:8084/hyd.png"
}]
}

}
},
methods : {undefined
uploadSectionFile (param) {undefined
if(this.thisTitle == ''){undefined
this.$message.error("请输入标题");
return;
}
var uploadFileLength = this.uploadFile.length;

let fileObj = param.file;

if (fileObj.type === "image/jpeg") {undefined

let file = new File([fileObj], new Date().getTime() + ".jpg", {undefined
type: "image/jpeg"
});
this.uploadFile[uploadFileLength]={ 'title' : this.thisTitle, 'imgFile' : file}
} else if (fileObj.type === "image/png") {undefined
let file  = new File([fileObj], new Date().getTime() + ".png", {undefined
type: "image/png"
});
this.uploadFile[uploadFileLength]={ 'title' : this.thisTitle, 'imgFile' : file}
} else {undefined
this.$message.error("只能上传jpg/png文件");
return;
}
},
upload() {undefined
for (var int = 0; int < this.uploadFile.length; int++) {undefined
var param = new FormData(); // FormData 对象
var list = this.uploadFile[int];
var file = list.imgFile;
var name = list.title;
param.append("uploadFile", file); // 文件对象
param.append("uploadTitle",  name); // 其他参数
axios({undefined
method: "post",
url: "http://127.0.0.1/SYY/serveClients/insertImg.action",
data: param
}).then(function name(data) {undefined
console.log(data);
this.$message({undefined
message: '上传成功',
type: 'success'
});
})
.catch(error => {undefined
this.$message.error("上传失败,请稍后重试");
});
}
},
handleRemove(file, fileList) {undefined
console.log(file, fileList);
},
handlePictureCardPreview(file) {undefined
this.dialogImageUrl = file.url;
this.dialogVisible = true;
}
}
});

