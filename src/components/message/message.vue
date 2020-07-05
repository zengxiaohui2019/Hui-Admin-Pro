<template>
    <div class="message-page">
        <Tabs value="name1" @on-click="tabSwitch">
            <TabPane :label="'通知 ('+msgData.tz.length+')'" name="name1" class="flexC tabs">
                <div v-if="tabName === 'name1'" class="content flexC">
                    <div class="tabItem flexR" v-for="(item,index) in msgData.tz" :key="item+index">
                        <div>
                            <Avatar v-if="item.type === 'msg'" style="background-color: #3391E5" icon="md-mail" />
                            <Avatar v-if="item.type === 'hy'" style="background-color: #87D068" icon="ios-people" />
                            <Avatar v-if="item.type === 'sq'" style="background-color: #FE5C57" icon="ios-information" />
                            <Avatar v-if="item.type === 'sc'" style="background-color: #FF9900" icon="ios-star" />
                        </div>
                        <div class="flexC">
                            <span>{{item.title}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div v-if="msgData.tz.length>0" class="more flexR">
                        <span class="blueText">加载更多</span>
                    </div>
                    <div v-else class="more flexR">
                        <span>暂无数据</span>
                    </div>
                </div>
                <div class="clear flexR pointer" v-if="msgData.tz.length>0">
                    <Icon type="md-checkmark" size="22"/>
                    <span>清空通知</span>
                </div>
            </TabPane>
            <TabPane :label="'关注 ('+msgData.gz.length+')'" name="name2" class="flexC tabs">
                <div v-if="tabName === 'name2'" class="content flexC">
                    <div class="tabItem flexR" v-for="(item,index) in msgData.gz" :key="item+index">
                        <div>
                            <Avatar :src="item.img" />
                        </div>
                        <div class="flexC">
                            <span>{{item.title}}</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div v-if="msgData.gz.length>0" class="more flexR">
                        <span class="blueText">加载更多</span>
                    </div>
                    <div v-else class="more flexR">
                        <span>暂无数据</span>
                    </div>
                </div>
                <div class="clear flexR pointer" v-if="msgData.gz.length>0">
                    <Icon type="md-checkmark" size="22"/>
                    <span>清空关注</span>
                </div>
            </TabPane>
            <TabPane :label="'待办 ('+msgData.db.length+')'" name="name3" class="flexC tabs tab3">
                <div v-if="tabName === 'name3'" class="content flexC">
                    <div class="tabItem flexR" v-for="(item,index) in msgData.db" :key="item+index">
                        <div class="flexC">
                            <span>{{item.title}}</span>
                            <span>需要在 {{item.time}} 之前完成</span>
                        </div>
                        <div class="status flexC">
                            <span class="wks" v-if="item.status === 0">未开始</span>
                            <span class="jxz" v-if="item.status === 1">进行中</span>
                            <span class="jjdq" v-if="item.status === 2">将到期</span>
                        </div>
                    </div>
                    <div v-if="msgData.db.length>0" class="more flexR">
                        <span class="blueText">加载更多</span>
                    </div>
                    <div v-else class="more flexR">
                        <span>暂无数据</span>
                    </div>
                </div>
                <div class="clear flexR pointer" v-if="msgData.db.length>0">
                    <Icon type="md-checkmark" size="22"/>
                    <span>清空待办</span>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
        tabName: 'name1',
        msgData: {
            tz: [
                {
                    type: 'msg',
                    title: '蒂姆·库克回复了你的邮件',
                    time: '05-08 14:33'
                },
                {
                    type: 'hy',
                    title: '曾小晖邀请你参加会议',
                    time: '05-10 14:33'
                },
                {
                    type: 'sq',
                    title: '尼亚克已批准了你的休假申请',
                    time: '05-08 14:33'
                },
                {
                    type: 'sc',
                    title: '史蒂夫·乔布斯了你的文章',
                    time: '08-08 13:33'
                },
                {
                    type: 'sq',
                    title: '尼亚克已批准了你的休假申请',
                    time: '05-08 14:33'
                },
            ],
            gz: [
                {
                    title: '蒂姆·库克 关注了你',
                    time: '09-08 15:33',
                    img: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar'
                },
                {
                    title: '曾小晖 在一篇文章中 @你',
                    time: '11-08 15:33',
                    img: 'https://githup.zengxiaohui.com/vueImg/avatar1.jpg'
                }
            ],
            db: [
                {
                    status: 0,
                    title: '2019 下半年 OKR',
                    time: '2019-08-08'
                },
                {
                    status: 2,
                    title: '李先生的面试评审',
                    time: '2019-08-10'
                },
                {
                    status: 1,
                    title: '公司成立 五周年生日会',
                    time: '2019-10-10'
                }
            ]
        }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
      tabSwitch(data){
          this.tabName = data
      }
  },
  watch: {},
  filters: {
      /*statusType(data){
          switch (data) {
              case 0:
                  return '未开始'
                  break
              case 1:
                  return '进行中'
                  break
              case 2:
                  return '即将到期'
                  break
          }
      }*/
  }
}
</script>

<style lang="less">
  .message-page {
      max-width: 328px;
      .ivu-tabs-bar{
          margin-bottom: 5px;
          padding: 0px 5px;
      }
      /*禁用css3动画 解决tab切换后 滚动条卡住的问题*/
      .ivu-tabs-content{
          transition:none!important;
      }
      .content{
          max-height: 300px;
          max-width: 328px;
          overflow-y: auto;
          overflow-x: hidden;
          .tabItem{
              height: 67px;
              width: 100%;
              padding: 12px 24px;
              border-bottom: 1px solid #e8eaec;
              cursor: pointer;
              text-align: left;
              justify-content: flex-start;
              &:hover{
                  background-color: #F0FAFF;
              }
              &>div{
                  justify-content: center;
                  span{
                      line-height: 20px;
                      justify-content: center;
                  }
              }
              &>div:last-child{
                  margin-left: 20px;
              }
          }
          .more{
              justify-content: center;
              height: 35px;
              span{
                  line-height: 35px;
              }
          }
      }
      .tab3{
          .status{
              span{
                  line-height: 35px;
                  padding: 0px 5px;
                  border-radius: 4px;
              }
              .wks{
                  color: #42B883;
                  border: 1px solid #42B883;
              }
              .jxz{
                  color: #2D8CF0;
                  border: 1px solid #2D8CF0;
              }
              .jjdq{
                  color: #F5222D;
                  border: 1px solid #F5222D;
              }
          }
      }
      .clear{
          justify-content: center;
          border-top: 1px solid #e8eaec;
          height: 35px;
          span{
              line-height: 35px;
          }
      }
  }
</style>
