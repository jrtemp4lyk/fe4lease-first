<template>
<div id="customerInfo">
  <div class="title-header">
    <h2 class="name">{{title}}</h2>
    <!--<el-button type="primary" @click="goBack" style="float:right;">返回</el-button>-->
  </div>
  <div class="search-header">
    <el-button class="fr" type="primary" @click="goBack">返回</el-button>
  </div>
  <div class="content_main">
    <div class="content_left">
      <div class="content_left_item" id="customerInfoDiv" style="height: 370px">
        <!-- 身份证信息 -->
        <div class="idCardUpload">
          <el-upload
            class="avatar-uploader"
            action="/ifbp-app-bd/bd/customer/personal/file"
            :show-file-list="false"
            :on-success="function(res,file){handleAvatarSuccess('idImg',res,file)}"
            :before-upload="function(res,file){beforeAvatarUpload('idImg',res,file)}">
            <img v-if="realPath[imageCodes['idImg']]" :src="realPath[imageCodes['idImg']]" style="width: 300px;height: 200px;">
            <div v-else class="upload-box" style="height: 200px">
              <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 70px;"></i>
              <div style="height:70px;line-height:70px;text-align:center;width:310px; text-align:center;">身份证照片上传</div>
            </div>
          </el-upload>
          <div v-if="realPath[imageCodes['idImg']]" style="height:20px;line-height:20px;text-align:center;width:310px; text-align:center;">身份证照片</div>
        </div>
        <div class="idCardInfo">
          <div class="idCardInfo_left">
            <div class="idCardInfo_left_photo">
              <div v-if="!createFlags['customer']">
                <img v-if="realPath[imageCodes['customer']]" :src="realPath[imageCodes['customer']]" style="width: 100%;height: 100%;">
                <div v-else class="upload-box" style="height: 170px">
                  <div style="height:20px;line-height:20px;text-align:center;width:135px; text-align:center; margin-top: 70px;">请点击编辑上传</div>
                  <div style="height:20px;line-height:20px;text-align:center;width:135px; text-align:center;">日常半身照</div>
                </div>
              </div>
              <el-upload
                v-else
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('customer',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('customer',res,file)}">
                <img v-if="realPath[imageCodes['customer']]" :src="realPath[imageCodes['customer']]" style="width: 100%;height: 100%;">
                <div v-else class="upload-box" style="height: 170px">
                  <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 50px;"></i>
                  <div style="height:50px;line-height:50px;text-align:center;width:135px; text-align:center;">日常半身照上传</div>
                </div>
              </el-upload>
              <div v-if="realPath[imageCodes['customer']]" style="height:20px;line-height:20px;text-align:center;width:135px; text-align:center;">日常半身照</div>
            </div>
            <!-- <p>相似度：90%</p> -->
          </div>
          <div class="idCardInfo_right">
            <el-template :pkTemp="pktemp.customer"
                        ref="customer"
                        @change="changeHandle"
                        @setEmptyKeys="setEmptyKey('customer', arguments[0])"
                        :hide-title="true"
                        :isEdit="createFlags['customer']"
                        :template-value="currentValues.customer"
                        class="customer_template">
            </el-template>
            <el-button-group v-if="createFlags['customer']" class="button-group">
              <el-button class="save" type="primary" size="small" @click="submit('customer')" style="width:80px; display: block; margin: 0 auto;">保存</el-button>
              <el-button class="save" type="primary" size="small" @click="toggle('customer')" style="width:80px; display: block; margin-left:20px;">取消</el-button>
            </el-button-group>
            <el-button v-else class="save" type="primary" size="small" @click="toggle('customer')" style="width:80px; display: block; margin: 0 auto;">编辑</el-button>
          </div>
        </div>
      </div>

      <!-- 个人档案 -->
      <div class="content_left_item" id="basicRecord">
        <h2 class="title">基本档案</h2>
        <div class="detail-item" id="basic">
          <div class="child-title" id="contact-number"><b>联系方式</b><i v-if="!createFlags['contact-number']" class="el-icon-edit" @click="toggle('contact-number')"></i></div>
          <div class="child-item">
            <div class="content-left" style="width: 100%;">
              <el-template :pkTemp="pktemp['contact-number']"
                          ref="contact-number"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('contact-number', arguments[0])"
                          :hide-title="true"
                          :isEdit="createFlags['contact-number']"
                          :templateValue="currentValues['contact-number']">
              </el-template>
              <el-button-group v-if="createFlags['contact-number']" class="button-group">
                <el-button class="save" size="small" type="primary" @click="submit('contact-number')" style="width:80px; display:block;">保存</el-button>
                <el-button class="save" size="small" type="primary" @click="toggle('contact-number')" style="width:80px; display:block; margin-left:20px;">取消</el-button>
              </el-button-group>
            </div>
          </div>
          <div class="child-title" id="marital-status"><b>配偶信息</b><i v-if="!(createFlags['marital-status1'] || createFlags['marital-status2'])" class="el-icon-edit" @click="function(){toggle('marital-status1');toggle('marital-status2');}"></i></div>
          <div style="border-bottom:1px solid #CECECE; margin-bottom: 10px;">
            <div class="child-item" style="border:none;">
              <div class="child-item-left" style="height:220px;">
                <div v-if="!createFlags['marital-status1']">
                  <img v-if="realPath[imageCodes['marital-status1']]" :src="realPath[imageCodes['marital-status1']]" style="width: 300px; height: 200px;">
                  <div v-else class="upload-box" style="height: 200px">
                    <div style="height:25px;line-height:25px;text-align:center;width:310px; text-align:center; margin-top: 80px;">请点击编辑之后上传</div>
                    <div style="height:25px;line-height:25px;text-align:center;width:310px; text-align:center;">配偶身份证照片</div>
                  </div>
                </div>
                <el-upload
                  v-else
                  class="avatar-uploader"
                  action="/ifbp-app-bd/bd/customer/personal/file"
                  :show-file-list="false"
                  :on-success="function(res,file){handleAvatarSuccess('marital-status1',res,file)}"
                  :before-upload="function(res,file){beforeAvatarUpload('marital-status1',res,file)}">
                  <img v-if="realPath[imageCodes['marital-status1']]" :src="realPath[imageCodes['marital-status1']]" style="width: 300px; height: 200px;">
                  <div v-else class="upload-box" style="height: 200px">
                    <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 70px;"></i>
                    <div style="height:70px;line-height:70px;text-align:center;width:310px; text-align:center;">配偶身份证照片上传</div>
                  </div>
                </el-upload>
                <div v-if="realPath[imageCodes['marital-status1']]" style="height:20px;line-height:20px;text-align:center;width:310px; text-align:center;">配偶身份证照片</div>
              </div>
              <div class="child-item-right" style="">
                <el-template :pkTemp="pktemp['marital-status1']"
                            ref="marital-status1"
                            @change="changeHandle"
                            @setEmptyKeys="setEmptyKey('marital-status1', arguments[0])"
                            :hide-title="true"
                            :isEdit="createFlags['marital-status1']"
                            :templateValue="currentValues['marital-status1']">
                </el-template>
                <el-button-group v-if="createFlags['marital-status1']" class="button-group">
                  <el-button class="save" size="small" type="primary" @click="submit('marital-status1')" style="width:80px; display:block;">保存</el-button>
                  <el-button class="save" size="small" type="primary" @click="toggle('marital-status1')" style="width:80px; display:block; margin-left:20px;">取消</el-button>
                </el-button-group>
              </div>
            </div>
            <div class="child-item">
              <div class="content-left">
                <el-template :pkTemp="pktemp['marital-status2']"
                            ref="marital-status2"
                            @change="changeHandle"
                            @setEmptyKeys="setEmptyKey('marital-status2', arguments[0])"
                            :hide-title="true"
                            :isEdit="createFlags['marital-status2']"
                            :templateValue="currentValues['marital-status2']">
                </el-template>
                <el-button-group v-if="createFlags['marital-status2']" class="button-group">
                  <el-button class="save" size="small" type="primary" @click="submit('marital-status2')" style="width:80px; display:block;">保存</el-button>
                  <el-button class="save" size="small" type="primary" @click="toggle('marital-status2')" style="width:80px; display:block; margin-left: 20px;">取消</el-button>
                </el-button-group>
              </div>
              <div class="content-right">
                <div v-if="!createFlags['marital-status2']">
                  <img v-if="realPath[imageCodes['marital-status2']]" :src="realPath[imageCodes['marital-status2']]" style="width: 100%;height: 120px;">
                  <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                    <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请点击编辑之后上传</div>
                    <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">配偶附件图片</div>
                  </div>
                </div>
                <el-upload
                  v-else
                  class="avatar-uploader"
                  action="/ifbp-app-bd/bd/customer/personal/file"
                  :show-file-list="false"
                  :on-success="function(res,file){handleAvatarSuccess('marital-status2',res,file)}"
                  :before-upload="function(res,file){beforeAvatarUpload('marital-status2',res,file)}">
                  <img v-if="realPath[imageCodes['marital-status2']]" :src="realPath[imageCodes['marital-status2']]" style="width: 100%;height: 120px;">
                  <div v-else class="upload-box" style="width: 180px">
                    <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                    <div style="height:50px;line-height:50px;text-align:center;width:100%;">配偶附件图片上传</div>
                  </div>
                </el-upload>
                <div v-if="realPath[imageCodes['marital-status2']]" style="height:20px;line-height:20px;text-align:center;width:100%;">配偶附件图片</div>
              </div>
            </div>
          </div>
          <div class="child-title" id="child-detail"><b>子女信息</b><i class="el-icon-plus" @click="addListItem('child-detail')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['child-detail']"
                          ref="child-detail"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('child-detail', arguments[0])"
                          @save-expand-form="submit('child-detail', arguments)"
                          @delete-expand-form="deleteRowForm('child-detail', arguments)"
                          @edit-expand-form="editRowForm('child-detail')"
                          @cancel-expand-form="cancelRowForm('child-detail')"
                          @expand-row="function(row, expanded){expandRow('child-detail', {row:row,expanded:expanded})}"
                          :table-style="tableStyle"
                          :hide-title="true"
                          :expand="expands['child-detail']"
                          :expandRowKeys="expandRowKeys['child-detail']"
                          rowKey="id"
                          :isEdit="createFlags['child-detail']"
                          :templateValue="currentValues['child-detail']">
              </el-template>
            </div>
            <div class="content-right">
              <div v-if="currentValues['child-detail'] && currentValues['child-detail'].length === 0">
                <img v-if="realPath[imageCodes['child-detail']]" :src="realPath[imageCodes['child-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请添加子女信息之后上传</div>
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">子女照片</div>
                </div>
              </div>
              <el-upload
                v-else
                ref="child-detail-upload"
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('child-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('child-detail',res,file)}"
                @mouseenter.native="function(event){showHoverCard('child-detail', event)}">
                <img v-if="realPath[imageCodes['child-detail']]" :src="realPath[imageCodes['child-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px">
                  <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                  <div style="height:50px;line-height:50px;text-align:center;width:100%;">子女照片上传</div>
                </div>
              </el-upload>
              <div class="hoverCard" @mouseleave="hideHoverCard" style="position: absolute; top: 0; left: 0; display: none;">
                <i class="el-icon-view" style="margin-right: 30px;" @click="handlePreview('child-detail')"></i>
                <i class="el-icon-upload" @click="handleUpload('child-detail')"></i>
              </div>
              <div v-if="realPath[imageCodes['child-detail']]" style="height:20px;line-height:20px;text-align:center;width:100%;">子女照片</div>
            </div>
          </div>
          <div class="child-title" id="habitation"><b>居住信息</b><i class="el-icon-plus" @click="addListItem('habitation')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp.habitation"
                          ref="habitation"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('habitation', arguments[0])"
                          @save-expand-form="submit('habitation', arguments)"
                          @delete-expand-form="deleteRowForm('habitation', arguments)"
                          @edit-expand-form="editRowForm('habitation')"
                          @cancel-expand-form="cancelRowForm('habitation')"
                          @expand-row="function(row, expanded){expandRow('habitation', {row:row,expanded:expanded})}"
                          :table-style="tableStyle"
                          :hide-title="true"
                          :expand="expands['habitation']"
                          :expandRowKeys="expandRowKeys['habitation']"
                          rowKey="id"
                          :isEdit="createFlags['habitation']"
                          :templateValue="currentValues['habitation']">
              </el-template>
            </div>
            <div class="content-right">
              <div v-if="currentValues['habitation'] && currentValues['habitation'].length === 0">
                <img v-if="realPath[imageCodes['habitation']]" :src="realPath[imageCodes['habitation']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请添加居住信息之后上传</div>
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">居住信息附件</div>
                </div>
              </div>
              <el-upload
                v-else
                ref="habitation-upload"
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('habitation',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('habitation',res,file)}"
                @mouseenter.native="function(event){showHoverCard('habitation', event)}">
                <img v-if="realPath[imageCodes['habitation']]" :src="realPath[imageCodes['habitation']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px">
                  <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                  <div style="height:50px;line-height:50px;text-align:center;width:100%;">居住信息附件上传</div>
                </div>
              </el-upload>
              <div class="hoverCard" @mouseleave="hideHoverCard" style="position: absolute; top: 0; left: 0; display: none;">
                <i class="el-icon-view" style="margin-right: 30px;" @click="handlePreview('habitation')"></i>
                <i class="el-icon-upload" @click="handleUpload('habitation')"></i>
              </div>
              <div v-if="realPath[imageCodes['habitation']]" style="height:20px;line-height:20px;text-align:center;width:100%;">居住信息附件</div>
            </div>
          </div>
          <div class="child-title" id="job-detail"><b>工作信息</b><i v-if="!createFlags['job-detail']" class="el-icon-edit" @click="toggle('job-detail')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['job-detail']"
                          ref="job-detail"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('job-detail', arguments[0])"
                          :hide-title="true"
                          :isEdit="createFlags['job-detail']"
                          :templateValue="currentValues['job-detail']">
              </el-template>
              <el-button-group  v-if="createFlags['job-detail']" class="button-group">
                <el-button class="save" size="small" type="primary" @click="submit('job-detail')" style="width:80px; display:block;">保存</el-button>
                <el-button class="save" size="small" type="primary" @click="toggle('job-detail')" style="width:80px; display:block; margin-left: 20px;">取消</el-button>
              </el-button-group>
            </div>
            <div class="content-right">
              <div v-if="!createFlags['job-detail']">
                <img v-if="realPath[imageCodes['job-detail']]" :src="realPath[imageCodes['job-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请点击编辑之后上传</div>
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">工作信息附件</div>
                </div>
              </div>
              <el-upload
                v-else
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('job-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('job-detail',res,file)}">
                <img v-if="realPath[imageCodes['job-detail']]" :src="realPath[imageCodes['job-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px">
                  <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                  <div style="height:50px;line-height:50px;text-align:center;width:100%;">工作信息附件上传</div>
                </div>
              </el-upload>
              <div v-if="realPath[imageCodes['job-detail']]" style="height:20px;line-height:20px;text-align:center;width:100%;">工作信息附件</div>
            </div>
          </div>
          <div class="child-title" id="re-exp-detail"><b>收支信息</b><i v-if="!createFlags['re-exp-detail']" class="el-icon-edit" @click="toggle('re-exp-detail')"></i></div>
          <div class="child-item">
            <div class="content-left">
              <el-template :pkTemp="pktemp['re-exp-detail']"
                          ref="re-exp-detail"
                          @change="changeHandle"
                          @setEmptyKeys="setEmptyKey('re-exp-detail', arguments[0])"
                          :hide-title="true"
                          :isEdit="createFlags['re-exp-detail']"
                          :templateValue="currentValues['re-exp-detail']">
              </el-template>
              <el-button-group  v-if="createFlags['re-exp-detail']" class="button-group">
                <el-button class="save" size="small" type="primary" @click="submit('re-exp-detail')" style="width:80px; display:block;">保存</el-button>
                <el-button class="save" size="small" type="primary" @click="toggle('re-exp-detail')" style="width:80px; display:block; margin-left: 20px;">取消</el-button>
              </el-button-group>
            </div>
            <div class="content-right">
              <div v-if="!createFlags['re-exp-detail']">
                <img v-if="realPath[imageCodes['re-exp-detail']]" :src="realPath[imageCodes['re-exp-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请点击编辑之后上传</div>
                  <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">收支信息附件</div>
                </div>
              </div>
              <el-upload
                v-else
                class="avatar-uploader"
                action="/ifbp-app-bd/bd/customer/personal/file"
                :show-file-list="false"
                :on-success="function(res,file){handleAvatarSuccess('re-exp-detail',res,file)}"
                :before-upload="function(res,file){beforeAvatarUpload('re-exp-detail',res,file)}">
                <img v-if="realPath[imageCodes['re-exp-detail']]" :src="realPath[imageCodes['re-exp-detail']]" style="width: 100%;height: 120px;">
                <div v-else class="upload-box" style="width: 180px">
                  <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                  <div style="height:50px;line-height:50px;text-align:center;width:100%;">收支信息附件上传</div>
                </div>
              </el-upload>
              <div v-if="realPath[imageCodes['re-exp-detail']]" style="height:20px;line-height:20px;text-align:center;width:100%;">收支信息附件</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 信用档案 -->
      <!-- <div class="content_left_item" id="creditRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%"><span style="margin-right: 30px;">信用档案</span><span style="font-size:14px; font-weight:normal;">查征信</span></h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <i class="el-icon-setting title_icon"></i>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form style="margin: 0 40px; padding-bottom: 20px">
              <el-row class="self_form_row" :gutter="10">
                <el-col :span="11"><el-form-item label="身份证号：">111111111111111</el-form-item></el-col>
                <el-col :span="11"><el-form-item label="手机号：">15088888877</el-form-item></el-col>
              </el-row>
              <el-row class="self_form_row" :gutter="10">
                <el-col :span="11"><el-form-item label="银行卡号：">622888889999999</el-form-item></el-col>
                <el-col :span="11"><el-form-item label="照片相似度：">40%</el-form-item></el-col>
              </el-row>
              <el-row class="self_form_row" :gutter="10">
                <el-col :span="11"><el-form-item label="文化程度：">本科</el-form-item></el-col>
                <el-col :span="11"><el-form-item label="黑名单核查：">一级关系命中</el-form-item></el-col>
              </el-row>
              <el-row class="self_form_row" :gutter="10">
                <el-col :span="11"><el-form-item label="法院被执行人：">命中</el-form-item></el-col>
                <el-col :span="11"><el-form-item label="公安不良信息：">命中</el-form-item></el-col>
              </el-row>
              <el-row class="self_form_row" :gutter="10">
                <el-col :span="11"><el-form-item label="欺诈率：">中</el-form-item></el-col>
                <el-col :span="11"><el-form-item label="信用风险等级：">中风险</el-form-item></el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div> -->

      <!-- 联系人档案 -->
      <div class="content_left_item" id="contactRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">联系人档案
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;" @click="addListItem('contacts')"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!--<el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;" @click="addListItem('contacts')"></el-button>-->
            <i class="el-icon-setting title_icon" @click="editTableColumns('contacts')"></i>
          </el-col>
        </el-row>
        <el-template
            :pkTemp="pktemp.contacts"
            :expand="expands['contacts']"
            :template-value="currentValues.contacts"
            :expandRowKeys="expandRowKeys.contacts"
            :table-style="tableStyle"
            rowKey="id"
            ref="contacts"
            :isEdit="createFlags['contacts']"
            hideTitle="true"
            @setEmptyKeys="setEmptyKey('contacts', arguments[0])"
            @save-expand-form="submit('contacts', arguments)"
            @delete-expand-form="deleteRowForm('contacts', arguments)"
            @edit-expand-form="editRowForm('contacts')"
            @cancel-expand-form="cancelRowForm('contacts')"
            @expand-row="function(row, expanded){expandRow('contacts', {row:row,expanded:expanded})}">
        </el-template>
      </div>

      <!-- 银行账户 -->
      <div class="content_left_item" id="bankAccount">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">银行账户
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;" @click="addListItem('bank')"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!--<el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;" @click="addListItem('bank')"></el-button>-->
            <i class="el-icon-setting title_icon" @click="editTableColumns('bank')"></i>
          </el-col>
        </el-row>
        <div>
          <div class="leftTemplate">
            <el-template
                :pkTemp="pktemp.bank"
                :expand="expands['bank']"
                :template-value="currentValues.bank"
                :expandRowKeys="expandRowKeys.bank"
                :table-style="tableStyle"
                rowKey="id"
                ref="bank"
                :isEdit="createFlags['bank']"
                hideTitle="true"
                @setEmptyKeys="setEmptyKey('bank', arguments[0])"
                @save-expand-form="submit('bank', arguments)"
                @delete-expand-form="deleteRowForm('bank', arguments)"
                @edit-expand-form="editRowForm('bank')"
                @cancel-expand-form="cancelRowForm('bank')"
                @expand-row="function(row, expanded){expandRow('bank', {row:row,expanded:expanded})}">
            </el-template>
          </div>
          <div class="rightUpload">
            <div v-if="!createFlags['bank']">
              <img v-if="realPath[imageCodes['bank']]" :src="realPath[imageCodes['bank']]" style="width: 100%;height: 120px;">
              <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
                <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请点击编辑或创建</div>
                <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">上传对应的银行卡照片</div>
              </div>
            </div>
            <el-upload
              v-else
              ref="bank-upload"
              class="avatar-uploader"
              action="/ifbp-app-bd/bd/customer/personal/file"
              :show-file-list="false"
              :on-success="function(res,file){handleAvatarSuccess('bank',res,file)}"
              :before-upload="function(res,file){beforeAvatarUpload('bank',res,file)}"
              @mouseenter.native="function(event){showHoverCard('bank', event)}">
              <img v-if="realPath[imageCodes['bank']]" :src="realPath[imageCodes['bank']]" style="width: 100%;height: 120px;">
              <div v-else class="upload-box" style="width: 180px;">
                <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
                <div style="width:100%; line-height:50px; text-align: center;">银行卡照片上传</div>
              </div>
            </el-upload>
            <div class="hoverCard" @mouseleave="hideHoverCard" style="position: absolute; top: 0; left: 0; display: none;">
              <i class="el-icon-view" style="margin-right: 30px;" @click="handlePreview('bank')"></i>
              <i class="el-icon-upload" @click="handleUpload('bank')"></i>
            </div>
            <div v-if="realPath[imageCodes['bank']]" style="width:100%; line-height:20px; text-align: center;">银行卡照片</div>
          </div>
          <div style="width:100%; clear:both;"></div>
        </div>
      </div>

      <!-- 影音档案 -->
      <div class="content_left_item" id="avRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">影音档案</h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!-- <i class="el-icon-pt-xiazai title_icon" style="margin-right: 20px"></i> -->
            <!-- <i class="el-icon-delete title_icon"></i> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-upload
                multiple
                action="/ifbp-app-bd/bd/customer/personal/file"
                list-type="picture-card"
                :on-success="handleAvRecordSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="avFileList">
                <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
      </div>

      <!-- 资产档案 -->
      <div class="content_left_item" id="capitalRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">资产档案
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;" @click="addListItem('capital')"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <!--<el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;" @click="addListItem('capital')"></el-button>-->
            <i class="el-icon-setting title_icon" @click="editTableColumns('capital')"></i>
          </el-col>
        </el-row>
        <div class="leftTemplate">
          <el-template
              :pkTemp="pktemp.capital"
              :expand="expands['capital']"
              :template-value="currentValues.capital"
              :expandRowKeys="expandRowKeys.capital"
              :table-style="tableStyle"
              rowKey="id"
              ref="capital"
              :isEdit="createFlags['capital']"
              hideTitle="true"
              @setEmptyKeys="setEmptyKey('capital', arguments[0])"
              @save-expand-form="submit('capital', arguments)"
              @delete-expand-form="deleteRowForm('capital', arguments)"
              @edit-expand-form="editRowForm('capital')"
              @cancel-expand-form="cancelRowForm('capital')">
          </el-template>
        </div>
        <div class="rightUpload">
          <div v-if="currentValues['capital'] && currentValues['capital'].length === 0">
            <img v-if="realPath[imageCodes['capital']]" :src="realPath[imageCodes['capital']]" style="width: 100%;height: 120px;">
            <div v-else class="upload-box" style="width: 180px; padding: 25px 0;">
              <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">请添加资产档案之后上传</div>
              <div style="height:25px;line-height:25px;text-align:center;width:100%; text-align:center;">资产档案附件</div>
            </div>
          </div>
          <el-upload
            v-else
            ref="capital-upload"
            class="avatar-uploader"
            action="/ifbp-app-bd/bd/customer/personal/file"
            :show-file-list="false"
            :on-success="function(res,file){handleAvatarSuccess('capital',res,file)}"
            :before-upload="function(res,file){beforeAvatarUpload('capital',res,file)}"
            @mouseenter.native="function(event){showHoverCard('capital', event)}">
            <img v-if="realPath[imageCodes['capital']]" :src="realPath[imageCodes['capital']]" style="width: 100%;height: 120px;">
            <div v-else class="upload-box" style="width: 180px">
              <i class="el-icon-plus avatar-uploader-icon" style="margin-top: 20px;"></i>
              <div style="width:100%; line-height:50px; text-align: center;">资产档案附件上传</div>
            </div>
          </el-upload>
          <div class="hoverCard" @mouseleave="hideHoverCard" style="position: absolute; top: 0; left: 0; display: none;">
            <i class="el-icon-view" style="margin-right: 30px;" @click="handlePreview('capital')"></i>
            <i class="el-icon-upload" @click="handleUpload('capital')"></i>
          </div>
          <div v-if="realPath[imageCodes['capital']]" style="width:100%; line-height:20px; text-align: center;">资产档案附件</div>
        </div>
        <div style="width:100%; clear:both;"></div>
      </div>

      <!-- 族谱档案 -->
      <!-- <div class="content_left_item" id="familyRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">族谱档案</h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <i class="el-icon-pt-quanping title_icon" style="color:#00A5E3"></i>
          </el-col>
        </el-row>
        <chart :style="myEcharts.graphStyle" :options="myEcharts.options"></chart>
      </div> -->

      <!-- 跟进档案 -->
      <!-- <div class="content_left_item" id="followRecord">
        <el-row class="content_label">
          <el-col :span="14">
            <h2 class="title" style="width:60%">跟进档案
              <i class="el-icon-plus" style="font-size: 14px;color: #00a5e3;cursor: pointer;margin-left: 5px;"></i>
            </h2>
          </el-col>
          <el-col :span="10" style="text-align: right;">
            <el-button size="mini" type="primary" icon="plus" style="margin-right:20px; margin-bottom: 5px; margin-bottom: 7px; vertical-align: middle;"></el-button>
            <i class="el-icon-setting title_icon"></i>
          </el-col>
        </el-row>
        <div class="followTable">
          <el-table border>
            <el-table-column type="expand">
              <template scope="props" :columns="followTableTmp.columns">
                <el-form>
                  <el-form-item label="followTableTmp.columns">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column :label="followTableTmp.columns[index-1].name" :prop="followTableTmp.columns[index-1].flag" v-for="index in followTableTmp.showRowCount || followTableTmp.columns.length">
              <template scope="props">
                <span>{{props.row[followTableTmp.columns[index-1].flag]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div> -->
    </div>
    <div class="nav_right">
      <ul id="side-nav">
        <li v-for="(item, index) in sideNavData" :class="{selected: index === 0}" :key="index">
          <a href="javascript:;" :data-id="item.anchor" @click="anchorClick">{{item.label}}</a>
        </li>
        <span class="line" style=""></span>
      </ul>
    </div>
  </div>
  <div id="cover" ref="cover"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div></div>
  <el-image-previewer ref="imagePreviewer" :imageUrls="imageUrlsArray"></el-image-previewer>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>
<script>
// import echarts from 'vue-echarts';
import _ from 'lodash';

export default {
  data() {
    var isCreate = this.$route.params.id === 'add';
    return {
      pktemp: {
        // 'contact-number': '50212a7f-e3eb-4d67-9786-4104c712a914',
        'contact-number': '5e5957ca-6919-4119-9eb0-a0ef7de556d2',
        'marital-status1': '1510c82a-146c-48f8-8b3c-51746166fb9f',
        'marital-status2': '6c5593b3-dd46-4950-9ea6-b12a1ed12507',
        'child-detail': '7c647893-4258-4584-a8ab-c5eb1f94b5f2',
        habitation: 'f4dc61fa-1724-4fe7-8b5d-35c507860585',
        'job-detail': 'e8a9e0f1-4694-41e6-af56-0379af75c2f7',
        're-exp-detail': 'cbf9ab22-9f2b-4138-aec4-91277d4e089c',
        customer: 'eaa9aeaa-1cea-4a60-9e8d-11fee3bf654a',
        contacts: '0181a888-9161-42d0-b5ab-1ce4c21a6663',
        bank: 'c5e38c96-c75b-48b6-a782-aa32ea776475',
        capital: '66a62597-bc64-428e-bf9f-decaed96d4d2',
      },
      title: '客户信息设置',
      id: this.$route.params.id,
      isCreate: isCreate,
      templateValue: '', // 整个元数据的集合
      promises: {},
      emptyListItem: {},
      emptyId: '',
      loadDefer: [],
      idMap: {
        'child-detail': 'childreninfo_id',
        habitation: 'estateinfo_id',
        contacts: 'contacts_id',
        bank: 'probank_id',
        capital: 'procapital_id'
      },
      fileList: [],
      avFileList: [],
      imageUrl: {},
      imageCodes: {
        'contact-number': 'id_img',
        'marital-status1': 'mateidimg',
        'marital-status2': 'mate_attach',
        'child-detail': 'child_img',
        habitation: 'estateinfo_img',
        'job-detail': 'work_img',
        're-exp-detail': 'payments_img',
        idImg: 'id_img',
        customer: 'upbody_img',
        bank: 'show_img',
        capital: 'capital_img'
      },
      realPath: {},
      bankImgUrls: [],
      expands: {},
      sideNavData: [ // 右侧导航目录数据
        {
          anchor: 'basicRecord',
          label: '基本档案'
        },
        /* 基本档案 子标题
        {
          anchor: 'contact-number',
          label: '联系方式'
        },
        {
          anchor: 'marital-status',
          label: '婚姻信息'
        },
        {
          anchor: 'child-detail',
          label: '子女信息'
        },
        {
          anchor: 'habitation',
          label: '居住信息'
        },
        {
          anchor: 'job-detail',
          label: '工作信息'
        },
        {
          anchor: 're-exp-detail',
          label: '收支信息'
        },
         */
        /*{
          anchor: 'creditRecord',
          label: '信用档案'
        },*/
        {
          anchor: 'contactRecord',
          label: '联系人档案'
        },
        {
          anchor: 'bankAccount',
          label: '银行账户'
        },
        {
          anchor: 'avRecord',
          label: '影音档案'
        },
        {
          anchor: 'capitalRecord',
          label: '资产档案'
        },
        /*{
          anchor: 'familyRecord',
          label: '族谱档案'
        },
        {
          anchor: 'followRecord',
          label: '跟进档案'
        },*/
      ],
      tableStyle: {
        'max-height': '1000px'
      },
      myEcharts: {
        options: '',
        graphStyle: {},
      },
      // basicRecord formdata
      basicRecordFrom: [
        {
          flag: 'contact',
          name: '联系方式',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            }
          ]
        },
        {
          flag: 'marriageInfo',
          name: '婚姻信息',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'childrenInfo',
          name: '子女信息',
          buttons: [
            {
              name: 'edit',
              icon: 'edit'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'residenceInfo',
          name: '居住信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            }
          ]
        },
        {
          flag: 'workInfo',
          name: '工作信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        },
        {
          flag: 'paymentInfo',
          name: '收支信息',
          buttons: [
            {
              name: 'add',
              icon: 'plus'
            },
            {
              name: 'upload',
              icon: 'upload2'
            }
          ]
        }
      ],
      followTableTmp: {
        showRowCount: 4,
        columns: [
          {
            flag: 'follower',
            name: '跟进人',
          },
          {
            flag: 'followTime',
            name: '跟进时间',
            type: 'date'
          },
          {
            flag: 'followType',
            name: '跟进方式',
          },
          {
            flag: 'followContent',
            name: '内容',
          },
          {
            flag: 'followerName',
            name: '备注',
          },
        ],
      },
      // 存储ui模板grid展开列
      expandRowKeys: {
        'child-detail': [],
        habitation: [],
        contacts: [],
        bank: [],
        capital: [],
      },
      originalValues: {},
      // currentValues flags
      currentValues: {
        // 'contact-number': '',
        // 'marital-status1': '',
        // 'marital-status2': '',
        // 'child-detail': '',
        // habitation: '',
        // 'job-detail': '',
        // 're-exp-detail': '',
        // customer: '',
        // contacts: '',
        // bank: '',
        // capital: '',
      },
      // create flags
      createFlags: {
        'contact-number': isCreate,
        'marital-status1': isCreate,
        'marital-status2': isCreate,
        'child-detail': isCreate,
        habitation: isCreate,
        'job-detail': isCreate,
        're-exp-detail': isCreate,
        customer: isCreate,
        contacts: isCreate,
        bank: isCreate,
        capital: isCreate,
      },
      dialogImageUrl:'',
      dialogVisible: false,
      imageUrlsArray: []
    };
  },
  methods: {
    initPromise(request) {
      Object.keys(this.pktemp).forEach((flag) => {
        var promise = new Promise((res, rej) => {
          this.promises[flag] = {
            resolve: res,
            reject: rej
          };
        });
        this.loadDefer.push(promise);
        Promise.all([promise, request]).then(() => {
          this.assignValues(flag);
        });
      });
      Promise.all(this.loadDefer.concat(request)).then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.cover.remove();
          },100);
        });
      });
    },
    require() {
      const url = '/ifbp-app-bd/bd/customer/personal/' + this.id;
      const self = this;
      return this.$http({
        url: url,
        method: 'GET',
      }).then((res) => {
        if(res.data.success === true) {
          self.templateValue = res.data.data;
          this.initImgUrl(res.data.data);
          this.initAvFileList(res.data.data);
        }
      });
    },
    assignValues(flag) {
      if(Object.keys(this.idMap).indexOf(flag) > -1) { // grid
        this.$set(this.currentValues, flag, this.templateValue[this.idMap[flag]]);
      } else { // form
        var map = Object.keys(this.currentValues[flag]);
        for(var i=0;i<map.length;i++){ // 从返回值中获取出form所有数据
          this.currentValues[flag][map[i]] = this.templateValue[map[i]];
        }
      }
      this.originalValues[flag] = JSON.parse(JSON.stringify(this.currentValues[flag]));
    },
    getBankImgUrl(bankData) {
      return bankData[this.imageCodes.bank] || '';
    },
    initImgUrl(data) {
      const self = this;
      Object.keys(this.imageCodes).forEach((v) => {
        if(v === 'bank') {
          var bankDatas = data[self.idMap.bank];
          var bankImgUrl = '';
          if(bankDatas instanceof Array && bankDatas.length) {
            bankImgUrl = self.getBankImgUrl.call(self, bankDatas[0]);
          }
          this.$set(self.imageUrl, self.imageCodes[v], bankImgUrl);
        }else {
          self.$set(self.imageUrl, self.imageCodes[v], data[self.imageCodes[v]] === null ? '' : data[self.imageCodes[v]]);
        }
      });
    },
    initAvFileList(data) {
      if(data.mediainfo_id instanceof Array) {
        const self = this;
        self.avFileList = [];
        data.mediainfo_id.forEach((v) => {
          if(v.filepath) {
            self.avFileList.push({
              name: v.filename,
              url: self.getRealImg(v.filepath)
            });
          }
        });
      }
    },
    beforeAvatarUpload(){
      return true;
    },
    getRealImg(url) {
      var realPath = '';
      if(url && url.length > 0) {
        if (url.indexOf(',') > -1) { // grid中的多个图片暂时显示最新一张
          realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url.split(',').pop();
        } else { // form 中图片都是一张
          realPath = '/ifbp-app-bd/bd/customer/personal/file?filepath=' + url;
        }
      }
      return realPath;
    },
    handleAvatarSuccess(id, res){
      if(id === 'bank') { // 银行账户图片
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
        if(!this.createFlags[id]) {
          this.addListItem(id);
        }
      } else if (Object.keys(this.idMap).indexOf(id) > -1 || id === 'idImg') { // grid 中图片(或者身份证照片)上传后直接保存回执
        // grid 中的图片貌似都可以多张?
        var muiltPath = this.imageUrl[this.imageCodes[id]];
        if (muiltPath === '') {
          muiltPath = res.data;
        } else {
          muiltPath = muiltPath.split(',');
          muiltPath.push(res.data);
          muiltPath = muiltPath.join(',');
        }

        this.$set(this.imageUrl, this.imageCodes[id], muiltPath);

        var submitData = {};
        submitData[this.imageCodes[id]] = this.imageUrl[this.imageCodes[id]];
        submitData.changedPropertyNames = [this.imageCodes[id]];
        submitData.id = this.id;
        this.$http({// 保存回执
          url: '/ifbp-app-bd/bd/customer/personal/',
          method: 'post',
          dateType: 'json',
          data: submitData
        }).then((response) => {
          if (response.data.success === true) {
            if (window.env === 'dev') {
              this.$message('图片保存成功');
            }
          } else {
            this.$error('图片保存失败');
          }
        }).catch(() => {
          this.$error('图片保存失败');
        });
      } else { // form 上传后先赋值，点保存才存回执
        this.$set(this.imageUrl, this.imageCodes[id], res.data);
        this.$set(this.createFlags, id, true);
      }
    },
    handleAvRecordSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      let filePath = '';
      const submitData = {};
      if(res.success === true && res.data) {
        filePath = res.data || '';
      } else {
        if (window.env === 'dev') {
          this.$error('保存失败');
        }
        return;
      }
      const fileData = {
        filename: file.raw.name,
        filepath: filePath,
        filesize: file.raw.size,
        filetype: file.raw.type,
        mediainfo_id: this.id
      };
      const self = this;
      submitData.changedPropertyNames = [''];
      submitData.mediainfo_id = [fileData];
      submitData.id = this.id;

      this.$http({
        url: '/ifbp-app-bd/bd/customer/personal/',
        method: 'post',
        dataType: 'json',
        data: submitData
      }).then((response) => {
        if(response.data.success === true) {
          self.templateValue = response.data.data;
          self.avFileList.push({
            name: file.raw.name,
            url: self.getRealImg(filePath)
          });
          if (window.env === 'dev') {
            self.$message('保存成功');
          }
        }else {
          self.$error('保存失败');
        }
      }).catch(() => {
        self.$error('保存失败');
      });
    },
    scroll() {
      if(this.$route.path.indexOf('/crm/personalInfo') < 0){
        return;
      }
      this.fixedNav();
      this.scrollFocus();
    },
    // 控制side-nav悬浮在页面右上方
    fixedNav() {
      if($('#customerInfo .content_main').length > 0) {
        const mainTop = $('#customerInfo .content_main').offset().top;
        const $fixedDom = $('#customerInfo .nav_right');
        if(mainTop >= 82) {
          $fixedDom.removeClass('fixed');
        }
        if(mainTop < 82) {
          $fixedDom.addClass('fixed');
        }
      }
    },
    // 页面滚动时，根据锚点focus右侧当行栏
    scrollFocus() {
      let focusDom = null;
      var topHeidht = $("html").height() - 170;
      if($(`#${this.sideNavData[0].anchor}`).offset().top > topHeidht){
          focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[0].anchor}]`);
      } else if($(`#${this.sideNavData[this.sideNavData.length - 1].anchor}`).offset().top < topHeidht){
        focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[this.sideNavData.length - 1].anchor}]`);
      } else {
        for(let i = 1; i < this.sideNavData.length; i++) {
          if($(`#${this.sideNavData[i - 1].anchor}`).offset().top <= topHeidht &&
          $(`#${this.sideNavData[i].anchor}`).offset().top > topHeidht) {
            focusDom = $('#side-nav').find(`a[data-id=${this.sideNavData[i - 1].anchor}]`);
          }
        }
      }
      if(focusDom && focusDom.length) {
        focusDom.parent().siblings().removeClass('selected');
        focusDom.parent().addClass('selected');
      }
    },
    anchorClick(e) {
      e.preventDefault();
      const target = e.currentTarget;
      if(target) {
        $(target).parent().siblings().removeClass('selected');
        $(target).parent().addClass('selected');
        const domId = $(target).data('id');
        const scrollDom = document.getElementById(domId);
        if(scrollDom) {
          scrollDom.scrollIntoView(); // 根据id找到对应DOM滚动到顶部
        }
      }
    },
    /* remove picture */
    handleRemove(file) {
      const self = this;
      const curFileList = this.templateValue.mediainfo_id;
      if(curFileList) {
        curFileList.forEach((v, i) => {
          if(file.url.indexOf(v.filepath) > -1) {
            this.$http({
              url: '/ifbp-app-bd/bd/customer/personal/child?idtype=mediainfo_id&id=' + v.id,
              method: 'delete',
            }).then((res) => {
              if(res.data.success === true) {
                if (window.env === 'dev') {
                  self.$message('删除成功！');
                }
                self.avFileList.splice(i,1);
                self.templateValue.mediainfo_id.splice(i,1);
              } else {
                self.$message('删除失败！');
              }
            });
          }
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeHandle() {

    },
    // 点击设置按钮，弹出穿梭框显示隐藏列
    editTableColumns(flag) {
      if(this.$refs[flag]) {
        var gridVm = this.$refs[flag].$children[0];
        if(gridVm && typeof gridVm.editColumns === 'function') {
          gridVm.editColumns();
        }
      }
    },
    toggle(flag) {
      this.createFlags[flag] = !this.createFlags[flag];
      // rebuild original data
      this.currentValues[flag] = JSON.parse(JSON.stringify(this.originalValues[flag]));
    },
    /* 个人档案 事件处理 */
    handleBasicRecordButton(eventName, itemName) {
      console.log('editBasic', eventName, itemName);
      this.$router.push('/crm/personalDetail/' + this.id);
    },
    setEmptyKey(flag, value) {
        if(Object.keys(this.idMap).indexOf(flag) < 0){ // form
          this.$set(this.currentValues, flag, value);
        } else { // grid
          this.emptyListItem[flag] = value;
          this.emptyListItem[flag].id = this.emptyId;
        }
        console.log('resolve', flag, value);
        this.promises[flag].resolve(flag);
    },
    setExpandButtons(flag) {
      if(!this.createFlags[flag]) {
        this.$set(this.expands[flag], 'buttons', [
          {
            name: 'edit',
            text: '编辑',
            icon: ''
          },
          {
            name: 'delete',
            text: '删除',
            icon: '',
            type: 'normal'
          }
        ]);
      } else {
        this.$set(this.expands[flag], 'buttons', [
          {
            name: 'save',
            text: '保存',
            icon: ''
          },
          {
            name: 'cancel',
            text: '取消',
            icon: '',
            type: 'normal'
          }
        ]);
      }
    },
    rebuildEditRow(flag) {
      if (this.expandRowKeys[flag].length > 0) {
        for (var i = 0;i < this.currentValues[flag].length; i++) {
          if (this.currentValues[flag][i].id === this.expandRowKeys[flag][0]) {
            const emptyListItemInfo = JSON.parse(JSON.stringify(this.emptyListItem[flag]));
            const originalValueInfo = JSON.parse(JSON.stringify(this.originalValues[flag][i]));
            if (this.expandRowKeys[flag][0] === '') {
              this.currentValues[flag].splice(i, 1, emptyListItemInfo);
            } else {
              this.currentValues[flag].splice(i, 1, originalValueInfo);
            }
          }
        }
      }
    },
    expandRow(flag, data) {
      this.rebuildEditRow(flag);
      if (data.expanded) {
        if (data.row.id !== '') {
          this.createFlags[flag] = false;
        } else {
          this.createFlags[flag] = true;
        }
        if(flag === 'bank') {
          this.$set(this.imageUrl, this.imageCodes.bank, this.getBankImgUrl(data.row));
        }
        this.setExpandButtons(flag);
        this.expandRowKeys[flag] = [];
        this.expandRowKeys[flag] = [data.row.id];
      } else {
        this.expandRowKeys[flag] = [];
      }
    },
    addListItem(flag) {
      if (this.isCreate) {
        this.$message('请先新增并保存主表数据');
        return;
      }
      if(this.currentValues[flag]) {
        this.rebuildEditRow(flag);
        if(!this.createFlags[flag]) {
          this.$set(this.createFlags, flag, true);
          this.setExpandButtons(flag);
          this.currentValues[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
          this.originalValues[flag].push(JSON.parse(JSON.stringify(this.emptyListItem[flag])));
          if(flag === 'bank') {
            var bankData = this.currentValues[flag][this.currentValues[flag].length-1];
            this.$set(this.imageUrl, this.imageCodes.bank, this.getBankImgUrl(bankData));
          }
          this.expandRowKeys[flag] = [this.emptyId];
        } else {
          this.createFlags[flag] = false;
          this.setExpandButtons(flag);
          this.currentValues[flag].pop();
          this.expandRowKeys[flag] = [];
        }
      }
    },
    deleteNullValue(obj) {
      var newObj = {};
      var map = Object.keys(obj);
      for(var i = 0; i < map.length; i++) {
        if(obj[map[i]] !== null) {
          newObj[map[i]] = obj[map[i]];
        }
      }
      return newObj;
    },
    // 点击编辑expand表单
    editRowForm(flag) {
      this.createFlags[flag] = true;
      this.setExpandButtons(flag);
      this.originalValues[flag] = JSON.parse(JSON.stringify(this.currentValues[flag]));
    },
    // 点击expand表单取消
    cancelRowForm(flag) {
      this.createFlags[flag] = false;
      const tableArray = this.currentValues[flag];
      if(!tableArray[tableArray.length-1].id) { // expand表单为创建时，点击取消要删除该行
        this.currentValues[flag].pop();
        this.expandRowKeys[flag] = [];
        this.setExpandButtons(flag);
      } else {
        this.currentValues[flag] = JSON.parse(JSON.stringify(this.originalValues[flag]));
      }
    },
    // 点击expand表单删除
    deleteRowForm(flag, args) {
      this.$confirm('是否删除当前记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const [index, row] = args;
        this.$http({
          url: '/ifbp-app-bd/bd/customer/personal/child?idtype=' + this.idMap[flag] + '&id=' + row.id,
          method: 'delete',
        }).then((res) => {
          if(res.data.success === true) {
            this.currentValues[flag].splice(index, 1);
            if (window.env === 'dev') {
              this.$message({type: 'success',message: '删除成功!'});
            }
          } else {
            this.$message({type: 'error',message: '删除失败!'});
          }
        }).catch(() => {
          this.$message({type: 'error',message: '请求出错!'});
        });
        this.$set(this.createFlags, flag, false);
        this.setExpandButtons(flag);
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});
      });
    },
    // 保存信息
    submit(flag, args) {
      this.$refs[flag].validate((valid) => {
          if(valid) {
              var changedPropertyNames=[];
              var submitData = {};
              var index = 0;
              var row = {};
              if (Object.keys(this.idMap).indexOf(flag) > -1) { // grid
                index = args[0];
                row = _.cloneDeep(args[1]);
                changedPropertyNames = [''];
                var tableData = JSON.parse(JSON.stringify(this.currentValues[flag]));
                row = this.deleteNullValue(row);
                row[this.idMap[flag]] = this.id;
                if(flag === 'bank'){
                  row[this.imageCodes[flag]] = this.imageUrl[this.imageCodes[flag]];
                }
                if (this.createFlags[flag]) {
                  tableData.pop();
                  tableData.push(row);
                } else {
                  tableData.splice(index, 1, row);
                }
                // submitData = {
                //   id: this.id,
                //   changedPropertyNames: changedPropertyNames
                // };
                submitData[this.idMap[flag]] = tableData;
              } else {
                changedPropertyNames = Object.keys(this.currentValues[flag]);
                changedPropertyNames.push(this.imageCodes[flag]); // 带上图片key
                submitData = JSON.parse(JSON.stringify(this.currentValues[flag]));
                // submitData.id = this.id;
                submitData[this.imageCodes[flag]] = this.imageUrl[this.imageCodes[flag]];
                // submitData.changedPropertyNames = changedPropertyNames;
              }
              if(!this.isCreate === true) {
                submitData.id = this.id;
                submitData.changedPropertyNames = changedPropertyNames;
              }
              const self = this;
              this.$http({
                url: '/ifbp-app-bd/bd/customer/personal/',
                method: 'post',
                dataType: 'json',
                data: submitData,
              }).then((res) => {
                if(res.data.success === true) {
                  if(Object.keys(self.idMap).indexOf(flag) > -1) { // grid
                    self.$set(self.currentValues, flag, res.data.data[self.idMap[flag]]);
                    const currentValue = this.currentValues[flag];
                    // 重新给原数据赋值
                    self.originalValues[flag] = JSON.parse(JSON.stringify(currentValue));
                    if(self.createFlags[flag]) { // create
                      self.$set(this.createFlags, flag, false);
                      self.setExpandButtons(flag);
                      if (window.env === 'dev') {
                        self.$message('添加成功！');
                      }
                    } else if (window.env === 'dev') {
                        self.$message('更新成功！');
                    }
                    self.expandRowKeys[flag] = [];
                  } else { // form
                    if(self.isCreate) {
                      self.id = res.data.data.id;
                      self.isCreate = false;
                    }
                    if (window.env === 'dev') {
                      self.$message('保存成功！');
                    }
                    const currentValue = this.currentValues[flag];
                    // 重新给原数据赋值
                    self.originalValues[flag] = JSON.parse(JSON.stringify(currentValue));
                    self.createFlags[flag] = false;
                  }
                } else {
                  this.$message({
                    message: '保存失败！',
                    type: 'error'
                  });
                }
              }).catch(() => {
                this.$message({
                  message: '请求出错！',
                  type: 'error'
                });
              });
          } else {
            // 验证失败
          }
      });
    },
    goBack() {
      window.history.back(-1);
    },
    // 初始化表格expand表单的按钮为非编辑态时的编辑/删除
    setExpandsValue() {
      Object.keys(this.idMap).forEach((v) => {
        const expand = {
          buttonAlign: 'center',
          columnsShowCount: 3,
          buttons: [
            {
              name: 'edit',
              text: '编辑',
              icon: ''
            },
            {
              name: 'delete',
              text: '删除',
              icon: '',
              type: 'normal'
            }
          ]
        };
        this.$set(this.expands, v, expand);
      });
    },
    // 鼠标进入图片显示预览上传图标层
    showHoverCard(flag, event) {
      var target = event.currentTarget;
      if(this.realPath[this.imageCodes[flag]]) {
        target.nextElementSibling.style.display = 'inline-block';
      }
    },
    // 鼠标离开图片隐藏预览上传图标层
    hideHoverCard(event) {
      var target = event.currentTarget;
      target.style.display = 'none';
    },
    // 点击图片预览按钮
    handlePreview(flag){
      var imgUrl = this.imageUrl[this.imageCodes[flag]];
      this.imageUrlsArray = [];
      var self = this;
      imgUrl.split(',').forEach((item) => {
        this.imageUrlsArray.push(self.getRealImg(item));
      });
      this.$refs.imagePreviewer.show();
    },
    // 点击图片上传按钮
    handleUpload(flag) {
      this.$refs[flag+'-upload'].$el.querySelector(".el-upload").click();
    }
  },
  created() {
    var requireDefer = this.require();
    this.initPromise(requireDefer);
    this.setExpandsValue();
  },
  mounted() {
    this.scroll();
    document.getElementById('main-right').addEventListener('scroll', this.scroll);
  },
  watch: {
    imageUrl:{
      handler: function(){
        const self = this;
        Object.keys(this.imageUrl).forEach((v) => {
          self.$set(self.realPath, v, self.getRealImg(self.imageUrl[v]));
        });
      },
      deep: true
    }
  },
  computed: {
    /*realPath(){
      const obj = {};
      Object.keys(this.imageUrl).forEach((v) => {
        obj[v] = this.getRealImg(this.imageUrl[v]);
      });
      return obj;
    },*/
  },
  // components: {
  //   chart: echarts
  // }
};
</script>
<style>
  #cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0,0%,100%,.9);
    z-index: 200000;
    transition: opacity .3s;
  }
  .el-icon-loading {
    top: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    font-size: 50px;
  }
  /*#customerInfo .title-header{*/
    /*height: 56px;*/
    /*padding: 10px 20px;*/
    /*background-color: #ffffff;*/
    /*border-bottom: 1px solid #e3e3e3;*/
  /*}*/
  /*#customerInfo .title-header h2 {*/
    /*font-size: 18px;*/
    /*font-weight: bold;*/
  /*}*/
  .search-header {
    padding: 5px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 6px;
  }
  #customerInfo {
    padding: 20px 30px;
    margin-bottom: 30px;
  }
  #customerInfo .content_left {
    width: calc(100% - 175px);
    /* height: 1000px; */
    float: left;
  }
  .content_left_item{
    /* height: 500px; */
    position: relative;
    padding-bottom: 10px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  #customerInfoDiv.content_left_item {
    padding: 10px;
  }
  .content_left_item .title {
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
  }
  #customerInfo .nav_right{
    width: 164px;
    float: right;
    position: relative;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  #customerInfo .nav_right.fixed{
    width: 164px;
    position: fixed;
    right: 31px;
    top: 80px;
    border: 1px solid #DDD;
    font: 14px 'Microsoft YaHei';
    padding: 10px 40px 10px 50px;
    background-color: #FFF;
    z-index: 20;
  }
  .idCardUpload {
    position: relative;
    float: left;
    width: 370px;
    height: 220px;
    /*padding: 40px 50px 0 50px;*/
    margin: 10px;
    box-sizing: border-box;
    /*border: 1px solid #CECECE;*/
    padding: 0px 15px;
    text-align: center;
  }
  .idCardUpload .upload-component{
    padding-top:120px;
    text-align: center;
  }
  #customerInfo .el-upload__input{
    display: none;
  }
  .idCardUpload__title {
    position: absolute;
    width: 300px;
    top:0;
    padding: 60px 0;
    text-align: center;
  }
  .idCardUpload__title p {
    font-size: 13px;
    height: 20px;
    line-height: 20px;
  }
  .idCardInfo {
    width: calc(100% - 440px);
    /* max-width: 700px; */
    margin: 10px;
    float: left;
    height: 230px;
    /*border: 1px solid #CECECE;*/
  }
  .idCardInfo_left {
    width: 135px;
    float: left;
    text-align: center;
  }
  .upload-lifephoto {
  }
  .lifephoto_title {
    position: absolute;
    top: 40px;
    width: 126px;
  }
  .idCardInfo_left_photo {
    height: 170px;
    width: 100%;
    /*border-right: 1px solid #CECECE;
    border-bottom: 1px solid #CECECE;*/
  }
  .idCardInfo_left_photo + p{
    height: 30px;
    width: 100%;
    margin: 14px 0;
    line-height: 30px;
  }
  .idCardInfo_right {
    width: calc(100% - 150px);
    height: 228px;
    position: relative;
    float: right;
  }
  .idCardInfo_right .customer_template {
    padding: 3px 0;
    margin: 0;
  }
/*  #customerInfo .customer_template .el-form-item {
    margin-bottom: 0px;
  }*/
/*   #customerInfo .el-form-item {
  margin-bottom: 5px;
} */
  #customerInfo .el-form-item__label {
    padding: 11px 12px 11px 0;
    font-size: 15px;
  }
  #customerInfo #basicRecord .el-form-item__content{
    line-height: 36px;
  }
  #customerInfo .el-form-item__content{
    /* line-height: 18px; */
  }
  #customerInfo .el-form-item__label {
    /* padding: 2px 12px 2px 0; */
    font-size: 14px;
  }
  .idCardInfo {
    font-size: 14px;
  }
  #customerInfo .self_form_row {
    /* height: 30px;
    padding: 15px 0; */
  }
  .content_label .title_icon {
    color: gray;
    font-size: 20px;
    line-height: 60px;
    height: 60px;
    margin-right: 30px;
    cursor: pointer;
  }
  table.avRecordTable {
    width: calc(100% - 80px);
    /*border: 1px solid #dfe8ec;*/
    margin: 20px 40px;
    font-size: 14px;
  }
  .avRecordTable tr {
    position: relative;
    height: 40px;
  }
  .avRecordTable tr td {
    /*border: 1px solid #dfe8ec;*/
    padding: 0 10px;
  }
  .avRecordTable .tdTitle {
    width:20%;
    line-height: 40px;
  }
  .avRecordTable .tdTitle .prompt{
    position: absolute;
    left: 130px;
    /* top: 45%; */
  }
  .avRecordTable .tdTitle .prompt i {
    display: inline-block;
    margin-left: 5px;
    font-size: 18px;
    color: #00A5E3;
  }
  .avRecordTable .tdTitle .prompt span {
    min-height: 32px;
    max-width: 80%;
    /*border: 1px solid #eeeff1;*/
    line-height: 26px;
    background-color: #FDF6BF;
    padding: 0 10px;
    z-index: 20;
    white-space: normal;
    cursor: pointer;
    display: none;
  }
  .avRecordTable .picture .el-upload--picture-card {
    background-color: #fbfdff;
    border: 2px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    vertical-align: middle;
    margin: 8px 8px 8px 0;
  }
  .avRecordTable .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
    vertical-align: middle;
    margin: 8px 8px 8px 0;
  }
  .avRecordTable .picture {
    width:75%;
  }
  #customerInfo .RecordDiagram {
    /* background-color: whitesmoke; */
    /* border: solid 1px black; */
    width: 100%;
    height: 500px;
    margin: 0px auto;
    padding: 20px 40px;
  }
  #customerInfo #self-grid  {
    margin-bottom: 20px;
    padding: 0 10px;
  }
  #customerInfo input.el-input__inner {
    height: 28px;
  }

  /* upload css */
  #customerInfo .leftTemplate {
    display: inline-block;
    /* float: left; */
    width: calc(100% - 200px);
    height: 100%;
    position: inherit;
    margin-left: 0px;
  }
  #customerInfo .rightUpload {
    float: right;
    width: 180px;
    margin: 0 20px 0 0;
    text-align: center;
    /*border: 1px solid #CECECE;*/
    position: relative;
    margin-left: 0px;
    padding: 2px;
  }
  #followRecord .followTable {
    margin: 20px 20px 20px 20px;
    padding: 0px 20px 0px 20px;
  }

  /* === basic info css === */
  .child-title {
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    padding: 10px 10px 0px 10px;
    clear: both;
  }
  #basicRecord .child-title .el-icon-edit,#basicRecord .child-title .el-icon-plus {
    font-size: 12px;
    color: #00a5e3;
    cursor: pointer;
    margin-left: 10px;
  }
  #basicRecord .detail-item {
    padding: 10px 20px;
  }
  #basicRecord .content-left {
    position: relative;
    width: calc(100% - 200px);
    margin-left: 0;
    float: left;
  }
  #basicRecord .content-right {
    float: right;
    width: 180px;
    /*border: 1px solid #CECECE;*/
    position: inherit;
    margin-left: 0px;
    /*padding: 2px;*/
    text-align: center;
  }
  #customerInfo .content-right {
    position: relative;
  }
  #customerInfo .hoverCard{
    width: 100%;
    height: 125px;
    position: absolute;
    top: 3px;
    left: 3px;
    margin: 0 auto;
    font-size: 22px;
    background-color: #0e0e0e;
    opacity: 0.65;
    vertical-align: middle;
    color: white;
    display: inline-block;
  }
  #customerInfo .hoverCard i {
    margin-top: 50px;
    cursor: pointer;
  }
  .child-item {
    width: calc(100% - 20px);
    border-bottom: 1px solid #CECECE;
    margin: 10px;
    display: inline-block;
    padding-bottom: 10px;
  }
  .child-item:last-child{
    border:none;
  }
  .child-item-left {
    margin-right: 10px;
    /*border: 1px solid #CECECE;*/
    width: 370px;
    float: left;
    padding: 0 30px;
  }
  .child-item-right {
    margin-left: 10px;
    /*border: 1px solid #CECECE;*/
    width: calc(100% - 420px);
    float: left;
  }
  #customerInfo .yon-form div.tpl-label {
    font-size: 14px;
  }
  .el-table__expanded-cell .yon-form{
    text-align: left;
  }


  /* ==     upload css     == */
  #customerInfo .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #customerInfo .upload-box {
    border: 1px dashed #d9d9d9;
    text-align: center;
  }
  #customerInfo .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #customerInfo .avatar-show-icon, #customerInfo .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    width: 28px;
    height: 28px;
    line-height: 28px;
  }



  /* === side-nav start === */
  ul#side-nav {
    position: relative;
  }
  ul#side-nav li {
    list-style-type: none;
    position: relative;
  }
  ul#side-nav li.selected a {
    color: #189CC7;
  }
  ul#side-nav li a {
    display: block;
    line-height: 35px;
    text-decoration: none;
    color: #666;
  }
  ul#side-nav li.selected::after, ul#side-nav li::before, ul#side-nav span.line {
    content: "";
    position: absolute;
  }
/*   ul#side-nav span.line {
  display: block;
  top: 30px;
  left: 29px;
  width: 1px;
  height: calc(100% - 50px);
  background: #B2B2B2;
  border-left: 1px dashed #ccc;
  z-index: 0;
} */
  ul#side-nav span.line {
      display: block;
      top: 20px;
      left: -21px;
      width: 1px;
      height: calc(100% - 35px);
      background: #B2B2B2;
      border-left: 1px dashed #ccc;
      z-index: 0;
  }
  ul#side-nav li::before {
    width: 9px;
    height: 9px;
    position: absolute;
    border: 1px solid #B2B2B2;
    background-color: #FFF;
    border-radius: 50%;
    left: -25px;
    top: 16px;
    z-index: 2;
  }
  ul#side-nav li.selected::before {
    background-color: #189CC7;
    border: 1px solid #189CC7;
  }
  ul#side-nav li.selected::after {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #189CC7;
    left: -28px;
    top: 13px;
    position: absolute;
  }
  /* === side-nav end === */
</style>

<style scoped>
  #customerInfo .button-group {
    margin-left: calc(50% - 90px);
  }
</style>
