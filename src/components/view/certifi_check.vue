<template>
    <div>
        <div v-show="checkState === 1" class="tm-card invite-send certifi-info">
            <div class="card-image">
                <img src="/static/image/admin/cerrifi_check.png" class="img-fluid" alt="hi">
            </div>
            <div class="card-wrapper">
                <h2>欢迎申请途梦学校</h2>
                <p>完成认证信息，即可提交申请途梦学校，您的学校有机会获得各行各业志愿者的演讲分享服务，让孩子们提前了解他们梦想的世界</p>
            </div>
        </div>
        <div class="tm-card info-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <h3>基本信息</h3>
                <el-form-item label="学校名称" prop="name" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="学校地址" prop="address" >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="责任老师" prop="teacher" >
                    <el-input v-model="form.teacher"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="teacherPhone" >
                    <el-input v-model="form.teacherPhone"></el-input>
                </el-form-item>
                <el-form-item label="学校图片" >
                    <Upload filepathname="schoolPhotoShortPathFilename" previewname="schoolPhotoUrl" :action="Api.upload" :preview="schoolPhotoUrl" ></Upload>
                    <div class="pic-info">
                        <h3>请拍摄学校的外景，尽量包含学校的名字</h3>
                        <p class="info-p">图片类型：JPG、PNG</p>
                        <p class="info-p">图片大小：不超过5M</p>
                        <h3 class="mm">样例</h3>
                        <img src="/static/image/banner.png" class="img-fluid" alt="demo">
                    </div>
                </el-form-item>
                <el-form-item label="开课教室图片" >
                    <Upload filepathname="classroomPhotoShortPathFilename" previewname="classroomPhotoUrl" :action="Api.upload" :preview="classroomPhotoUrl" ></Upload>
                </el-form-item>
                <div class="individar"></div>
                <h3 class="info-h3" >贫困学校申请</h3>
                <p class="info-p">普通学校可以享受6次免费演讲分享，之后将收取费用用于公益事业</p>
                <p class="info-p">贫困学校可以完全享受免费的演讲分享</p>
                <p class="info-p">如果您的学校符合贫困条件，请填写相关信息</p>
                <el-form-item prop="poorDesc" label-width="0" required >
                    <el-input type="textarea" :rows="rows" class="info-textarea" v-model="form.poorDesc"></el-input>
                </el-form-item>
                <div class="individar"></div>
                <h3>附加信息</h3>
                <p class="info-p">以下信息填写的越详细，越有助于我们快速审核开通你的账号</p>
                <h5 class="info-h5" >您的学校是否具有以下硬件设施</h5>
                <div class="info-table">
                    <div class="info-table-col" style="max-width:250px;" >
                        <div class="cube-big">
                            <img :src="img_pc" alt="">
                        </div>
                        <div class="cube">
                            <img :src="img_class" alt="">
                        </div>
                        <div class="cube-big">
                            <img :src="img_camera" alt="">
                        </div>
                    </div>
                    <div class="info-table-col">
                        <div class="cube">
                            <p>1.电脑</p>
                            <el-radio-group v-model="form.havePC">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>2.网络</p>
                            <el-radio-group v-model="form.haveNet">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>3.多媒体教师（有投影或显示设备）</p>
                            <el-radio-group v-model="form.haveMultimediaClassroom">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>4.摄像头</p>
                            <el-radio-group v-model="form.haveCamera">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="cube">
                            <p>5.麦克风</p>
                            <el-radio-group v-model="form.haveMic">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                                <el-radio label="2">不确定</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <h5 class="info-h5">学生情况</h5>
                <el-form-item prop="studentStatus"  label-width="0" required >
                    <el-input type="textarea" :rows="rows" class="info-textarea"  v-model="form.studentStatus"></el-input>
                </el-form-item>
                <h5 class="info-h5">为什么选择途梦？希望途梦为学生带来什么</h5>
                <el-form-item prop="whyChooseUs"  label-width="0" required >
                    <el-input type="textarea" :rows="rows" class="info-textarea" v-model="form.whyChooseUs"></el-input>
                </el-form-item>
                <el-form-item label-width="0" >
                    <el-checkbox v-model="isOk" >我已阅读并同意途梦 <a class="tm-a" href="#">用户规约</a></el-checkbox>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交审核</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form>
            <el-dialog width="30%" center class="certi-submit-modal" :visible.sync="modal.submit" >
                <span class="submit-modal"><i class="icon iconfont icon-submit"></i></span>
                <h3>学校申请提交成功</h3>
                <p>感谢您申请加入途梦学校</p>
                <p>我们将会尽快审核您的资料</p>
                <p>通过审核后您的学校将有机会获得各行各业志愿者的分享</p>
                <p>您可以随时登陆个人中心查看审核进展</p>
                <span slot="footer" class="tm-modal-footer">
                    <a href="/" class="tm-btn" >去首页看看</a>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { Api } from '@comp/lib/api_maps';
import Upload from '@layout/upload.vue';

import img_class from '@image/admin/class.png';
import img_pc from '@image/admin/pc.png';
import img_camera from '@image/admin/camera.png';

export default {
    data() {
        return {
            isOk: false,
            Api,
            rows: 8,
            form: {},
            modal: {
                submit: false
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入学校名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }
                ],
                resource: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                freeinfo: [
                    {
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }
                ]
            },
            img_class,
            img_pc,
            img_camera
        };
    },
    computed: mapState({
        checkState: state => state.common.checkState,
        schoolPhotoUrl: state => state.upload.schoolPhotoUrl,
        classroomPhotoUrl: state => state.upload.classroomPhotoUrl,
        classroomPhotoShortPathFilename: state =>
            state.upload.classroomPhotoShortPathFilename,
        schoolPhotoShortPathFilename: state =>
            state.upload.schoolPhotoShortPathFilename
    }),
    mounted() {
        this.getFormData({
            act: 'getApplication',
            onSuccess: res => {
                this.form = res.data.data;
                const {
                    classroomPhotoShortPathFilename,
                    classroomPhotoUrl,
                    schoolPhotoShortPathFilename,
                    schoolPhotoUrl
                } = this.form;
                console.log(
                    classroomPhotoShortPathFilename,
                    classroomPhotoUrl,
                    schoolPhotoShortPathFilename,
                    schoolPhotoUrl
                );
                this.update({
                    classroomPhotoShortPathFilename,
                    classroomPhotoUrl,
                    schoolPhotoShortPathFilename,
                    schoolPhotoUrl
                });
            }
        });
    },
    methods: {
        ...mapMutations(['getFormData', 'formSubmit', 'update']),
        onSubmit(form) {
            const cfg = Object.assign(this.form, {
                classroomPhotoShortPathFilename: this
                    .classroomPhotoShortPathFilename,
                schoolPhotoShortPathFilename: this.schoolPhotoShortPathFilename
            });

            delete cfg.schoolPhotoUrl;
            delete cfg.classroomPhotoUrl;

            this.$refs[form].validate(valid => {
                if (valid && this.isOk) {
                    const data = {
                        act: 'submitApplication',
                        ...cfg,
                        onSuccess: res => {
                            console.log(res);
                            this.modal.submit = true;
                        },
                        onError: res => {
                            console.log(res);
                        }
                    };

                    this.formSubmit(data);
                } else {
                    this.$message({
                        showClose: true,
                        message: '格式有问题，请重试',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    components: {
        Upload
    }
};
</script>
<style lang="scss" scoped >
.el-dialog__wrapper.certi-submit-modal {
    p {
        margin: 0;
        text-align: center;
    }
    h3 {
        text-align: center;
    }
    .submit-modal {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        i {
            font-size: 55px;
            color: rgb(116, 189, 184);
        }
    }
}

.pic-info {
    width: 150px;
    position: absolute;
    top: 0;
    left: 400px;
}
.pic-info > h3 {
    margin: 0;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 10px;
}
.pic-info > .mm {
    margin-top: 10px;
}

.info-box {
    .el-input {
        max-width: 575px;
    }
    .el-form {
        padding: 10px 30px;
    }
    .info-p {
        margin: 0;
        font-size: 14px;
        line-height: 25px;
        color: #606266;
    }

    .info-h3 {
        font-weight: bold;
    }

    .info-h5 {
        font-weight: bold;
        font-size: 16px;
        line-height: 25px;
        margin: 0;
    }

    .info-textarea {
        margin-top: 20px;
        max-width: 600px;
    }
}

.info-table {
    display: flex;
    margin: 25px 0;
    max-width: 800px;
    .info-table-col {
        display: flex;
        flex-direction: column;
        flex: 1;
        > div {
            justify-content: center;
            align-items: center;
            display: flex;
            border: 1px solid #e2e2e2;
            flex-direction: column;
        }
        .cube {
            flex: 1;
            height: 110px;
            p,
            .el-radio-group {
                width: 100%;
                padding-left: 60px;
            }
        }
        .cube-big {
            flex: 2;
            height: 220px;
        }
    }
}

.certifi-info.invite-send {
    background: rgb(249, 242, 232);
    border: 1px solid #e97a50;
}

.certifi-info.invite-send .card-image {
    display: flex;
    width: auto;
    padding: 10px;
    align-items: center;
    justify-content: center;
}

.certifi-info.invite-send .card-wrapper p {
    max-width: 750px;
    line-height: 28px;
    margin-top: 10px;
}
.certifi-info.invite-send .card-wrapper h2 {
    margin-bottom: 10px;
}
.invite-send.tm-card {
    display: flex;
    flex-direction: row;
}
.invite-send .card-image {
    width: 160px;
    overflow: hidden;
}
.invite-send .card-wrapper {
    flex: 1;
    color: #6e6e6e;
    padding-left: 20px;
}
.invite-send .card-wrapper p {
    max-height: 66px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.invite-send .card-wrapper p .num {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
}

.invite-send .card-wrapper p .teacher-name {
    font-size: 22px;
    font-weight: bold;
    color: #000;
    margin-right: 20px;
}
</style>



