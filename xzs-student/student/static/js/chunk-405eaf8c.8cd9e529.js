(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-405eaf8c"],{"4de0":function(e,t,n){"use strict";n("e877")},beb3:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-row",{staticClass:"do-exam-title",staticStyle:{"background-color":"#F5F5DC"}},[n("el-col",{attrs:{span:24}},e._l(e.answer.answerItems,(function(t){return n("span",{key:t.itemOrder},[n("el-tag",{staticClass:"do-exam-title-tag",attrs:{type:e.questionDoRightTag(t.doRight)},on:{click:function(n){return e.goAnchor("#question-"+t.itemOrder)}}},[e._v(e._s(t.itemOrder))])],1)})),0)],1),n("el-row",{staticClass:"do-exam-title-hidden"},[n("el-col",{attrs:{span:24}},e._l(e.answer.answerItems,(function(t){return n("span",{key:t.itemOrder},[n("el-tag",{staticClass:"do-exam-title-tag"},[e._v(e._s(t.itemOrder))])],1)})),0)],1),n("el-container",{staticClass:"app-item-contain"},[n("el-header",{staticClass:"align-center"},[n("h1",[e._v(e._s(e.form.name))]),n("div",[n("span",{staticClass:"question-title-padding"},[e._v("试卷得分："+e._s(e.answer.score))]),n("span",{staticClass:"question-title-padding"},[e._v("试卷耗时："+e._s(e.formatSeconds(e.answer.doTime)))])])]),n("el-main",[n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.formLoading,expression:"formLoading"}],ref:"form",attrs:{model:e.form,"label-width":"100px"}},[e._l(e.form.titleItems,(function(t,s){return n("el-row",{key:s},[n("h3",[e._v(e._s(t.name))]),0!==t.questionItems.length?n("el-card",{staticClass:"exampaper-item-box"},e._l(t.questionItems,(function(t){return n("el-form-item",{key:t.itemOrder,staticClass:"exam-question-item",attrs:{label:t.itemOrder+".","label-width":"50px",id:"question-"+t.itemOrder}},[n("el-row",[n("QuestionAnswerShow",{attrs:{qType:t.questionType,question:t,answer:e.answer.answerItems[t.itemOrder-1]}})],1),null===e.answer.answerItems[t.itemOrder-1].doRight?n("el-row",[n("label",{staticStyle:{color:"#e6a23c"}},[e._v("批改：")]),n("el-radio-group",{model:{value:e.answer.answerItems[t.itemOrder-1].score,callback:function(n){e.$set(e.answer.answerItems[t.itemOrder-1],"score",n)},expression:"answer.answerItems[questionItem.itemOrder-1].score"}},e._l(e.scoreSelect(t.score),(function(t){return n("el-radio",{key:t,attrs:{label:t}},[e._v(" "+e._s(t)+" ")])})),1)],1):e._e()],1)})),1):e._e()],1)})),n("el-row",{staticClass:"do-align-center"},[n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("提交")]),n("el-button",[e._v("取消")])],1)],2)],1)],1)],1)},i=[],a=n("5530"),r=(n("d3b7"),n("25f0"),n("2f62")),o=n("ed08"),c=n("ff3e"),l=n("ed24"),u={components:{QuestionAnswerShow:c["a"]},data:function(){return{form:{},formLoading:!1,answer:{id:null,score:0,doTime:0,answerItems:[],doRight:!1}}},created:function(){var e=this.$route.query.id,t=this;e&&0!==parseInt(e)&&(t.formLoading=!0,l["a"].read(e).then((function(e){t.form=e.response.paper,t.answer=e.response.answer,t.formLoading=!1})))},methods:{submitForm:function(){var e=this;e.formLoading=!0,l["a"].edit(this.answer).then((function(t){1===t.code?e.$alert("试卷得分："+t.response+"分","考试结果",{confirmButtonText:"返回考试记录",callback:function(t){e.$router.push("/record/index")}}):e.$message.error(t.message),e.formLoading=!1})).catch((function(t){e.formLoading=!1}))},scoreSelect:function(e){for(var t=[],n=0;n<=parseInt(e);n++)t.push(n.toString());return-1!==e.indexOf(".")&&t.push(e),t},formatSeconds:function(e){return Object(o["a"])(e)},questionDoRightTag:function(e){return this.enumFormat(this.doRightTag,e)},goAnchor:function(e){this.$el.querySelector(e).scrollIntoView({behavior:"instant",block:"center",inline:"nearest"})}},computed:Object(a["a"])(Object(a["a"])({},Object(r["c"])("enumItem",["enumFormat"])),Object(r["e"])("enumItem",{doRightTag:function(e){return e.exam.question.answer.doRightTag}}))},d=u,m=(n("4de0"),n("2877")),p=Object(m["a"])(d,s,i,!1,null,"51a9372e",null);t["default"]=p.exports},e877:function(e,t,n){},ff3e:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.qLoading,expression:"qLoading"}],staticStyle:{"line-height":"1.8"}},[1==e.qType||2==e.qType||3==e.qType||4==e.qType||5==e.qType?n("div",[1==e.qType?n("div",[n("div",{staticClass:"q-title",domProps:{innerHTML:e._s(e.question.title)}}),n("div",{staticClass:"q-content"},[n("el-radio-group",{model:{value:e.answer.content,callback:function(t){e.$set(e.answer,"content",t)},expression:"answer.content"}},e._l(e.question.items,(function(t){return n("el-radio",{key:t.prefix,attrs:{label:t.prefix}},[n("span",{staticClass:"question-prefix"},[e._v(e._s(t.prefix)+".")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(t.content)}})])})),1)],1)]):2==e.qType?n("div",[n("div",{staticClass:"q-title",domProps:{innerHTML:e._s(e.question.title)}}),n("div",{staticClass:"q-content"},[n("el-checkbox-group",{model:{value:e.answer.contentArray,callback:function(t){e.$set(e.answer,"contentArray",t)},expression:"answer.contentArray"}},e._l(e.question.items,(function(t){return n("el-checkbox",{key:t.prefix,attrs:{label:t.prefix}},[n("span",{staticClass:"question-prefix"},[e._v(e._s(t.prefix)+".")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(t.content)}})])})),1)],1)]):3==e.qType?n("div",[n("div",{staticClass:"q-title",staticStyle:{display:"inline","margin-right":"10px"},domProps:{innerHTML:e._s(e.question.title)}}),n("span",{staticStyle:{"padding-right":"10px"}},[e._v("(")]),n("el-radio-group",{model:{value:e.answer.content,callback:function(t){e.$set(e.answer,"content",t)},expression:"answer.content"}},e._l(e.question.items,(function(t){return n("el-radio",{key:t.prefix,attrs:{label:t.prefix}},[n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(t.content)}})])})),1),n("span",{staticStyle:{"padding-left":"10px"}},[e._v(")")])],1):4==e.qType?n("div",[n("div",{staticClass:"q-title",domProps:{innerHTML:e._s(e.question.title)}}),null!==e.answer.contentArray?n("div",e._l(e.question.items,(function(t){return n("el-form-item",{key:t.prefix,staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{label:t.prefix,"label-width":"50px"}},[n("el-input",{model:{value:e.answer.contentArray[t.prefix-1],callback:function(n){e.$set(e.answer.contentArray,t.prefix-1,n)},expression:"answer.contentArray[item.prefix-1]"}})],1)})),1):e._e()]):5==e.qType?n("div",[n("div",{staticClass:"q-title",domProps:{innerHTML:e._s(e.question.title)}}),n("div",[n("el-input",{attrs:{type:"textarea",rows:"5"},model:{value:e.answer.content,callback:function(t){e.$set(e.answer,"content",t)},expression:"answer.content"}})],1)]):e._e(),n("div",{staticClass:"question-answer-show-item",staticStyle:{"margin-top":"15px"}},[n("span",{staticClass:"question-show-item"},[e._v("Result：")]),n("el-tag",{attrs:{type:e.doRightTagFormatter(e.answer.doRight)}},[e._v(" "+e._s(e.doRightTextFormatter(e.answer.doRight))+" ")])],1),n("div",{staticClass:"question-answer-show-item"},[n("span",{staticClass:"question-show-item"},[e._v("Score：")]),n("span",[e._v(e._s(e.question.score))])]),n("div",{staticClass:"question-answer-show-item"},[n("span",{staticClass:"question-show-item"},[e._v("Difficulty：")]),n("el-rate",{staticClass:"question-show-item",attrs:{disabled:""},model:{value:e.question.difficult,callback:function(t){e.$set(e.question,"difficult",t)},expression:"question.difficult"}})],1),n("br"),n("div",{staticClass:"question-answer-show-item",staticStyle:{"line-height":"1.8"}},[n("span",{staticClass:"question-show-item"},[e._v("Reason：")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(e.question.analyze)}})]),n("div",{staticClass:"question-answer-show-item"},[n("span",{staticClass:"question-show-item"},[e._v("Right Answer：")]),1==e.qType||2==e.qType||5==e.qType?n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(e.question.correct)}}):e._e(),3==e.qType?n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:e._s(e.trueFalseFormatter(e.question))}}):e._e(),4==e.qType?n("span",[e._v(e._s(e.question.correctArray))]):e._e()])]):n("div")])},i=[],a=n("5530"),r=(n("a9e3"),n("4de4"),n("d3b7"),n("2f62")),o={name:"QuestionShow",props:{question:{type:Object,default:function(){return{}}},answer:{type:Object,default:function(){return{id:null,content:"",contentArray:[],doRight:!1}}},qLoading:{type:Boolean,default:!1},qType:{type:Number,default:0}},methods:{trueFalseFormatter:function(e){return e.items.filter((function(t){return t.prefix===e.correct}))[0].content},doRightTagFormatter:function(e){return this.enumFormat(this.doRightTag,e)},doRightTextFormatter:function(e){return this.enumFormat(this.doRightEnum,e)}},computed:Object(a["a"])(Object(a["a"])({},Object(r["c"])("enumItem",["enumFormat"])),Object(r["e"])("enumItem",{doRightEnum:function(e){return e.exam.question.answer.doRightEnum},doRightTag:function(e){return e.exam.question.answer.doRightTag}}))},c=o,l=n("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);t["a"]=u.exports}}]);